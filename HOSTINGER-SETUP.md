# Connect your domain and enquiry inbox

The production website uses `https://www.gridandlogic.com`. The mailbox is `info@gridandlogic.com` on Hostinger Email.

## Email: no extra API key required

Hostinger SMTP is the default mail delivery option. In Vercel, open this project's **Settings → Environment Variables**, add the variables below to Production (and Preview if you want preview deployments to send email), then redeploy. For a Hostinger Node.js deployment, add the same server-side variables in its app environment settings. Plain static/file hosting cannot run this email endpoint.

| Name | Value |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://www.gridandlogic.com` |
| `SMTP_HOST` | `smtp.hostinger.com` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | `info@gridandlogic.com` |
| `SMTP_PASSWORD` | Your **mailbox password** from Hostinger Email |
| `CONTACT_FROM_EMAIL` | `Grid & Logic <info@gridandlogic.com>` |
| `CONTACT_TO_EMAIL` | `info@gridandlogic.com` |

Use the settings shown under **Hostinger → Emails → Manage → Connect Apps & Devices**. Hostinger's documented default is SSL on port 465. If your account uses STARTTLS instead, set port 587; the endpoint automatically switches to required TLS. Titan/cPanel email products can have different hosts, so use the settings for the actual mailbox product.

Never prefix `SMTP_PASSWORD`, `SMTP_USER`, or email API keys with `NEXT_PUBLIC_`. Do not put real passwords in `.env.example`, GitHub, browser JavaScript, screenshots, or chat. For local development, copy `.env.example` to `.env.local` and fill it in locally. `.env.local` is ignored by Git.

The `/api/send` Next.js route validates the brief, checks the browser origin, checks a hidden spam field, applies a best-effort in-memory limit, and sends it to the inbox. Replying to the email addresses the visitor, through the Reply-To header. The rate limit is per server instance; add a hosting firewall or durable rate limit if the public form receives abuse. The route returns success only after the mail provider accepts the message. The visitor can continue with WhatsApp if delivery fails.

The code is implemented and tested without real credentials. Actual email delivery still needs your environment variables and a real post-deployment test. Confirm receipt in Hostinger Webmail and reply to the test sender. Check your existing SPF, DKIM, and DMARC configuration in Hostinger Email if messages go to spam.

## Optional Resend alternative

If your hosting provider blocks outbound SMTP, use Resend instead: leave `SMTP_PASSWORD` empty, set `RESEND_API_KEY`, and set `RESEND_FROM_EMAIL` to a sender on your verified domain. Keep `CONTACT_TO_EMAIL=info@gridandlogic.com`. The app uses SMTP when its credentials are present; otherwise it uses a fully configured Resend account. You do not need both. No real API key has been generated or committed by this task.

## Domain and DNS

Buying the domain at Hostinger does not require a Hostinger API key in the website. If Vercel hosts this repository, add `gridandlogic.com` and `www.gridandlogic.com` under the project's **Settings → Domains**. Use the exact A/CNAME/verification records Vercel shows for your project. Enter those records in Hostinger's active DNS Zone Editor. Do not copy generic IP addresses from old tutorials.

Keep Hostinger's existing **MX**, email-related **TXT** (SPF/DKIM/DMARC), and mail-autoconfiguration records. Also keep the records for `bros-shoes`, `clothing`, `dental-clinic`, and `container`: they are your existing sample/configurator subdomains. Only change the website root/www records that Vercel requests. If your nameservers point elsewhere, edit DNS with that nameserver provider instead. Set the non-www hostname to redirect permanently to www after both domains are verified. Confirm HTTPS works.

The private Sites preview is for visual review. Deploy the Next.js GitHub project to a Node-capable host for SMTP delivery. Do not point your business domain at a private preview.

## Search launch

See [SEARCH-LAUNCH.md](SEARCH-LAUNCH.md) for the client-account verification steps, optional verification environment variables, IndexNow, and ongoing measurement.

1. After the public domain serves the new deployment, verify the domain in Google Search Console and Bing Webmaster Tools.
2. Submit `https://www.gridandlogic.com/sitemap.xml` and request indexing for the homepage and six service pages.
3. Keep your agency name, domain, email, and phone consistent across official social profiles. Add the genuine LinkedIn URL when available.
4. Publish detailed, substantiated case studies for Pixel Nest and Zaka. No search ranking or AI recommendation is guaranteed by a technical implementation.

The website includes static-rendered service content, metadata, canonicals, a sitemap, robots.txt, JSON-LD, social previews, and an optional `llms.txt` agency summary. `llms.txt` is not a guaranteed AI ingestion or ranking mechanism.

## Official references

- [Hostinger Email connection settings](https://www.hostinger.com/support/1575756-how-to-get-email-account-configuration-details-for-hostinger-email/)
- [Hostinger DNS Zone Editor](https://www.hostinger.com/support/how-to-use-hostingers-dns-zone-editor/)
- [Vercel custom domains](https://vercel.com/docs/domains/working-with-domains/add-a-domain)
- [Google AI search guidance](https://developers.google.com/search/docs/appearance/ai-features)
