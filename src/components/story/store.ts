import * as THREE from "three";

/**
 * Shared, mutable story state. The DOM side writes scroll progress and the
 * pointer; the R3F side reads it every frame. Kept outside React on purpose:
 * nothing here should trigger a re-render.
 */
export const story = {
  /** raw scroll progress through the story section, 0..1 */
  target: 0,
  /** damped progress the 3D world actually uses */
  p: 0,
  /** pointer in NDC (-1..1) */
  pointer: new THREE.Vector2(0, 0),
  /** seconds (performance.now) of the last click inside the stage */
  jumpAt: -10,
  /** world-space position of the baton (for particles / camera) */
  baton: new THREE.Vector3(),
  /** focus of the camera: the team's center on the track */
  focus: new THREE.Vector3(),
  /** footstep counter, bumped by runners; the sound engine listens */
  steps: 0,
  narrow: false,
  reduced: false,
  /** set to jump the camera straight to its shot (no easing) */
  snap: false,
};

export type ChapterId = "start" | "idea" | "tracks" | "pass" | "sprint" | "finish";

export const CHAPTERS: { id: ChapterId; from: number; to: number }[] = [
  { id: "start", from: 0, to: 0.1 },
  { id: "idea", from: 0.1, to: 0.29 },
  { id: "tracks", from: 0.29, to: 0.47 },
  { id: "pass", from: 0.47, to: 0.64 },
  { id: "sprint", from: 0.64, to: 0.84 },
  { id: "finish", from: 0.84, to: 1.0001 },
];

export const clamp = (v: number, a = 0, b = 1) => Math.min(Math.max(v, a), b);
export const smooth = (t: number) => t * t * (3 - 2 * t);
/** local 0..1 progress of p inside [a, b] */
export const range = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

/** piecewise-linear lookup through sorted [x, y] keys */
export function keyed(keys: [number, number][], x: number) {
  if (x <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    if (x <= keys[i][0]) {
      const [x0, y0] = keys[i - 1];
      const [x1, y1] = keys[i];
      return y0 + (y1 - y0) * smooth((x - x0) / (x1 - x0));
    }
  }
  return keys[keys.length - 1][1];
}

/** where the team is along the track (curve u) for a given story progress */
export const TEAM_U: [number, number][] = [
  [0, 0],
  [0.075, 0],
  [0.29, 0.25],
  [0.47, 0.455],
  [0.555, 0.565],
  [0.6, 0.6],
  [0.84, 0.855],
  [0.93, 0.963],
  [1, 0.966],
];

/** fixed points of the story on the track (curve u) */
export const MARK = {
  start: 0.004,
  fork: 0.37,
  pass: 0.585,
  arena: 0.76,
  finish: 0.955,
};

/** palette */
export const PAL = {
  ink: "#15060B",
  black: "#1c1e1f",
  cream: "#F6F0E8",
  paper: "#FFFBF5",
  crimson: "#991B3D",
  crimsonHot: "#C2264F",
  wine: "#620821",
  navy: "#0B1B4D",
  navySoft: "#24398A",
  teal: "#5AA7A7",
  sun: "#F5B000",
  blush: "#F2B8C6",
};
