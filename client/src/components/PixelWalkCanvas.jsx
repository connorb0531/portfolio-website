// src/components/PixelWalkCanvas.jsx
import { useEffect } from "react";
import { Application, Assets, Texture, Rectangle, AnimatedSprite, SCALE_MODES } from "pixi.js";

const IMG = {
  down:  "/sprites/forward-walk.png",
  up:    "/sprites/backward-walk.png",
  left:  "/sprites/left-walk.png",
  right: "/sprites/right-walk.png",
};

export default function PixelWalkCanvas(props) {
  const { containerId, anchorId, padX, padY, scale, speed, walkFps } = props;

  // Runtime guard so missing props fail loudly
  if (
    !containerId || !anchorId ||
    typeof padX !== "number" || typeof padY !== "number" ||
    typeof scale !== "number" || typeof speed !== "number" ||
    typeof walkFps !== "number"
  ) {
    console.error("[PixelWalkCanvas] Missing/invalid props:", props);
    return null;
  }

  useEffect(() => {
    let app;
    let destroyed = false;
    let roContainer, roAnchor;

    (async () => {
      const container = document.getElementById(containerId);
      const anchorEl  = document.getElementById(anchorId);
      if (!container || !anchorEl) {
        console.error("[PixelWalkCanvas] container/anchor not found", { containerId, anchorId });
        return;
      }

      app = new Application();
      await app.init({
        width:  container.clientWidth || 1,
        height: container.clientHeight || 1,
        backgroundAlpha: 0,
        antialias: false,
        roundPixels: true,
      });
      if (destroyed) return;

      const canvas = app.canvas;
      canvas.style.position = "absolute";
      canvas.style.inset = "0";
      canvas.style.pointerEvents = "none";
      canvas.style.imageRendering = "pixelated";
      canvas.style.zIndex = "1";
      container.appendChild(canvas);

      const resizeToContainer = () =>
        app.renderer.resize(container.clientWidth || 1, container.clientHeight || 1);
      roContainer = new ResizeObserver(resizeToContainer);
      roContainer.observe(container);
      resizeToContainer();

      roAnchor = new ResizeObserver(() => {});
      roAnchor.observe(anchorEl);

      const [downTex, upTex, leftTex, rightTex] = await Promise.all([
        Assets.load(IMG.down),
        Assets.load(IMG.up),
        Assets.load(IMG.left),
        Assets.load(IMG.right),
      ]);
      if (destroyed) return;

      try {
        if (SCALE_MODES) {
          downTex.baseTexture.scaleMode  = SCALE_MODES.NEAREST;
          upTex.baseTexture.scaleMode    = SCALE_MODES.NEAREST;
          leftTex.baseTexture.scaleMode  = SCALE_MODES.NEAREST;
          rightTex.baseTexture.scaleMode = SCALE_MODES.NEAREST;
        }
      } catch {}

      const FRAME = 17, EPS = 0.01;
      const slice = (tex) => {
        const bt = tex.baseTexture ?? tex;
        return [
          new Texture({ source: bt, frame: new Rectangle(EPS, 0*FRAME + EPS, FRAME - 2*EPS, FRAME - 2*EPS) }),
          new Texture({ source: bt, frame: new Rectangle(EPS, 1*FRAME + EPS, FRAME - 2*EPS, FRAME - 2*EPS) }),
        ];
      };

      const anims = {
        walk_right: slice(rightTex),
        walk_down:  slice(downTex),
        walk_left:  slice(leftTex),
        walk_up:    slice(upTex),
      };
      const order = ["walk_right", "walk_down", "walk_left", "walk_up"];

      let dirIndex = 0;
      let distOnEdge = 0;

      const sprite = new AnimatedSprite(anims[order[0]]);
      sprite.animationSpeed = walkFps / 60; // from props
      sprite.anchor.set(0.5);
      sprite.scale.set(scale);
      sprite.play();
      app.stage.addChild(sprite);

      const rectAroundAnchor = () => {
        const c = container.getBoundingClientRect();
        const a = anchorEl.getBoundingClientRect();
        const cx = Math.round(a.left - c.left + a.width  / 2);
        const cy = Math.round(a.top  - c.top  + a.height / 2);
        const sideW = Math.max(1, Math.round(a.width  + 2 * padX));
        const sideH = Math.max(1, Math.round(a.height + 2 * padY));
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

      let rect = rectAroundAnchor();
      setPos(dirIndex, distOnEdge, rect);

      app.ticker.add(() => {
        if (destroyed) return;

        const newRect = rectAroundAnchor();
        const prevLen = edgeLen(dirIndex, rect);
        const nextLen = edgeLen(dirIndex, newRect);
        if (prevLen !== nextLen && prevLen > 0) {
          const frac = distOnEdge / prevLen;
          distOnEdge = Math.min(frac * nextLen, nextLen);
        }
        rect = newRect;

        let moveLeft = speed * (app.ticker.deltaMS / 1000);

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

        sprite.position.set(Math.round(sprite.x), Math.round(sprite.y));
      });
    })();

    return () => {
      destroyed = true;
      try { roContainer?.disconnect(); } catch {}
      try { roAnchor?.disconnect(); } catch {}
      try { if (app && !app.destroyed) app.destroy(true); } catch {}
    };
  }, [containerId, anchorId, padX, padY, scale, speed, walkFps]); // all props matter

  return null;
}
