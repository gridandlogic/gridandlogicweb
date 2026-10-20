import Link from "next/link";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">404 / Off the grid</div>
          <h1>
            Let’s get you
            <br />
            back on track.
          </h1>
          <p>This page may have moved. Find your next idea on our homepage.</p>
          <Link className="btn primary" href="/">
            Back to the homepage ↗
          </Link>
        </div>
      </section>
    </main>
  );
}
