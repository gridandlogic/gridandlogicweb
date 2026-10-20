import Image from "next/image";
import Link from "next/link";

export default function AgencyHero() {
  return (
    <section
      className="hero elite-opening"
      id="home"
      aria-label="Grid and Logic introduction"
    >
      <div className="hero-light" />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="dot" />
            Website development, ecommerce &amp; 3D configurators
          </div>
          <h1>
            Website development
            <br />
            &amp; 3D product
            <br />
            <em>configurators.</em>
          </h1>
          <p>
            Grid &amp; Logic is a website development agency creating business
            websites, online stores, and interactive 3D product configurators.
            We shape the design, build, and launch around your customers and
            your goals.
          </p>
          <div className="actions">
            <Link className="btn primary" href="/#contact">
              Tell us about your project
              <span className="arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
            <Link className="text-link" href="/services/3d-configurators/">
              Explore 3D configurators <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="hero-note">
            <span className="dot" />
            Independent studio. Working worldwide.
          </div>
        </div>
        <div className="hero-visual-shell" aria-label="Website design example">
          <div className="floating-composition">
            <div className="mock-window">
              <div className="mock-top">
                <i />
                <i />
                <i />
                <span>A NEW PERSPECTIVE, BY G&amp;L</span>
                <b aria-hidden="true">↗</b>
              </div>
              <div className="mock-body">
                <div className="mock-caption">
                  <span>DESIGNED TO STAND APART</span>
                  <strong>
                    Your next
                    <br />
                    <em>chapter.</em>
                  </strong>
                  <span className="mock-pill">
                    Beautifully built. Purposefully made. ↗
                  </span>
                </div>
                <div className="mock-photo">
                  <Image
                    src="/assets/clothing-sample.webp"
                    width="1440"
                    height="1000"
                    alt="Fashion storefront website designed and built by Grid & Logic"
                    priority
                    sizes="(max-width: 760px) 90vw, 45vw"
                  />
                </div>
              </div>
            </div>
            <div className="float-notification">
              <span className="check-circle" aria-hidden="true">
                ✓
              </span>
              <div>
                <strong>From idea to launch.</strong>
                <small>One connected creative partner.</small>
              </div>
            </div>
            <div className="growth-card" aria-hidden="true">
              <div>
                <small>BUILT FOR YOUR NEXT CHAPTER</small>
                <span>↗</span>
              </div>
              <div className="growth-bars">
                {[36, 56, 46, 72, 64, 92].map((height, index) => (
                  <i key={index} style={{ height: `${height}%` }} />
                ))}
              </div>
              <p>Design with direction.</p>
            </div>
          </div>
          <span className="visual-caption">A GLIMPSE OF WHAT’S POSSIBLE</span>
        </div>
      </div>
    </section>
  );
}
