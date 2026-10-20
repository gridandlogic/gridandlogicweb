import Image from "next/image";
import Link from "next/link";

function Brand() {
  return (
    <Link className="brand" href="/" aria-label="Grid and Logic home">
      <Image src="/icon-192.png" alt="" width={43} height={43} sizes="43px" />
      grid
      <span>
        <em>&amp;</em>logic
      </span>
    </Link>
  );
}

export function AgencyFooter() {
  return (
    <>
      <footer className="footer xallama-closing">
        <div className="wrap">
          <div className="closing-social">
            <div className="footer-social">
              <a
                href="https://www.instagram.com/gridandlogic/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram ↗
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61592258005096"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook ↗
              </a>
              <a
                href="https://www.threads.com/@gridandlogic"
                target="_blank"
                rel="noopener noreferrer"
              >
                Threads ↗
              </a>
            </div>
            <a href="mailto:info@gridandlogic.com">info@gridandlogic.com ↗</a>
          </div>
          <div className="closing-grid">
            <div>
              <Brand />
              <p>
                We connect creative thinking with smart engineering. Websites,
                brands, and interactive experiences — built to bring your next
                chapter to life.
              </p>
            </div>
            <nav aria-label="Footer navigation">
              <Link href="/">Home</Link>
              <Link href="/work/">Our work</Link>
              <Link href="/about/">About the studio</Link>
              <Link href="/#samples">Samples</Link>
              <Link href="/services/">Services</Link>
              <Link href="/#contact">Contact</Link>
            </nav>
            <div className="closing-note">
              <span className="dot" /> Remote studio. Worldwide ambition.
              <p>
                Good ideas start with a conversation.
                <br />
                Let’s hear yours.
              </p>
              <a className="text-link" href="https://wa.me/923374992211">
                Start a conversation ↗
              </a>
            </div>
          </div>
          <Link className="closing-cta" href="/#contact">
            Get in touch<span aria-hidden="true">↗</span>
          </Link>
          <div className="footer-bottom">
            <span>GRID &amp; LOGIC © {new Date().getFullYear()}</span>
            <div>
              <Link href="/privacy/">Privacy</Link>
              <a href="/sitemap.xml">Sitemap ↗</a>
              <span>DESIGN MEETS POSSIBILITY.</span>
            </div>
          </div>
        </div>
      </footer>
      <a
        className="whatsapp"
        href="https://wa.me/923374992211"
        aria-label="Chat with Grid and Logic on WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.7a8.5 8.5 0 1 1 16.2-4.2Z" />
          <path d="M8 7.5c-.8 1 .2 3.2 1.8 4.8s3.8 2.6 4.8 1.8l1.1-1.1-2.6-1.5-.8.8c-1.1-.5-2.1-1.5-2.6-2.6l.8-.8L9 6.4Z" />
        </svg>
      </a>
    </>
  );
}
