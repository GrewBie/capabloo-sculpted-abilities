import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const products = [
  {
    title: "Custom Socket Design",
    description:
      "3D-scanned and algorithmically optimized for your exact residual limb anatomy. Zero guesswork, total precision.",
    stat: "0.1mm",
    statLabel: "Tolerance",
    gradient: "from-brand-orange/10 to-brand-orange/5",
  },
  {
    title: "Lightweight Fabrication",
    description:
      "Advanced polymer printing produces sockets up to 40% lighter than traditional methods while maintaining structural integrity.",
    stat: "40%",
    statLabel: "Lighter",
    gradient: "from-brand-blue/10 to-brand-blue/5",
  },
  {
    title: "Rapid Production",
    description:
      "From scan to finished socket in days, not weeks. Our streamlined digital workflow eliminates manual casting entirely.",
    stat: "72hr",
    statLabel: "Turnaround",
    gradient: "from-brand-orange/10 to-brand-blue/5",
  },
];

function ProductCard({
  product,
  index,
}: {
  product: (typeof products)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95, y: 40 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.15,
      }}
      className="group relative"
    >
      <div className="glass rounded-2xl p-8 sm:p-10 h-full transition-all duration-500 hover:shadow-lg hover:shadow-primary/5">
        {/* Stat badge */}
        <div className="mb-8">
          <span className="text-5xl sm:text-6xl font-display font-bold text-gradient-brand">
            {product.stat}
          </span>
          <p className="text-sm text-muted-foreground mt-1 uppercase tracking-wider">
            {product.statLabel}
          </p>
        </div>

        <h3 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-4">
          {product.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {product.description}
        </p>

        {/* Decorative line */}
        <div className="mt-8 h-px w-full bg-gradient-to-r from-primary/30 to-transparent" />
      </div>
    </motion.div>
  );
}

export default function ProductShowcase() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 });

  return (
    <section className="py-32 sm:py-40 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="mb-20 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-sm uppercase tracking-[0.3em] text-primary mb-4 font-body"
          >
            The Solution
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground leading-[1.1] tracking-tight"
          >
            Precision-crafted
            <br />
            for <span className="text-gradient-brand">you</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.title} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
