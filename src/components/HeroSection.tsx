import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { motion } from "framer-motion";
import * as THREE from "three";

const PARTICLE_COUNT = 3000;

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const { pointer } = useThree();

  const { positions, basePositions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const base = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const sz = new Float32Array(PARTICLE_COUNT);

    const orangeColor = new THREE.Color("#f97316");
    const blueColor = new THREE.Color("#3b82f6");
    const whiteColor = new THREE.Color("#e2e8f0");

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      // Distribute particles in a wide, flowing wave shape
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 2;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = (Math.random() - 0.5) * 3;
      const z = r * Math.sin(phi) * Math.sin(theta) * 0.6;

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;
      base[i3] = x;
      base[i3 + 1] = y;
      base[i3 + 2] = z;

      // Gradient colors: orange → blue → white
      const t = Math.random();
      const color = t < 0.4
        ? orangeColor.clone().lerp(blueColor, t / 0.4)
        : t < 0.7
          ? blueColor.clone().lerp(whiteColor, (t - 0.4) / 0.3)
          : whiteColor.clone();
      col[i3] = color.r;
      col[i3 + 1] = color.g;
      col[i3 + 2] = color.b;

      sz[i] = Math.random() * 3 + 1;
    }

    return { positions: pos, basePositions: base, colors: col, sizes: sz };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.getAttribute("position");
    const arr = posAttr.array as Float32Array;
    const time = clock.getElapsedTime();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const bx = basePositions[i3];
      const by = basePositions[i3 + 1];
      const bz = basePositions[i3 + 2];

      // Flowing wave motion
      const wave = Math.sin(bx * 0.5 + time * 0.4) * 0.3 +
        Math.cos(bz * 0.7 + time * 0.3) * 0.2;

      // Cursor influence
      const dx = pointer.x * 3 - bx;
      const dy = pointer.y * 2 - by;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.max(0, 1 - dist / 3) * 0.5;

      arr[i3] = bx + dx * influence * 0.15;
      arr[i3 + 1] = by + wave + dy * influence * 0.15;
      arr[i3 + 2] = bz + Math.sin(time * 0.2 + i * 0.01) * 0.15;
    }

    posAttr.needsUpdate = true;

    // Gentle overall rotation
    pointsRef.current.rotation.y = time * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <ParticleField />
    </>
  );
}

const headlineVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.5 },
  },
};

const wordVariants = {
  hidden: { y: "100%", opacity: 0, rotateX: -80 },
  visible: {
    y: "0%",
    opacity: 1,
    rotateX: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const subVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const, delay: 1.2 },
  },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 6], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
          >
            <Scene />
          </Canvas>
        </Suspense>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pointer-events-none">
        <motion.div
          variants={headlineVariants}
          initial="hidden"
          animate="visible"
          className="overflow-hidden"
        >
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {["Rebuilding", "Abilities"].map((word) => (
              <div key={word} className="overflow-hidden">
                <motion.span
                  variants={wordVariants}
                  className="inline-block text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold tracking-tight text-secondary"
                  style={{ perspective: "600px" }}
                >
                  {word === "Abilities" ? (
                    <span className="text-gradient-brand">{word}</span>
                  ) : (
                    word
                  )}
                </motion.span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.p
          variants={subVariants}
          initial="hidden"
          animate="visible"
          className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Custom 3D-printed prosthetic solutions designed for your exact anatomy.
          Maximum comfort. Precision engineering. A new standard in mobility.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto"
        >
          <button className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-base tracking-wide hover:opacity-90 transition-opacity">
            Get Started
          </button>
          <button className="px-8 py-4 rounded-full border border-border text-foreground font-medium text-base tracking-wide hover:bg-muted transition-colors">
            Learn More
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-foreground/20 flex items-start justify-center pt-2"
        >
          <div className="w-1 h-2 rounded-full bg-foreground/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
