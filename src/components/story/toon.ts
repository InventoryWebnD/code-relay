import * as THREE from "three";

let gradient: THREE.DataTexture | null = null;

/** 3-step ramp: the hard, cel-shaded look of the whole world */
export function toonGradient() {
  if (gradient) return gradient;
  const d = new Uint8Array([70, 70, 70, 255, 160, 160, 160, 255, 255, 255, 255, 255]);
  gradient = new THREE.DataTexture(d, 3, 1, THREE.RGBAFormat);
  gradient.minFilter = THREE.NearestFilter;
  gradient.magFilter = THREE.NearestFilter;
  gradient.generateMipmaps = false;
  gradient.needsUpdate = true;
  return gradient;
}

const cache = new Map<string, THREE.Material>();

/** world-wide rim light: a coloured fresnel edge so dark shapes still read against a night sky */
export const rimUniforms = {
  uRimColor: { value: new THREE.Color("#ff5a7a") },
  uRimStrength: { value: 0.9 },
};

function withRim(m: THREE.MeshToonMaterial) {
  m.onBeforeCompile = (shader) => {
    shader.uniforms.uRimColor = rimUniforms.uRimColor;
    shader.uniforms.uRimStrength = rimUniforms.uRimStrength;
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", "#include <common>\nuniform vec3 uRimColor;\nuniform float uRimStrength;")
      .replace(
        "#include <opaque_fragment>",
        `float rimF = 1.0 - clamp(dot(normalize(normal), normalize(vViewPosition)), 0.0, 1.0);
        rimF = smoothstep(0.55, 0.85, rimF);
        outgoingLight += uRimColor * rimF * uRimStrength;
        #include <opaque_fragment>`
      );
  };
  m.customProgramCacheKey = () => "toon-rim";
  return m;
}

export function toon(color: string, opts: { emissive?: string; glow?: number; side?: THREE.Side; rim?: boolean } = {}) {
  const key = `t:${color}:${opts.emissive}:${opts.glow}:${opts.side}:${opts.rim}`;
  let m = cache.get(key) as THREE.MeshToonMaterial | undefined;
  if (!m) {
    m = new THREE.MeshToonMaterial({
      color,
      gradientMap: toonGradient(),
      emissive: opts.emissive ? new THREE.Color(opts.emissive) : new THREE.Color(0),
      emissiveIntensity: opts.glow ?? 0,
      side: opts.side ?? THREE.FrontSide,
    });
    if (opts.rim !== false) withRim(m);
    cache.set(key, m);
  }
  return m;
}

/** unlit, over-bright colour that blooms */
export function glow(color: string, intensity = 3) {
  const key = `g:${color}:${intensity}`;
  let m = cache.get(key) as THREE.MeshBasicMaterial | undefined;
  if (!m) {
    m = new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity), toneMapped: false });
    cache.set(key, m);
  }
  return m;
}

/** deterministic random */
export function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
