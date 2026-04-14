import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

export default function VideoVisionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Dark cinematic background */}
      <div className="absolute inset-0 bg-foreground">
        {/* Placeholder gradient simulating video overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.12 0.03 250) 0%, oklch(0.08 0.02 40) 50%, oklch(0.1 0.025 260) 100%)",
          }}
        />
        {/* Overlay for text legibility */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Parallax-offset typography */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm uppercase tracking-[0.3em] text-white/50 mb-8 font-body"
        >
          Our Vision
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1] tracking-tight"
        >
          Every body is{" "}
          <span
            style={{
              background: "linear-gradient(135deg, oklch(0.75 0.18 50), oklch(0.65 0.15 250))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            unique
          </span>
          .
          <br />
          Every solution
          <br />
          should be too.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="mt-10 text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
        >
          We combine precision 3D scanning with advanced additive manufacturing 
          to create prosthetic sockets that conform to your exact anatomy — 
          eliminating pressure points and maximizing comfort from day one.
        </motion.p>
      </div>

      {/* Decorative accent lines */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 w-32 h-px origin-center"
        style={{
          background: "linear-gradient(90deg, transparent, oklch(0.7 0.18 50), transparent)",
        }}
      />
    </section>
  );
}
