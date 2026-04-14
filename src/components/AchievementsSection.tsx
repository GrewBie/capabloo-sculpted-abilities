import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 2500, suffix: "+", label: "Patients Helped", icon: "♿" },
  { value: 98, suffix: "%", label: "Satisfaction Rate", icon: "★" },
  { value: 150, suffix: "+", label: "Clinics Worldwide", icon: "🌐" },
  { value: 72, suffix: "hr", label: "Avg. Turnaround", icon: "⚡" },
];

function AnimatedCounter({
  target,
  suffix,
  duration = 2000,
  start,
}: {
  target: number;
  suffix: string;
  duration?: number;
  start: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let rafId: number;

    function animate(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    }

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [start, target, duration]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function AchievementsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section className="py-32 sm:py-40 px-6 bg-surface-warm">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4 font-body">
            Impact
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground tracking-tight">
            Measurable <span className="text-gradient-brand">outcomes</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-center group"
            >
              <div className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground mb-3 tabular-nums">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  start={isInView}
                />
              </div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </p>
              {/* SVG accent */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 + i * 0.1 }}
                className="mt-4 mx-auto w-12 h-0.5 origin-center"
                style={{
                  background:
                    "linear-gradient(90deg, var(--brand-orange), var(--brand-blue))",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
