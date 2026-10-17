import { Container } from "@/app/components/ui/Container";
import { Logo } from "@/app/components/ui/Logo";
import { nav, site, socials } from "@/app/data/site";

const SocialGlyph = {
  Instagram: (
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.67 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.15-3.23 1.67-4.77 4.92-4.92C8.42 2.17 8.8 2.16 12 2.16Zm0 3.68a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-11.84a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z" />
  ),
  Facebook: (
    <path d="M24 12.07C24 5.44 18.63.07 12 .07S0 5.44 0 12.07c0 5.99 4.39 10.95 10.13 11.85v-8.38H7.08v-3.47h3.05V9.43c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.95h-1.51c-1.49 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.38C19.61 23.02 24 18.06 24 12.07Z" />
  ),
  Threads: (
    <path d="M16.2 11.15c-.1-.05-.2-.09-.3-.13-.18-3.26-1.96-5.13-4.95-5.15h-.04c-1.79 0-3.28.77-4.19 2.16l1.64 1.13c.68-1.04 1.75-1.26 2.55-1.26h.03c1 .01 1.75.3 2.24.86.36.41.6.98.72 1.7-.9-.15-1.87-.2-2.9-.13-2.92.17-4.8 1.87-4.67 4.24.06 1.2.66 2.23 1.69 2.9.87.57 1.99.85 3.15.79 1.54-.08 2.72-.67 3.55-1.73.63-.81 1.03-1.86 1.2-3.18.72.43 1.25 1 1.55 1.68.5 1.16.53 3.07-1.02 4.62-1.36 1.36-3 1.94-5.48 1.96-2.76-.02-4.84-.9-6.19-2.61C5.5 17.36 4.85 15.14 4.83 12c.02-3.14.67-5.36 1.93-6.9C8.11 3.39 10.19 2.5 12.95 2.5c2.78.02 4.88.91 6.24 2.63.67.85 1.17 1.91 1.5 3.15l1.93-.51c-.4-1.52-1.03-2.84-1.89-3.93C18.98 1.65 16.35.52 12.96.5h-.01C9.57.52 6.97 1.65 5.22 3.85 3.67 5.81 2.87 8.53 2.85 11.99v.02c.02 3.46.82 6.18 2.37 8.14 1.75 2.2 4.35 3.33 7.74 3.35h.01c3.02-.02 5.15-.81 6.9-2.56 2.29-2.29 2.22-5.16 1.47-6.92-.54-1.26-1.57-2.29-2.98-2.97Zm-4.9 5.14c-1.28.07-2.61-.5-2.68-1.75-.05-.93.66-1.96 2.76-2.08.24-.01.48-.02.71-.02.76 0 1.48.07 2.13.21-.24 3.03-1.66 3.57-2.92 3.64Z" />
  ),
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-5">
            <a href="#home" aria-label={`${site.name} — home`} className="inline-flex">
              <Logo />
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-dim">
              Grid & Logic designs and builds intelligent digital products for growth-stage brands.
            </p>

            <ul className="mt-7 flex items-center gap-2.5">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-dim transition-colors hover:border-accent hover:text-accent"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[15px] w-[15px]">
                      {SocialGlyph[social.label]}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-faint">
              Navigate
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-ink-dim transition-colors hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-faint">
              Get in touch
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              <li>
                <a
                  href={site.emailHref}
                  className="text-sm text-ink-dim transition-colors hover:text-ink"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.phoneHref}
                  className="text-sm text-ink-dim transition-colors hover:text-ink"
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink-dim transition-colors hover:text-ink"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-faint">
            © {year} {site.name}
          </p>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-faint">
            Remote-first, global reach
          </p>
        </div>
      </Container>
    </footer>
  );
}
