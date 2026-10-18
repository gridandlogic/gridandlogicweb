export const metadata = {
  title: "Privacy Policy",
  description:
    "How Grid & Logic handles enquiries, contact information, and third-party services.",
  alternates: { canonical: "/privacy/" },
};
export default function Privacy() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">The details</div>
          <h1>Your privacy matters.</h1>
          <p>Last updated: 17 October 2026</p>
        </div>
      </section>
      <section className="section wrap privacy">
        <h2>Who we are</h2>
        <p>
          Grid & Logic is a digital agency and product studio. Contact
          info@gridandlogic.com with privacy questions.
        </p>
        <h2>Project enquiries</h2>
        <p>
          When you submit a project brief, we process your name, email address,
          selected service, and message to respond to your enquiry, discuss your
          project, and prepare a proposal. Our website sends the enquiry to our
          business inbox using our configured email provider, Hostinger Email or
          Resend. We do not add you to a marketing list through this form.
        </p>
        <h2>Alternative contact methods</h2>
        <p>
          If email delivery is unavailable, you can choose to open WhatsApp with
          your prepared brief. You review and send the message yourself.
          WhatsApp and linked social or project websites operate under their own
          privacy policies.
        </p>
        <h2>Technical information</h2>
        <p>
          Our hosting provider may process request information, including IP
          addresses, to deliver and protect the site. The contact endpoint uses
          limited, temporary request information to limit repeated submissions.
          Fonts are served with the website. This version does not include
          advertising pixels or analytics cookies.
        </p>
        <h2>Retention and your requests</h2>
        <p>
          We retain enquiry information as needed to respond, carry out agreed
          work, and meet applicable obligations. Contact info@gridandlogic.com
          to request access, correction, or deletion, subject to applicable
          requirements. Please do not include passwords, payment details, or
          sensitive information in an enquiry.
        </p>
      </section>
    </main>
  );
}
