import { useEffect } from "react";
import { Application, Assets, Texture, Rectangle, AnimatedSprite } from "pixi.js";

// 2-frame vertical strips, 17x17 each
const IMG = {
  down:  "/sprites/forward-walk.png",
  up:    "/sprites/backward-walk.png",
  left:  "/sprites/left-walk.png",
  right: "/sprites/right-walk.png",
};

export default function PixelWalkCanvas(props) {
  // accept legacy prop name too (no warnings)
  const containerId   = props.containerId ?? props.targetId; // where the canvas mounts (e.g., "pixi-layer")
  const listenTargetId = props.listenTargetId;               // where we listen for pointer events (e.g., "home-hero")

  const {
    anchorId,
    padX,
    padY,
    scale,
    speed,
    walkFps,

    // chase/return config (defaults keep the deps array length stable)
    chaseRadius   = 280,  // start chasing when within this distance (px)
    releaseRadius = 325,  // stop chasing when farther than this (px) or mouse leaves
    chaseSpeed    = 180,  // px/sec during chase
    returnSpeed   = 220,  // px/sec when returning to the path
  } = props;

  useEffect(() => {
    const container = containerId ? document.getElementById(containerId) : null;     // canvas host (on top, pointer-events-none)
    const listenEl  = listenTargetId ? document.getElementById(listenTargetId) : null; // pointer source (underneath)
    const anchorEl  = anchorId ? document.getElementById(anchorId) : null;

    if (!container || !listenEl || !anchorEl) return;

    let app;
    let destroyed = false;
    let roContainer, roAnchor;

    // --- chase/return state ---
    let mode = "patrol"; // "patrol" | "chase" | "return"
    const mouse = { x: 0, y: 0, inside: false };
    let returnTarget = null; // {x,y,dir,d}

    (async () => {
      app = new Application();
      await app.init({
        width:  container.clientWidth || 1,
        height: container.clientHeight || 1,
        backgroundAlpha: 0,
        antialias: false,
        roundPixels: true,
      });
      if (destroyed) return;

      // mount canvas into the container (which is visually above content)
      const canvas = app.canvas;
      canvas.style.position = "absolute";
      canvas.style.inset = "0";
      canvas.style.pointerEvents = "none"; // NEVER eat clicks/taps
      canvas.style.imageRendering = "pixelated";
      canvas.style.zIndex = "0"; // parent controls stacking (e.g., z-20)
      container.appendChild(canvas);

      // resize observers
      const resizeToContainer = () =>
        app.renderer.resize(container.clientWidth || 1, container.clientHeight || 1);
      roContainer = new ResizeObserver(resizeToContainer);
      roContainer.observe(container);
      resizeToContainer();

      roAnchor = new ResizeObserver(() => {});
      roAnchor.observe(anchorEl);

      // pointer tracking on the *listen target* (under the canvas)
      const onPointerMove = (e) => {
        const r = listenEl.getBoundingClientRect();
        mouse.x = e.clientX - r.left;
        mouse.y = e.clientY - r.top;
        mouse.inside =
          e.clientX >= r.left &&
          e.clientX <= r.right &&
          e.clientY >= r.top &&
          e.clientY <= r.bottom;
      };
      const onPointerLeave = () => { mouse.inside = false; };
      listenEl.addEventListener("pointermove", onPointerMove);
      listenEl.addEventListener("pointerleave", onPointerLeave);

      // load textures
      const [downTex, upTex, leftTex, rightTex] = await Promise.all([
        Assets.load(IMG.down),
        Assets.load(IMG.up),
        Assets.load(IMG.left),
        Assets.load(IMG.right),
      ]);
      if (destroyed) return;

      // Pixi v8: nearest sampling (no baseTexture tuning needed beyond source)
      for (const t of [downTex, upTex, leftTex, rightTex]) {
        if (t?.source) t.source.scaleMode = "nearest";
      }

      // slice frames (tiny inset prevents bleeding when scaled)
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
      const order = ["walk_right", "walk_down", "walk_left", "walk_up"]; // patrol order

      // movement state
      let dirIndex = 0;
      let distOnEdge = 0;

      const sprite = new AnimatedSprite(anims[order[0]]);
      const baseWalkFps = typeof walkFps === "number" ? walkFps : 4;
      const baseSpeed   = typeof speed === "number" ? speed : 85;
      const updateAnimSpeed = (currentSpeed) => {
        const s = Math.max(1e-6, currentSpeed);
        const scaleFactor = s / Math.max(1e-6, baseSpeed);
        sprite.animationSpeed = (baseWalkFps * scaleFactor) / 60;
      };
      updateAnimSpeed(baseSpeed);
      sprite.anchor.set(0.5);
      sprite.scale.set(typeof scale === "number" ? scale : 4);
      sprite.play();
      app.stage.addChild(sprite);

      // rect around anchor + helpers (computed in listenEl's coordinate space)
      const rectAroundAnchor = () => {
        const L = listenEl.getBoundingClientRect();
        const A = anchorEl.getBoundingClientRect();
        const cx = Math.round(A.left - L.left + A.width  / 2);
        const cy = Math.round(A.top  - L.top  + A.height / 2);
        const sideW = Math.max(1, Math.round(A.width  + 2 * (padX ?? 40)));
        const sideH = Math.max(1, Math.round(A.height + 2 * (padY ?? 24)));
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

      const projectToRect = (px, py, r) => {
        const hw = r.sideW / 2, hh = r.sideH / 2;
        const L = r.cx - hw, R = r.cx + hw, T = r.cy - hh, B = r.cy + hh;
        const segs = [
          { dir: 0, x1: L, y1: T, x2: R, y2: T, len: r.sideW }, // top
          { dir: 1, x1: R, y1: T, x2: R, y2: B, len: r.sideH }, // right
          { dir: 2, x1: R, y1: B, x2: L, y2: B, len: r.sideW }, // bottom
          { dir: 3, x1: L, y1: B, x2: L, y2: T, len: r.sideH }, // left
        ];
        let best = { dist2: Infinity, dir: 0, d: 0, x: L, y: T };
        for (const s of segs) {
          const vx = s.x2 - s.x1, vy = s.y2 - s.y1;
          const segLen2 = vx*vx + vy*vy || 1;
          let t = ((px - s.x1)*vx + (py - s.y1)*vy) / segLen2;
          t = Math.max(0, Math.min(1, t));
          const qx = s.x1 + t*vx, qy = s.y1 + t*vy;
          const dx = px - qx, dy = py - qy;
          const d2 = dx*dx + dy*dy;
          if (d2 < best.dist2) best = { dist2: d2, dir: s.dir, d: t * s.len, x: qx, y: qy };
        }
        return best; // nearest point on rect
      };

      const setFacingFromVelocity = (vx, vy) => {
        const ax = Math.abs(vx), ay = Math.abs(vy);
        const face = ax >= ay ? (vx >= 0 ? "walk_right" : "walk_left")
                              : (vy >= 0 ? "walk_down" : "walk_up");
        if (sprite.textures !== anims[face]) { sprite.textures = anims[face]; sprite.play(); }
      };

      // init
      let rect = rectAroundAnchor();
      setPos(dirIndex, distOnEdge, rect);

      app.ticker.add(() => {
        if (destroyed) return;

        const dt = app.ticker.deltaMS / 1000;
        const newRect = rectAroundAnchor();

        // keep fractional progress if rect edge lengths changed
        const prevLen = edgeLen(dirIndex, rect);
        const nextLen = edgeLen(dirIndex, newRect);
        if (prevLen !== nextLen && prevLen > 0) {
          const frac = distOnEdge / prevLen;
          distOnEdge = Math.min(frac * nextLen, nextLen);
        }
        rect = newRect;

        // --- mode transitions ---
        const dxm = mouse.x - sprite.x;
        const dym = mouse.y - sprite.y;
        const distToMouse = Math.hypot(dxm, dym);

        if (mode === "patrol" && mouse.inside && distToMouse <= chaseRadius) {
          mode = "chase";
        } else if (mode === "chase" && (!mouse.inside || distToMouse > releaseRadius)) {
          const proj = projectToRect(sprite.x, sprite.y, rect);
          returnTarget = { x: proj.x, y: proj.y, dir: proj.dir, d: proj.d };
          mode = "return";
        }

        // --- behaviors ---
        if (mode === "chase") {
          updateAnimSpeed(chaseSpeed);
          const dist = distToMouse || 0.0001;
          const step = Math.min(chaseSpeed * dt, dist);
          const vx = (dxm / dist) * step;
          const vy = (dym / dist) * step;
          sprite.x += vx;
          sprite.y += vy;
          setFacingFromVelocity(vx, vy);
          sprite.position.set(Math.round(sprite.x), Math.round(sprite.y));
          return;
        }

        if (mode === "return" && returnTarget) {
          const dx = returnTarget.x - sprite.x;
          const dy = returnTarget.y - sprite.y;
          const dist = Math.hypot(dx, dy);
          if (dist <= 1.0) {
            // snap to path and resume patrol
            dirIndex = returnTarget.dir;
            distOnEdge = returnTarget.d;
            sprite.textures = anims[order[dirIndex]];
            sprite.play();
            setPos(dirIndex, distOnEdge, rect);
            returnTarget = null;
            mode = "patrol";
          } else {
            updateAnimSpeed(returnSpeed);
            const step = Math.min(returnSpeed * dt, dist);
            const vx = (dx / dist) * step;
            const vy = (dy / dist) * step;
            sprite.x += vx;
            sprite.y += vy;
            setFacingFromVelocity(vx, vy);
            sprite.position.set(Math.round(sprite.x), Math.round(sprite.y));
            return;
          }
        }

        // patrol
        updateAnimSpeed(baseSpeed);
        let moveLeft = baseSpeed * dt;
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
      try { app?.destroy?.(true); } catch {}
      try {
        const c = container?.querySelector("canvas");
        if (c && c.parentNode === container) container.removeChild(c);
      } catch {}
      try {
        listenEl?.removeEventListener("pointermove", () => {});
        listenEl?.removeEventListener("pointerleave", () => {});
      } catch {}
    };
  }, [
    containerId, listenTargetId, anchorId, padX, padY, scale, speed, walkFps,
    chaseRadius, releaseRadius, chaseSpeed, returnSpeed
  ]);

  return null;
}
