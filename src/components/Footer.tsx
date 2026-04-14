export default function Footer() {
  return (
    <footer className="py-20 px-6 bg-foreground text-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-display font-bold mb-4">Capabloo</h3>
            <p className="text-background/50 max-w-sm leading-relaxed">
              Rebuilding abilities through precision 3D-printed prosthetic solutions.
              Custom-fit. Lightweight. Life-changing.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-background/40 mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {["About", "Careers", "Research", "Contact"].map((item) => (
                <li key={item}>
                  <span className="text-background/60 hover:text-background transition-colors cursor-pointer text-sm">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-wider text-background/40 mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              {["Documentation", "For Clinicians", "For Patients", "Support"].map(
                (item) => (
                  <li key={item}>
                    <span className="text-background/60 hover:text-background transition-colors cursor-pointer text-sm">
                      {item}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-background/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-background/30 text-sm">
            © {new Date().getFullYear()} Capabloo. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <span
                key={item}
                className="text-background/30 hover:text-background/60 transition-colors cursor-pointer text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
