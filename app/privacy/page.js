import Link from "next/link";
import { StructuredData } from "@/app/components/StructuredData";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Learn what information Grid & Logic collects through this website, how it is used, and the choices available to you.",
  alternates: { canonical: "/privacy/" },
};

export default function Privacy() {
  return (
    <main id="main">
      <StructuredData
        page={{
          path: "/privacy/",
          name: "Privacy Policy",
          type: "WebPage",
          parent: { path: "/", name: "Home" },
        }}
      />
      <section className="page-hero">
        <div className="wrap">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / Privacy
          </div>
          <div className="eyebrow">Your information</div>
          <h1>Privacy Policy</h1>
          <p>Effective date: 23 October 2026</p>
        </div>
      </section>
      <section className="section wrap privacy">
        <p>
          This policy explains how Grid &amp; Logic handles information when you
          visit gridandlogic.com or contact us through this website. It covers
          the information we receive, why we use it, who helps us process it,
          how long we keep it, and how you can contact us about your privacy.
        </p>

        <h2>Who is responsible for your information?</h2>
        <p>
          Grid &amp; Logic is an independent digital agency and product studio
          providing website development, ecommerce, design, and related
          services. Grid &amp; Logic is responsible for the personal information
          described in this policy. For privacy questions or requests, email
          <a href="mailto:info@gridandlogic.com"> info@gridandlogic.com</a> with
          “Privacy request” in the subject line.
        </p>

        <h2>Information you choose to provide</h2>
        <p>
          If you submit the project enquiry form, we collect your name, email
          address, selected service, and the project message you write. The form
          also includes a hidden anti-spam field. Please do not send passwords,
          payment card details, government identification numbers, or sensitive
          personal information through the form.
        </p>
        <p>
          If you contact us by email, phone, or WhatsApp, we receive the
          contact details and message you choose to send through that service.
          WhatsApp opens with a prepared message only if you choose that option;
          you review and send it yourself. The privacy terms of WhatsApp and
          other third-party services apply to your use of those services.
        </p>

        <h2>Information received when you use the website</h2>
        <p>
          When a browser requests a web page or submits the form, the website
          host and its infrastructure may automatically receive technical
          information needed to deliver, secure, and troubleshoot the service.
          This can include an IP address, browser and device details, requested
          page, referring page, and request time. Our enquiry endpoint
          temporarily uses the request IP address to limit repeated submissions.
          That rate-limit data is held in server memory and is not used to
          identify you for advertising.
        </p>

        <h2>How we use information</h2>
        <ul>
          <li>To read and respond to project enquiries and other messages.</li>
          <li>To understand your needs and prepare a scope, estimate, or proposal you request.</li>
          <li>To operate, secure, maintain, and improve the website and prevent spam or misuse.</li>
          <li>To keep records needed to deliver agreed services and meet legal or accounting obligations.</li>
        </ul>
        <p>
          We do not use information submitted through the enquiry form to add
          you to a marketing mailing list. We do not sell personal information.
          Where applicable law requires a legal basis, we process an enquiry to
          take steps you request before a contract, to pursue our legitimate
          interests in operating the website and responding to business
          enquiries, to meet legal obligations, or on the basis of your consent
          where consent is required.
        </p>

        <h2>Email delivery and other service providers</h2>
        <p>
          Form submissions are sent to our business inbox at
          info@gridandlogic.com using the email delivery provider configured for
          the website. Depending on the active configuration, this may be
          Hostinger Email or Resend. The website is hosted on infrastructure
          that processes technical requests to serve the pages and form. These
          providers process information on our behalf to provide their services
          and may have their own limited security and operational logs.
        </p>
        <p>
          We may also disclose information if required by law, to protect people
          or the website from fraud or abuse, or as part of a business transfer.
          We do not otherwise share enquiry details with unrelated third parties
          for their own marketing.
        </p>

        <h2>Cookies, analytics, and advertising</h2>
        <p>
          This website does not currently use advertising pixels or analytics
          cookies. The website host may use essential technical mechanisms to
          deliver and protect the site. If we add analytics, advertising, or
          other non-essential tracking in the future, we will update this policy
          and provide any choices required by applicable law.
        </p>

        <h2>International processing</h2>
        <p>
          Grid &amp; Logic works with clients internationally, and our hosting
          and email providers may process information in countries other than
          the country where you are located. Where applicable law requires
          safeguards for an international transfer, we rely on the relevant
          provider’s contractual or other lawful transfer protections.
        </p>

        <h2>How long we keep information</h2>
        <p>
          We keep an enquiry while we are responding to it and, ordinarily, for
          up to 24 months after our last substantive contact so we can follow up
          on the request and maintain appropriate business records. If an
          enquiry becomes a client project, we keep relevant project and
          transaction records for the relationship and for any period required
          by law. We delete or remove identifying details when they are no
          longer needed, subject to legal, security, and dispute-resolution
          requirements. Technical logs and temporary anti-spam data are kept
          according to the relevant hosting and service configuration.
        </p>

        <h2>Your choices and privacy rights</h2>
        <p>
          Depending on where you live, you may have the right to ask for a copy
          of your personal information, correct it, request deletion or
          restriction, object to certain processing, or withdraw consent where
          processing relies on consent. To make a request, email
          info@gridandlogic.com from an address that lets us reasonably verify
          your request. We may need to confirm your identity and may retain
          information that we are legally required or permitted to keep. You may
          also have the right to complain to your local data protection
          authority.
        </p>

        <h2>Security and children</h2>
        <p>
          We use reasonable technical and organisational measures intended to
          protect information, and limit access to people who need it to respond
          or deliver services. No website or transmission method can be
          guaranteed completely secure. This business website is intended for
          businesses and adults; we do not knowingly collect personal
          information from children under 16. If you believe a child has sent
          us information, contact us and we will review and remove it where
          appropriate.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this page when our practices or legal obligations
          change. The effective date at the top shows when this version was
          published. Material changes will be reflected on this page.
        </p>
      </section>
    </main>
  );
}
