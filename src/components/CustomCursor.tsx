"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

interface Point {
  x: number;
  y: number;
  time: number;
}

const subscribeFinePointer = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia("(pointer: fine)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
};

const getFinePointerSnapshot = () => {
  return typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;
};

const getFinePointerServerSnapshot = () => false;

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const trailSvgRef = useRef<SVGSVGElement>(null);
  const trailPathRef = useRef<SVGPathElement>(null);

  const isEnabled = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot
  );
  const [isVisible, setIsVisible] = useState(false);

  // Flight simulation state
  const mousePos = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const mouseHistory = useRef<Point[]>([]);
  const lastMouseMoveTime = useRef<number>(0);
  
  const planeState = useRef<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    angle: number;
    roll: number;
    isResting: boolean;
    isDropped: boolean;
  }>({
    x: -100,
    y: -100,
    vx: 0,
    vy: 0,
    angle: -Math.PI / 4, // initial northeast heading
    roll: 0,
    isResting: false,
    isDropped: false,
  });

  const planeTrail = useRef<{ x: number; y: number }[]>([]);
  const isHovering = useRef(false);
  const isMouseDown = useRef(false);
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Only enable custom cursor on devices with fine pointer (mouse/trackpad)
    if (!isEnabled) return;

    document.documentElement.classList.add("custom-cursor-active");

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      const now = performance.now();
      lastMouseMoveTime.current = now;
      
      mouseHistory.current.push({ x: e.clientX, y: e.clientY, time: now });

      // Keep history bounded to the last 600ms
      while (
        mouseHistory.current.length > 2 &&
        now - mouseHistory.current[0].time > 600
      ) {
        mouseHistory.current.shift();
      }

      if (!hasInitialized.current) {
        planeState.current.x = e.clientX + 24;
        planeState.current.y = e.clientY + 24;
        hasInitialized.current = true;
      }

      // If it was dropped or resting, wake it up immediately
      planeState.current.isDropped = false;
      planeState.current.isResting = false;

      setIsVisible((prev) => (prev ? prev : true));

      // Check if hovering over interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, [role="button"], input, textarea, select, label, .btn-pressable, .card-25d'
        );
        isHovering.current = !!interactive;
      }
    };

    const onMouseDown = () => {
      isMouseDown.current = true;
    };

    const onMouseUp = () => {
      isMouseDown.current = false;
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    lastMouseMoveTime.current = performance.now();

    // Animation frame loop for 60-120fps physics and curvilinear flight
    let animationFrameId: number;

    const renderLoop = (timestamp: number) => {
      const { x: targetRawX, y: targetRawY } = mousePos.current;

      // 1. UPDATE IMMEDIATE CURSOR (cursor.svg)
      if (cursorRef.current) {
        // Tip of cursor.svg is at top-left (0, 0)
        const scale = isMouseDown.current ? 0.82 : isHovering.current ? 1.15 : 1;
        cursorRef.current.style.transform = `translate3d(${targetRawX}px, ${targetRawY}px, 0) scale(${scale})`;
      }

      // 2. CHECK 5-SECOND INACTIVITY DROP
      const timeSinceLastMove = timestamp - lastMouseMoveTime.current;
      const isIdle5s = hasInitialized.current && timeSinceLastMove >= 5000;

      if (isIdle5s) {
        // Drop mode: Paperplane glides down to the bottom of the screen
        planeState.current.isDropped = true;
        planeState.current.isResting = false;

        const groundY = window.innerHeight - 28;

        if (planeState.current.y < groundY) {
          // Accelerate downward smoothly (gravity glide)
          planeState.current.vy = Math.min(planeState.current.vy + 0.35, 8.5);
          // Aerodynamic flutter drift
          const flutter = Math.sin(timestamp * 0.006) * 1.2;
          planeState.current.x += flutter;
          planeState.current.y += planeState.current.vy;

          // Nose angles downward during descent (~65 deg)
          const targetDropAngle = Math.PI * 0.38;
          let diffAngle = targetDropAngle - planeState.current.angle;
          while (diffAngle > Math.PI) diffAngle -= Math.PI * 2;
          while (diffAngle < -Math.PI) diffAngle += Math.PI * 2;
          planeState.current.angle += diffAngle * 0.08;
          planeState.current.roll *= 0.9;
        } else {
          // Reached the bottom floor: stop motion and level out
          planeState.current.y = groundY;
          planeState.current.vy = 0;
          planeState.current.vx = 0;
          planeState.current.roll = 0;
          // Level out horizontally
          let levelDiff = 0 - planeState.current.angle;
          while (levelDiff > Math.PI) levelDiff -= Math.PI * 2;
          while (levelDiff < -Math.PI) levelDiff += Math.PI * 2;
          planeState.current.angle += levelDiff * 0.1;
        }

        // Dissolve trail while parked at bottom
        if (planeTrail.current.length > 0) {
          planeTrail.current.shift();
        }
      } else {
        // Normal Flight Mode: follow cursor in smooth curvilinear path

        // Sample delayed position from history (~200ms ago)
        const delayMs = 200;
        const targetTime = timestamp - delayMs;
        let targetX = targetRawX;
        let targetY = targetRawY;

        const history = mouseHistory.current;
        if (history.length > 1) {
          let p0 = history[0];
          let p1 = history[history.length - 1];

          for (let i = history.length - 1; i >= 0; i--) {
            if (history[i].time <= targetTime) {
              p0 = history[i];
              p1 = history[Math.min(i + 1, history.length - 1)];
              break;
            }
          }

          const span = p1.time - p0.time;
          if (span > 0) {
            const ratio = Math.max(0, Math.min(1, (targetTime - p0.time) / span));
            targetX = p0.x + (p1.x - p0.x) * ratio;
            targetY = p0.y + (p1.y - p0.y) * ratio;
          } else {
            targetX = p0.x;
            targetY = p0.y;
          }
        }

        // Resting target position slightly offset from cursor so it doesn't obstruct clicks
        const restingOffsetX = 22;
        const restingOffsetY = 22;
        const finalTargetX = targetX + restingOffsetX;
        const finalTargetY = targetY + restingOffsetY;

        const dx = finalTargetX - planeState.current.x;
        const dy = finalTargetY - planeState.current.y;
        const distance = Math.hypot(dx, dy);

        // CHECK IF PLANE HAS REACHED TARGET
        if (distance <= 5.5) {
          // STOP MOTION COMPLETELY: no rotating, no oscillating!
          planeState.current.x = finalTargetX;
          planeState.current.y = finalTargetY;
          planeState.current.vx = 0;
          planeState.current.vy = 0;
          planeState.current.roll *= 0.85; // smooth return to flat
          planeState.current.isResting = true;
          // Keep the angle frozen at current heading — DO NOT ROTATE!

          // Gradually fade out contrail when at rest
          if (planeTrail.current.length > 0) {
            planeTrail.current.shift();
          }
        } else {
          // Plane is actively flying towards target
          planeState.current.isResting = false;

          // Adaptive cruise speed: faster when far, gentle glide when close
          const maxSpeed = isHovering.current ? 14 : 19;
          const desiredSpeed = Math.min(Math.max(distance * 0.1, 3.2), maxSpeed);

          // Calculate desired heading towards target
          const desiredAngle = Math.atan2(dy, dx);

          // Shortest angular distance interpolation (produces the smooth curvilinear arc)
          let angleDiff = desiredAngle - planeState.current.angle;
          while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
          while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

          // Turn rate constraint creates the smooth curvilinear arc
          const turnRate = distance > 90 ? 0.15 : 0.11;
          planeState.current.angle += angleDiff * turnRate;

          // Banking roll tilt based on turn sharpness
          const targetRoll = Math.max(-30, Math.min(30, angleDiff * 70));
          planeState.current.roll += (targetRoll - planeState.current.roll) * 0.14;

          // Move along current heading
          const vx = Math.cos(planeState.current.angle) * desiredSpeed;
          const vy = Math.sin(planeState.current.angle) * desiredSpeed;

          planeState.current.vx = vx;
          planeState.current.vy = vy;

          planeState.current.x += vx;
          planeState.current.y += vy;

          // Record trail points while flying
          const tailOffsetDist = 16;
          const tailX = planeState.current.x - Math.cos(planeState.current.angle) * tailOffsetDist;
          const tailY = planeState.current.y - Math.sin(planeState.current.angle) * tailOffsetDist;

          const trail = planeTrail.current;
          if (
            trail.length === 0 ||
            Math.hypot(trail[trail.length - 1].x - tailX, trail[trail.length - 1].y - tailY) > 9
          ) {
            trail.push({ x: tailX, y: tailY });
            if (trail.length > 18) {
              trail.shift();
            }
          }
        }
      }

      // 3. RENDER PAPERPLANE WITH ORIENTATION OFFSET
      // In paperplane.svg, the nose naturally points northeast at -45 deg.
      // Therefore, adding 45 deg aligns the nose precisely with the velocity vector.
      const rotationDeg = (planeState.current.angle * 180) / Math.PI + 45;
      const rollDeg = planeState.current.roll;

      if (planeRef.current) {
        planeRef.current.style.transform = `translate3d(${planeState.current.x}px, ${planeState.current.y}px, 0) translate(-50%, -50%) rotate(${rotationDeg}deg) rotateX(${rollDeg}deg)`;
      }

      // 4. RENDER FLIGHT CONTRAIL PATH
      if (trailPathRef.current) {
        const trail = planeTrail.current;
        if (trail.length > 2) {
          let d = `M ${trail[0].x.toFixed(1)} ${trail[0].y.toFixed(1)}`;
          for (let i = 1; i < trail.length - 1; i++) {
            const xc = (trail[i].x + trail[i + 1].x) / 2;
            const yc = (trail[i].y + trail[i + 1].y) / 2;
            d += ` Q ${trail[i].x.toFixed(1)} ${trail[i].y.toFixed(1)}, ${xc.toFixed(1)} ${yc.toFixed(1)}`;
          }
          trailPathRef.current.setAttribute("d", d);
        } else {
          trailPathRef.current.setAttribute("d", "");
        }
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.documentElement.classList.remove("custom-cursor-active");
      cancelAnimationFrame(animationFrameId);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <>
      <style>{`
        *, *::before, *::after, html, body, input, textarea, button, a, select {
          cursor: none !important;
        }
      `}</style>
      <div
        className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
      {/* Curvilinear Flight Contrail (SVG Wind Trail behind Paperplane) */}
      <svg
        ref={trailSvgRef}
        className="pointer-events-none fixed inset-0 h-full w-full overflow-visible"
        style={{ zIndex: 9998 }}
      >
        <defs>
          <linearGradient id="planeContrailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B82A4F" stopOpacity="0" />
            <stop offset="60%" stopColor="#B82A4F" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#991B3D" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <path
          ref={trailPathRef}
          d=""
          fill="none"
          stroke="url(#planeContrailGrad)"
          strokeWidth="2.5"
          strokeDasharray="4 3"
          strokeLinecap="round"
        />
      </svg>

      {/* Trailing Paperplane (Following in smooth curvilinear path) */}
      <div
        ref={planeRef}
        className="pointer-events-none fixed top-0 left-0 will-change-transform"
        style={{ zIndex: 9999 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/paperplane.svg"
          alt=""
          className="h-9 w-9 select-none filter drop-shadow-[2px_3px_0px_#160207]"
          draggable={false}
        />
      </div>

      {/* Immediate Custom Cursor (cursor.svg) */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 will-change-transform origin-top-left"
        style={{ zIndex: 10000 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/cursor.svg"
          alt=""
          className="h-7 w-7 select-none filter drop-shadow-[2px_2px_0px_#160207]"
          draggable={false}
        />
      </div>
    </div>
  </>
);
}
