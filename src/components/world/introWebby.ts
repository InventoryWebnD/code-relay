import * as THREE from "three";

/**
 * The intro loader's WebGL scene: Webby (toon mascot with teal cape, hair
 * shards and a glowing baton) floating in front of a rotating vault door and
 * teal fire, with a progress ring under his feet. Lazy-loaded by IntroLoader so
 * the CSS-only boot pulse shows while three.js arrives.
 */
export type WebbyFrame = {
  dt: number;
  t: number;
  /** 0..1 loading progress shown on the ring */
  shown: number;
  /** smoothed pointer, -1..1 */
  sx: number;
  sy: number;
  /** 0..1 eased exit: Webby dashes at the camera, vault swells */
  exit: number;
  reduce: boolean;
};

export type WebbyScene = {
  resize(): void;
  frame(f: WebbyFrame): void;
  dispose(): void;
};

const TEAL = 0x57a5a8;
const INK = 0x1c1d1d;
const HOT = 0xff3b6b;

const PLANE_VS =
  "varying vec2 q;void main(){q=position.xy;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}";

export function createWebby(canvas: HTMLCanvasElement): WebbyScene {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(35, 1, 0.1, 50);

  /* toon body material with teal rim light so the black silhouette always reads */
  const toon = (c: number, rim = TEAL) =>
    new THREE.ShaderMaterial({
      uniforms: { c: { value: new THREE.Color(c) }, r: { value: new THREE.Color(rim) } },
      vertexShader:
        "varying vec3 n,v;void main(){n=normalize(normalMatrix*normal);vec4 m=modelViewMatrix*vec4(position,1.);v=normalize(-m.xyz);gl_Position=projectionMatrix*m;}",
      fragmentShader:
        "uniform vec3 c,r;varying vec3 n,v;void main(){vec3 N=normalize(n);float f=pow(1.-max(dot(N,normalize(v)),0.),2.4);float l=step(.45,dot(N,normalize(vec3(-.5,.7,.6))));vec3 col=c+.05*l+r*smoothstep(.5,.95,f)*.9;gl_FragColor=vec4(col,1.);}",
    });
  const ink = toon(INK);

  /* ---------- Webby ---------- */
  const webby = new THREE.Group();
  scene.add(webby);
  const rig = new THREE.Group();
  webby.add(rig);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.55, 40, 28), ink);
  head.scale.set(1.08, 0.95, 1);
  head.position.y = 0.95;
  rig.add(head);
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.2, 0.5, 6, 16), ink);
  torso.position.y = 0.25;
  rig.add(torso);
  const limb = (r: number, len: number, x: number, y: number) => {
    const g = new THREE.Group();
    g.position.set(x, y, 0);
    const m = new THREE.Mesh(new THREE.CapsuleGeometry(r, len, 6, 12), ink);
    m.position.y = -(len / 2 + r * 0.6);
    g.add(m);
    rig.add(g);
    return g;
  };
  const legL = limb(0.12, 0.5, -0.14, -0.05);
  const legR = limb(0.12, 0.5, 0.14, -0.05);
  const armL = limb(0.09, 0.32, -0.3, 0.38);
  const armR = limb(0.09, 0.32, 0.3, 0.38);
  armL.rotation.z = -0.5;
  armR.rotation.z = 1.15;
  armR.rotation.x = -0.4;

  /* eyes: angry white slants that track the pointer */
  const eyes = new THREE.Group();
  eyes.position.set(0, 0.93, 0.5);
  rig.add(eyes);
  const es = new THREE.Shape();
  es.moveTo(-0.2, 0.13);
  es.lineTo(0.17, -0.07);
  es.quadraticCurveTo(0, -0.24, -0.22, 0);
  es.lineTo(-0.2, 0.13);
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0xf8f8f6, side: THREE.DoubleSide });
  const eL = new THREE.Mesh(new THREE.ShapeGeometry(es), eyeMat);
  const eR = eL.clone();
  eL.position.set(-0.25, 0, 0.06);
  eR.position.set(0.25, 0, 0.06);
  eR.scale.x = -1;
  eyes.add(eL, eR);

  /* jagged hair shards that float upward */
  type ShardData = { b: THREE.Vector3; p: number; sp: number };
  const shards: THREE.Mesh[] = [];
  const sg = new THREE.OctahedronGeometry(1, 0);
  for (let i = 0; i < 22; i++) {
    const m = new THREE.Mesh(sg, ink);
    const a = Math.random() * Math.PI * 2;
    const h = Math.random();
    const s = 0.06 + Math.random() * 0.11;
    m.scale.set(s * (0.6 + Math.random()), s * (1 + Math.random() * 1.6), s * 0.7);
    const d: ShardData = {
      b: new THREE.Vector3(Math.cos(a) * (0.3 + h * 0.45), 1.35 + h * 0.75, Math.sin(a) * 0.3),
      p: Math.random() * 6.28,
      sp: 1 + Math.random() * 2,
    };
    m.userData = d;
    m.position.copy(d.b);
    rig.add(m);
    shards.push(m);
  }

  /* teal cape wings (vertex-animated, pointed tips) */
  const capeMat = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    uniforms: { t: { value: 0 }, k: { value: 1 } },
    vertexShader:
      "uniform float t,k;varying vec2 u;varying float f;void main(){u=uv;vec3 p=position;float vx=abs(p.x)/1.6;float w=sin(t*7.-vx*2.5+p.y*2.)*k;p.z+=w*.3*vx-vx*.15;p.y+=vx*vx*.75+w*.14*vx;f=w;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}",
    fragmentShader:
      "varying vec2 u;varying float f;void main(){float vx=abs(u.x-.5)*2.;float lo=mix(.08,.52,pow(vx,.8)),hi=mix(1.,.66,pow(vx,1.2));if(u.y<lo||u.y>hi)discard;float d=min(u.y-lo,hi-u.y);vec3 c=mix(vec3(.2,.42,.45),vec3(.34,.65,.66),u.y);c+=f*.08;c=mix(vec3(.06,.08,.08),c,smoothstep(.0,.035,d));gl_FragColor=vec4(c,1.);}",
  });
  const cape = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 1.3, 36, 12), capeMat);
  cape.position.set(0, 0.5, -0.18);
  rig.add(cape);

  /* glowing baton in the right hand */
  const baton = new THREE.Group();
  const bm = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.75, 12), new THREE.MeshBasicMaterial({ color: 0xffd0dc }));
  const batonGlowMat = new THREE.MeshBasicMaterial({ color: HOT, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false });
  const bg = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.8, 12), batonGlowMat);
  baton.add(bm, bg);
  baton.position.set(0.68, 0.32, 0.18);
  baton.rotation.z = -0.12;
  rig.add(baton);

  /* ---------- progress track ---------- */
  const trackMat = new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.DoubleSide,
    uniforms: { p: { value: 0 } },
    vertexShader: PLANE_VS,
    fragmentShader:
      "uniform float p;varying vec2 q;void main(){float a=(atan(q.y,q.x)+3.14159)/6.28318;float on=step(a,p);float head=smoothstep(.06,0.,p-a)*on;vec3 c=mix(vec3(1.,.23,.42),vec3(1.,.85,.9),head);gl_FragColor=vec4(mix(vec3(1.),c,on),on*(.95)+(1.-on)*.14);}",
  });
  const track = new THREE.Mesh(new THREE.RingGeometry(1.45, 1.53, 128), trackMat);
  track.rotation.x = -Math.PI / 2;
  track.position.y = -1.1;
  scene.add(track);
  const lane = new THREE.Mesh(
    new THREE.RingGeometry(1.75, 1.77, 128),
    new THREE.MeshBasicMaterial({ color: TEAL, transparent: true, opacity: 0.3, side: THREE.DoubleSide }),
  );
  lane.rotation.x = -Math.PI / 2;
  lane.position.y = -1.1;
  scene.add(lane);
  const glow = new THREE.Mesh(
    new THREE.CircleGeometry(2.1, 48),
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: PLANE_VS,
      fragmentShader: "varying vec2 q;void main(){float d=length(q)/2.1;gl_FragColor=vec4(vec3(.12,.4,.42)*pow(1.-d,2.2)*.8,1.);}",
    }),
  );
  glow.rotation.x = -Math.PI / 2;
  glow.position.y = -1.12;
  scene.add(glow);
  const runner = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  scene.add(runner);
  const runnerGlow = new THREE.Mesh(
    new THREE.SphereGeometry(0.24, 16, 16),
    new THREE.MeshBasicMaterial({ color: HOT, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false }),
  );
  runner.add(runnerGlow);

  /* ---------- the vault: rotating door + teal fire behind Webby ---------- */
  const fireMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { t: { value: 0 }, p: { value: 0 } },
    vertexShader: "varying vec2 u;void main(){u=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
    fragmentShader:
      "uniform float t,p;varying vec2 u;float h(vec2 a){return fract(sin(dot(a,vec2(127.1,311.7)))*43758.5453);}float n(vec2 a){vec2 i=floor(a),f=fract(a);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1.,0.)),f.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),f.x),f.y);}float fb(vec2 a){float v=0.,k=.5;for(int i=0;i<4;i++){v+=k*n(a);a*=2.1;k*=.5;}return v;}void main(){vec2 q=u*2.-1.;float r=length(q);float a=smoothstep(1.,.08,r);float f=fb(vec2(q.x*2.4,q.y*1.6-t*.7)+fb(vec2(q.x*3.,q.y*2.-t*.45))*.8);float I=clamp(a*(.22+f*1.2+p*.12),0.,1.);vec3 c=mix(vec3(.02,.22,.26),vec3(.34,.65,.66),I);c+=vec3(.5,.9,.9)*pow(I,3.)*.6;gl_FragColor=vec4(c*I*1.2,1.);}",
  });
  const fireMesh = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), fireMat);
  fireMesh.position.set(0, 0.1, -1.2);
  fireMesh.renderOrder = -1;
  scene.add(fireMesh);
  const vault = new THREE.Group();
  vault.position.set(0, 0.1, -1.7);
  scene.add(vault);
  const tm = (o: number) =>
    new THREE.MeshBasicMaterial({ color: TEAL, transparent: true, opacity: o, blending: THREE.AdditiveBlending, depthWrite: false });
  const door = new THREE.Mesh(
    new THREE.CircleGeometry(2.35, 72),
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      vertexShader: PLANE_VS,
      fragmentShader:
        "varying vec2 q;void main(){float d=length(q)/2.35;vec3 c=mix(vec3(.02,.05,.06),vec3(.1,.28,.3),smoothstep(.7,1.,d));gl_FragColor=vec4(c,.5);}",
    }),
  );
  vault.add(door);
  for (const [r, tube, o] of [
    [2.3, 0.03, 0.7],
    [1.9, 0.02, 0.45],
    [0.75, 0.04, 0.6],
  ]) {
    vault.add(new THREE.Mesh(new THREE.TorusGeometry(r, tube, 8, 128), tm(o)));
  }
  const wheel = new THREE.Group();
  const bolts = new THREE.Group();
  vault.add(wheel, bolts);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * 6.2832;
    const m = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.07, 0.03), tm(0.5));
    m.position.set(Math.cos(a) * 1.28, Math.sin(a) * 1.28, 0);
    m.rotation.z = a;
    wheel.add(m);
    const k = new THREE.Mesh(new THREE.CircleGeometry(0.1, 16), tm(0.7));
    k.position.set(Math.cos(a) * 1.85, Math.sin(a) * 1.85, 0);
    wheel.add(k);
  }
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * 6.2832;
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.09, 0.03), tm(0.65));
    m.position.set(Math.cos(a) * 2.1, Math.sin(a) * 2.1, 0);
    m.rotation.z = a;
    bolts.add(m);
  }

  /* ---------- rising teal embers ---------- */
  const N = 140;
  const pos = new Float32Array(N * 3);
  const col = new Float32Array(N * 3);
  const vel = new Float32Array(N);
  const pal = [new THREE.Color(TEAL), new THREE.Color(0x8fe0e0), new THREE.Color(0xe8ffff)];
  const seed = (i: number) => {
    pos[i * 3] = (Math.random() - 0.5) * 3.4;
    pos[i * 3 + 1] = -1.2 + Math.random() * 3.6;
    pos[i * 3 + 2] = -1.2 + Math.random() * 1.4;
    vel[i] = 0.3 + Math.random() * 0.7;
    const c = pal[(Math.random() * 3) | 0];
    col.set([c.r, c.g, c.b], i * 3);
  };
  for (let i = 0; i < N; i++) seed(i);
  const pg = new THREE.BufferGeometry();
  pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  pg.setAttribute("color", new THREE.BufferAttribute(col, 3));
  scene.add(
    new THREE.Points(
      pg,
      new THREE.PointsMaterial({ size: 0.05, vertexColors: true, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false }),
    ),
  );

  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const a = w / h;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(w, h, false);
    cam.aspect = a;
    cam.position.set(0, 0.9, a < 1 ? 6.4 + (1 - a) * 5.5 : 6.4);
    cam.lookAt(0, 0.05, 0);
    cam.updateProjectionMatrix();
  }

  let ph = 0;
  function frame({ dt, t, shown, sx, sy, exit, reduce }: WebbyFrame) {
    const s = reduce ? 0 : 1;
    ph += dt * (2.2 + shown * 1.2);

    /* Webby: float, run cycle, look at the pointer */
    rig.position.y = Math.sin(t * 2.2) * 0.09 * s;
    rig.rotation.y = sx * 0.5 + Math.sin(t * 0.9) * 0.15 * s;
    rig.rotation.x = sy * 0.1;
    rig.rotation.z = -sx * 0.06;
    legL.rotation.x = Math.sin(ph) * 0.35 * s;
    legR.rotation.x = -Math.sin(ph) * 0.35 * s;
    armL.rotation.x = Math.sin(ph - 0.6) * 0.18 * s;
    armR.rotation.x = -0.4 + Math.sin(t * 2.2) * 0.04 * s;
    baton.position.y = 0.32 + Math.sin(t * 2.2) * 0.03 * s;
    eyes.position.x = sx * 0.05;
    eyes.position.y = 0.93 - sy * 0.03;
    eyes.scale.y = t % 4.2 > 4.1 ? 0.1 : 1;
    capeMat.uniforms.t.value = t;
    capeMat.uniforms.k.value = 0.7 + shown * 0.9;
    for (const m of shards) {
      const d = m.userData as ShardData;
      m.position.set(d.b.x, d.b.y + Math.sin(t * d.sp + d.p) * 0.06 + shown * 0.05, d.b.z);
      m.rotation.y += dt * d.sp;
      m.rotation.z = Math.sin(t * d.sp + d.p) * 0.3;
    }
    batonGlowMat.opacity = 0.4 + Math.sin(t * 2) * 0.05 + shown * 0.2;

    /* baton runner dot rides the progress ring */
    trackMat.uniforms.p.value = shown;
    const ang = shown * 6.28318 - 3.14159;
    runner.position.set(Math.cos(ang) * 1.49, -1.1, -Math.sin(ang) * 1.49);
    runnerGlow.scale.setScalar(1 + Math.sin(t * 10) * 0.2);

    for (let i = 0; i < N; i++) {
      pos[i * 3 + 1] += vel[i] * dt * (1 + shown);
      pos[i * 3] += Math.sin(t * vel[i] * 3 + i) * dt * 0.12;
      if (pos[i * 3 + 1] > 2.5) {
        seed(i);
        pos[i * 3 + 1] = -1.2;
      }
    }
    pg.attributes.position.needsUpdate = true;

    fireMat.uniforms.t.value = t;
    fireMat.uniforms.p.value = shown + exit;
    wheel.rotation.z = -shown * 3.1416 - t * 0.06;
    bolts.rotation.z = t * 0.03 + shown * 1.2;
    vault.position.set(-sx * 0.15, 0.1 - sy * 0.08, -1.7);
    vault.scale.setScalar(1 + exit * 0.9);
    fireMesh.scale.setScalar(1 + exit * 0.6);

    /* exit: Webby dashes at the camera */
    webby.position.set(0, exit * 0.4, exit * 4.2);
    webby.scale.setScalar(1 + exit * 0.6);
    webby.rotation.y = exit * 0.6;

    renderer.render(scene, cam);
  }

  function dispose() {
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      m.geometry?.dispose();
      const mat = m.material;
      if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
      else mat?.dispose();
    });
    renderer.dispose();
    renderer.forceContextLoss();
  }

  return { resize, frame, dispose };
}
