const certifications = [
  "FDA Cleared",
  "ISO 13485",
  "CE Marked",
  "ISO 9001",
  "HIPAA Compliant",
  "ISO 10328",
  "MDR Certified",
  "GMP Compliant",
];

function CertBadge({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 px-8 py-4 mx-4 rounded-full border border-border/60 bg-background/50 select-none shrink-0">
      <div className="w-2 h-2 rounded-full bg-primary/40" />
      <span className="text-sm font-medium text-muted-foreground tracking-wide whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

export default function CertificationsMarquee() {
  return (
    <section className="py-20 sm:py-28 overflow-hidden bg-background border-t border-border/40">
      <div className="text-center mb-12 px-6">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-body">
          Trusted & Certified
        </p>
      </div>

      <div className="relative">
        {/* Left/right fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee w-max">
          {/* Double the items for seamless loop */}
          {[...certifications, ...certifications].map((cert, i) => (
            <CertBadge key={`${cert}-${i}`} label={cert} />
          ))}
        </div>
      </div>
    </section>
  );
}
