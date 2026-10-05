import { useEffect, useRef } from "react";
import * as THREE from "three";

const STAR_VERTEX = `
  uniform float uTime;
  uniform float uPixelRatio;

  attribute float aSize;
  attribute float aPhase;
  attribute float aTwinkle;
  attribute vec3 aColor;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

    float twinkle =
      0.68 +
      0.32 * sin(
        uTime * aTwinkle +
        aPhase
      );

    float depthScale =
      280.0 / max(12.0, -mvPosition.z);

    gl_PointSize =
      aSize *
      uPixelRatio *
      depthScale *
      twinkle;

    gl_Position =
      projectionMatrix *
      mvPosition;

    vColor = aColor;

    vAlpha =
      0.55 +
      0.45 * twinkle;
  }
`;

const STAR_FRAGMENT = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 uv =
      gl_PointCoord -
      vec2(0.5);

    float distanceFromCenter =
      length(uv);

    float core =
      1.0 -
      smoothstep(
        0.0,
        0.20,
        distanceFromCenter
      );

    float glow =
      1.0 -
      smoothstep(
        0.08,
        0.50,
        distanceFromCenter
      );

    float alpha =
      (core * 0.95 + glow * 0.38) *
      vAlpha;

    if (alpha < 0.015) {
      discard;
    }

    gl_FragColor =
      vec4(
        vColor,
        alpha
      );
  }
