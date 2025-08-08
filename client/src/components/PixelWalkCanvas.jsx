import { useEffect } from "react";
import { Application, Assets, Texture, Rectangle, AnimatedSprite } from "pixi.js";


const IMG = {
  down:  "/sprites/forward-walk.png",
  up:    "/sprites/backward-walk.png",
  left:  "/sprites/left-walk.png",
  right: "/sprites/right-walk.png",
};

export default function PixelWalkCanvas(props) {
  // Accept both names to avoid HMR timing issues, but do NOT early-return before hooks
  const containerId = props.containerId ?? props.targetId;
  const { anchorId, padX, padY, scale, speed, walkFps } = props;

  useEffect(() => {
    // Always call the hook; only proceed if we actually have the DOM nodes
    const container = containerId ? document.getElementById(containerId) : null;
    const anchorEl  = anchorId ? document.getElementById(anchorId) : null;

    // If elements aren't present yet (e.g. first render/HMR), skip this cycle quietly.
    if (!container || !anchorEl) return;

    let app;
    let destroyed = false;
    let roContainer;
    let roAnchor;

    (async () => {
      // Create PIXI app sized to the container
      app = new Application();
      await app.init({
        width:  container.clientWidth || 1,
        height: container.clientHeight || 1,
        backgroundAlpha: 0,
        antialias: false,
        roundPixels: true,
      });
      if (destroyed) return;

      // Overlay canvas
      const canvas = app.canvas;
      canvas.style.position = "absolute";
      canvas.style.inset = "0";
      canvas.style.pointerEvents = "none";
      canvas.style.imageRendering = "pixelated";
      canvas.style.zIndex = "1";
      container.appendChild(canvas);

      // Keep renderer matched to container size
      const resizeToContainer = () =>
        app.renderer.resize(container.clientWidth || 1, container.clientHeight || 1);
      roContainer = new ResizeObserver(resizeToContainer);
      roContainer.observe(container);
      resizeToContainer();

      // Watch the anchor so path hugs content as it changes
      roAnchor = new ResizeObserver(() => {});
      roAnchor.observe(anchorEl);

      // Load textures
      const [downTex, upTex, leftTex, rightTex] = await Promise.all([
        Assets.load(IMG.down),
        Assets.load(IMG.up),
        Assets.load(IMG.left),
        Assets.load(IMG.right),
      ]);
      if (destroyed) return;

      for (const t of [downTex, upTex, leftTex, rightTex]) {
        if (t && t.source) t.source.scaleMode = 'nearest';
      }

      // Slice 2-frame vertical strips with tiny inset to avoid bleeding
      const FRAME = 17, EPS = 0.01;
      const slice = (tex) => {
        const src = tex.source ?? tex;
        return [
          new Texture({ source: src, frame: new Rectangle(EPS, 0 * FRAME + EPS, FRAME - 2*EPS, FRAME - 2*EPS) }),
          new Texture({ source: src, frame: new Rectangle(EPS, 1 * FRAME + EPS, FRAME - 2*EPS, FRAME - 2*EPS) }),
        ];
      };

      const anims = {
        walk_right: slice(rightTex),
        walk_down:  slice(downTex),
        walk_left:  slice(leftTex),
        walk_up:    slice(upTex),
      };
      const order = ["walk_right", "walk_down", "walk_left", "walk_up"]; // right → down → left → up

      // Movement state
      let dirIndex = 0;
      let distOnEdge = 0;

      const sprite = new AnimatedSprite(anims[order[0]]);
      sprite.animationSpeed = (typeof walkFps === "number" ? walkFps : 4) / 60;
      sprite.anchor.set(0.5);
      sprite.scale.set(typeof scale === "number" ? scale : 4);
      sprite.play();
      app.stage.addChild(sprite);

      // Rectangle around anchor (with padding), in container coords
      const rectAroundAnchor = () => {
        const c = container.getBoundingClientRect();
        const a = anchorEl.getBoundingClientRect();
        const cx = Math.round(a.left - c.left + a.width  / 2);
        const cy = Math.round(a.top  - c.top  + a.height / 2);
        const sideW = Math.max(1, Math.round(a.width  + 2 * (padX ?? 40)));
        const sideH = Math.max(1, Math.round(a.height + 2 * (padY ?? 24)));
        return { cx, cy, sideW, sideH };
      };

      const edgeLen = (dir, r) =>
        (order[dir] === "walk_right" || order[dir] === "walk_left") ? r.sideW : r.sideH;

      const setPos = (dir, d, r) => {
        const hw = r.sideW / 2, hh = r.sideH / 2;
        if (order[dir] === "walk_right")      { sprite.x = r.cx - hw + d; sprite.y = r.cy - hh; }
        else if (order[dir] === "walk_down")  { sprite.x = r.cx + hw;     sprite.y = r.cy - hh + d; }
        else if (order[dir] === "walk_left")  { sprite.x = r.cx + hw - d; sprite.y = r.cy + hh; }
        else                                   { sprite.x = r.cx - hw;     sprite.y = r.cy + hh - d; }
      };

      // Init
      let rect = rectAroundAnchor();
      setPos(dirIndex, distOnEdge, rect);

      // Parametric movement with leftover-safe stepping; reacts to container/anchor changes
      app.ticker.add(() => {
        if (destroyed) return;

        const newRect = rectAroundAnchor();

        // Preserve fractional progress if the current edge length changed
        const prevLen = edgeLen(dirIndex, rect);
        const nextLen = edgeLen(dirIndex, newRect);
        if (prevLen !== nextLen && prevLen > 0) {
          const frac = distOnEdge / prevLen;
          distOnEdge = Math.min(frac * nextLen, nextLen);
        }
        rect = newRect;

        let moveLeft = (typeof speed === "number" ? speed : 85) * (app.ticker.deltaMS / 1000);

        while (moveLeft > 0) {
          const len = edgeLen(dirIndex, rect);
          const remaining = len - distOnEdge;
          const step = Math.min(moveLeft, remaining);

          distOnEdge += step;
          setPos(dirIndex, distOnEdge, rect);
          moveLeft -= step;

          if (distOnEdge >= len - 1e-6) {
            distOnEdge = 0;
            dirIndex = (dirIndex + 1) % order.length;
            sprite.textures = anims[order[dirIndex]];
            sprite.play();
            setPos(dirIndex, distOnEdge, rect);
          }
        }

        // Snap to whole pixels for crispness
        sprite.position.set(Math.round(sprite.x), Math.round(sprite.y));
      });
    })();

    // Cleanup
    return () => {
      destroyed = true;
      try { /* disconnect observers if they exist */ } catch {}
    };
  }, [containerId, anchorId, padX, padY, scale, speed, walkFps]);

  // Always return something to keep hooks order stable
  return null;
}
