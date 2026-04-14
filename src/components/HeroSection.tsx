import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, Environment } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

function KineticSculpture() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  const geometry = useMemo(() => {
    const geo = new THREE.TorusKnotGeometry(1.8, 0.6, 200, 32, 2, 3);
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.08;
    meshRef.current.rotation.y += delta * 0.12;
    meshRef.current.rotation.x += (pointer.y * 0.3 - meshRef.current.rotation.x) * 0.02;
    meshRef.current.rotation.z += (pointer.x * 0.3 - meshRef.current.rotation.z) * 0.02;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} geometry={geometry} scale={1.1}>
        <MeshTransmissionMaterial
          backside
          samples={6}
          thickness={0.5}
          chromaticAberration={0.15}
          anisotropy={0.3}
          distortion={0.4}
          distortionScale={0.5}
          temporalDistortion={0.2}
          ior={1.5}
          color="#f97316"
          roughness={0.1}
          toneMapped={true}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-3, 2, -4]} intensity={0.6} color="#3b82f6" />
      <spotLight position={[0, 8, 0]} intensity={0.8} color="#f97316" angle={0.5} penumbra={0.8} />
      <KineticSculpture />
      <Environment preset="studio" environmentIntensity={0.4} />
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
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const subVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: 1.2 },
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
                  className="inline-block text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold tracking-tight text-foreground"
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