`;

const STAR_COLORS = [
  new THREE.Color("#ffffff"),
  new THREE.Color("#dff6ff"),
  new THREE.Color("#8ed8ff"),
  new THREE.Color("#6fa8ff"),
  new THREE.Color("#b9a5ff"),
  new THREE.Color("#ffd7ad"),
];

function createStarLayer({
  count,
  spreadX,
  spreadY,
  minZ,
  maxZ,
  minSize,
  maxSize,
  speedMin,
  speedMax,
}) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);
  const twinkles = new Float32Array(count);

  for (let i = 0; i < count; i += 1) {
    const i3 = i * 3;

    const x =
      (Math.random() - 0.5) *
      spreadX;

    const y =
      (Math.random() - 0.5) *
      spreadY;

    const z =
      minZ +
      Math.random() *
      (maxZ - minZ);

    positions[i3] = x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = z;

    const color =
      STAR_COLORS[
        Math.floor(
          Math.random() *
          STAR_COLORS.length
        )
      ];

    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;

    sizes[i] =
      minSize +
      Math.random() *
      (maxSize - minSize);

    phases[i] =
      Math.random() *
      Math.PI *
      2;

    twinkles[i] =
      speedMin +
      Math.random() *
      (speedMax - speedMin);
  }

  const geometry =
    new THREE.BufferGeometry();

  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
      positions,
      3
    )
  );

  geometry.setAttribute(
    "aColor",
    new THREE.BufferAttribute(
      colors,
      3
    )
  );

  geometry.setAttribute(
    "aSize",
    new THREE.BufferAttribute(
      sizes,
      1
    )
  );

  geometry.setAttribute(
    "aPhase",
    new THREE.BufferAttribute(
      phases,
      1
    )
  );

  geometry.setAttribute(
    "aTwinkle",
    new THREE.BufferAttribute(
      twinkles,
      1
    )
  );

  const material =
    new THREE.ShaderMaterial({
      uniforms: {
        uTime: {
          value: 0,
        },

        uPixelRatio: {
          value: Math.min(
            window.devicePixelRatio || 1,
            2
          ),
        },
      },

      vertexShader:
        STAR_VERTEX,

      fragmentShader:
        STAR_FRAGMENT,

      transparent: true,

      depthWrite: false,

      blending:
        THREE.AdditiveBlending,
    });

  return {
    points:
      new THREE.Points(
        geometry,
        material
      ),

    geometry,
    material,
  };
}

function disposeLayer(layer) {
  if (!layer) {
    return;
  }

  layer.geometry.dispose();
  layer.material.dispose();
}

export default function Career3D() {
  const containerRef =
    useRef(null);

  useEffect(() => {
    const container =
      containerRef.current;

    if (!container) {
      return undefined;
    }

    const scene =
      new THREE.Scene();

    scene.fog =
      new THREE.FogExp2(
        0x02040a,
        0.004
      );

    const camera =
      new THREE.PerspectiveCamera(
        58,
        window.innerWidth /
          window.innerHeight,
        0.1,
        260
      );

    camera.position.set(
      0,
      0,
      34
    );

    const renderer =
      new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference:
          "high-performance",
      });

    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio || 1,
        2
      )
    );

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    renderer.outputColorSpace =
      THREE.SRGBColorSpace;

    renderer.setClearColor(
      0x000000,
      0
    );

    container.appendChild(
      renderer.domElement
    );

    /* =====================================================
       DEEP STAR FIELD
       ===================================================== */

    const farStars =
      createStarLayer({
        count: 7200,
        spreadX: 105,
        spreadY: 68,
        minZ: -150,
        maxZ: -18,
        minSize: 0.22,
        maxSize: 0.72,
        speedMin: 0.35,
        speedMax: 1.10,
      });

    const midStars =
      createStarLayer({
        count: 1500,
        spreadX: 92,
        spreadY: 60,
        minZ: -105,
        maxZ: 2,
        minSize: 0.45,
        maxSize: 1.55,
        speedMin: 0.55,
        speedMax: 1.65,
      });

    const brightStars =
      createStarLayer({
        count: 180,
        spreadX: 82,
        spreadY: 54,
        minZ: -78,
        maxZ: 12,
        minSize: 1.1,
        maxSize: 3.4,
        speedMin: 0.65,
        speedMax: 1.95,
      });

    scene.add(
      farStars.points,
      midStars.points,
      brightStars.points
    );

    /* =====================================================
       SUBTLE DEPTH DUST
       ===================================================== */

    const dust =
      createStarLayer({
        count: 500,
        spreadX: 120,
        spreadY: 76,
        minZ: -130,
        maxZ: -25,
        minSize: 0.3,
        maxSize: 0.9,
        speedMin: 0.2,
        speedMax: 0.7,
      });

    dust.points.material.opacity =
      0.35;

    scene.add(
      dust.points
    );

    /* =====================================================
       MOUSE PARALLAX
       ===================================================== */

    const mouse = {
      x: 0,
      y: 0,
    };

    const targetMouse = {
      x: 0,
      y: 0,
    };

    const handlePointerMove = (
      event
    ) => {
      targetMouse.x =
        (event.clientX /
          window.innerWidth -
          0.5) *
        2;

      targetMouse.y =
        (event.clientY /
          window.innerHeight -
          0.5) *
        2;
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove,
      { passive: true }
    );

    /* =====================================================
       RESIZE
       ===================================================== */

    const handleResize = () => {
      camera.aspect =
        window.innerWidth /
        window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setPixelRatio(
        Math.min(
          window.devicePixelRatio || 1,
          2
        )
      );

      renderer.setSize(
        window.innerWidth,
        window.innerHeight
      );

      [
        farStars,
        midStars,
        brightStars,
        dust,
      ].forEach((layer) => {
        layer.material.uniforms.uPixelRatio.value =
          Math.min(
            window.devicePixelRatio || 1,
            2
          );
      });
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    /* =====================================================
       ANIMATION
       ===================================================== */

    const clock =
      new THREE.Clock();

    let animationFrame;

    const animate = () => {
      const elapsed =
        clock.getElapsedTime();

      /* Smooth mouse */
      mouse.x +=
        (targetMouse.x -
          mouse.x) *
        0.025;

      mouse.y +=
        (targetMouse.y -
          mouse.y) *
        0.025;

      /* Slow cinematic camera drift */
      camera.position.x +=
        (
          mouse.x * 1.15 +
          Math.sin(
            elapsed * 0.07
          ) *
            0.35 -
          camera.position.x
        ) *
        0.018;

      camera.position.y +=
        (
          -mouse.y * 0.75 +
          Math.cos(
            elapsed * 0.055
          ) *
            0.22 -
          camera.position.y
        ) *
        0.018;

      /* Gentle opening depth */
      const targetZ =
        22 +
        Math.sin(
          elapsed * 0.06
        ) *
          0.35;

      camera.position.z +=
        (targetZ -
          camera.position.z) *
        0.012;

      camera.lookAt(
        mouse.x * 0.7,
        -mouse.y * 0.45,
        -25
      );

      /* Give each layer a slightly different drift */
      farStars.points.rotation.y =
        elapsed * 0.003;
      farStars.points.rotation.x =
        Math.sin(
          elapsed * 0.04
        ) *
        0.002;

      midStars.points.rotation.y =
        -elapsed * 0.005;
      midStars.points.rotation.x =
        Math.cos(
          elapsed * 0.035
        ) *
        0.003;

      brightStars.points.rotation.y =
        elapsed * 0.008;

      dust.points.rotation.y =
        -elapsed * 0.002;

      /* Update twinkle uniforms */
      [
        farStars,
        midStars,
        brightStars,
        dust,
      ].forEach((layer) => {
        layer.material.uniforms.uTime.value =
          elapsed;
      });

      renderer.render(
        scene,
        camera
      );

      animationFrame =
        requestAnimationFrame(
          animate
        );
    };

    animate();

    /* =====================================================
       CLEANUP
       ===================================================== */

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      window.removeEventListener(
        "resize",
        handleResize
      );

      disposeLayer(
        farStars
      );

      disposeLayer(
        midStars
      );

      disposeLayer(
        brightStars
      );

      disposeLayer(
        dust
      );

      renderer.dispose();

      if (
        renderer.domElement.parentNode ===
        container
      ) {
        container.removeChild(
          renderer.domElement
        );
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="career-3d"
      aria-hidden="true"
    />
  );
}
