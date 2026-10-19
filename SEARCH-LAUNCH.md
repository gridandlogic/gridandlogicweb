# Grid & Logic search launch

Production origin: **https://www.gridandlogic.com**. Canonical source: `gridandlogic/gridandlogicweb` on GitHub.

## Implemented in code

- Server-rendered home, six service pages, About page, selected work index, and two project write-ups with contextual internal links.
- Unique page titles, descriptions, canonicals, one main heading per page, descriptive image text, social previews, mobile layouts, and crawlable navigation.
- Organization/WebSite identity, service markup, page/breadcrumb markup, CreativeWork project markup, and FAQ markup matching visible answers.
- Direct answers to service questions, consistent official mailbox and phone, and an optional `llms.txt` factual summary.
- `robots.txt` permits crawlers. Hosting/CDN rules must also permit legitimate search crawlers.
- Sitemap includes 13 canonical content URLs. No fake update dates or review/rating markup.
- Optional Google/Bing HTML verification tokens read from environment variables; blank values produce no verification tag.
- Public IndexNow ownership file and a deployment-time submission script. This public key is not a mailbox/API secret.

FAQ markup describes the visible questions and answers; Google's FAQ rich result feature was retired in May 2026. `llms.txt` is optional; Google does not require an AI file or special AI schema. None of these changes guarantees ranking, indexing, or AI citation.

## Google Search Console — use the client's Google account

1. Sign in at https://search.google.com/search-console/welcome using the account that should own this business property.
2. Add a **Domain** property: `gridandlogic.com` (no protocol or `www`). This covers the main domain and subdomains.
3. Choose TXT verification and copy the exact `google-site-verification=...` value generated in that account. Do not reuse a token from another person's account.
4. In Hostinger, open the domain's DNS / Nameservers settings and manage DNS records. If the authoritative nameservers point to another provider, use that provider's DNS editor instead.
5. Add a new **TXT** record, name **@**, value **the full Google verification string**, default TTL. Preserve all current website, subdomain, mail, SPF, DKIM and DMARC records.
6. Return to Google and click **Verify**. DNS propagation can delay verification. Keep the TXT record after verification.
7. Under **Sitemaps**, submit `https://www.gridandlogic.com/sitemap.xml`. Confirm the report reads Success and that the sitemap lists `www` URLs; submission alone is not proof that pages are indexed.
8. Inspect `https://www.gridandlogic.com/` (the canonical homepage), run **Test live URL**, then select **Request indexing**. Repeat for `/services/web-development/` and `/services/3d-configurators/`, then submit the other service and work pages. Inspect `https://gridandlogic.com/` and confirm it permanently redirects to the matching `www` URL.
9. After Google processes the site, review Page indexing, Core Web Vitals, HTTPS and Performance. Compare submitted URLs with indexed URLs and investigate exclusions before changing content.
10. Under **Settings → Search generative AI**, confirm **Include my site's links and content in Search generative AI features** (the default, or inherited equivalent). Review the **Generative AI performance** report when sufficient impression data exists. This is an account setting, so it was deferred with the rest of the client's account setup.

The initial setup attempt in this session reached an unverified property in the current signed-in account. Verification and sitemap submission were intentionally deferred at the owner's request. Set up the actual property in the client's account; no DNS token from that attempt is shipped in code.

### Optional HTML-tag fallback

For a **URL-prefix** property (`https://www.gridandlogic.com/`), choose HTML tag verification. Set `GOOGLE_SITE_VERIFICATION` in Vercel Production to only the tag's `content` value, redeploy, then verify. HTML tags cannot verify a Domain property. Do not set this variable when DNS verification is sufficient.

## Bing Webmaster Tools

1. Sign in at https://www.bing.com/webmasters using the client's chosen account.
2. After Google verification, use **Import from Google Search Console**. Have the client review the requested Google access before granting it. Choose the Grid & Logic property.
3. Alternatively add `https://www.gridandlogic.com/` manually. For meta tag verification, put only the `msvalidate.01` content value into `BING_SITE_VERIFICATION` in Vercel Production, redeploy, then verify. Bing also offers DNS/XML verification.
4. Check whether the sitemap was imported. If absent, submit `https://www.gridandlogic.com/sitemap.xml` under Sitemaps.
5. Use URL Inspection on the main pages, review Site Scan and crawl/index reports, and fix actionable findings. Review AI citation reports if available in the account.

## IndexNow after deployment

From the repository directory:

```powershell
node scripts/submit-indexnow.mjs
node scripts/submit-indexnow.mjs --submit
```

The first command is a dry run. The second notifies participating engines of the deployed sitemap URLs. The script verifies that the public ownership key is live first. HTTP 200/202 confirms receipt, not indexing. Run after meaningful page changes; it is not a Google sitemap submission mechanism.

## What the business still needs to supply

- The correct official LinkedIn URL, if one exists. Add it consistently to the site and organization schema only after verifying it.
- Accurate team names/roles, genuine project responsibilities, approved client quotes, and measured project outcomes. The current write-ups use only the project scope supplied; no invented conversion numbers or testimonials.
- Real service location and customer-contact model if local SEO is required. Do not publish fabricated addresses, mass city pages or an ineligible business listing.
- Consistent agency name, domain and contact information on existing social profiles. Request real client mentions/links where appropriate; avoid paid/spam link schemes.

## Measurement and ongoing work

Search Console/Bing account data is the first baseline once verification is complete. Track brand queries (Grid & Logic, Grid and Logic, Gridandlogic), relevant service queries, landing pages, qualified enquiries, and crawl/index errors. Record actual AI answer citations with engine, prompt, date and source URL; results vary by query and session. Do not treat a single AI answer as a visibility score.

Review monthly after enough data accumulates. Improve the pages that attract relevant impressions but fail to answer the query. Add substantive case evidence as it becomes available. Core Web Vitals field data requires real traffic; a Lighthouse lab run is diagnostic evidence, not a field-performance guarantee.

Current verification: production build and the 13-page rendered-content audit pass. A fresh Lighthouse measurement could not be collected because its package download failed; the public PageSpeed API returned HTTP 429. Run https://pagespeed.web.dev/ against the production homepage after deployment and review mobile LCP, INP and CLS in Search Console once field data is available. No performance score or field-data pass is claimed.

## Official instructions

- https://support.google.com/webmasters/answer/9008080
- https://support.google.com/webmasters/answer/7451001
- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- https://support.google.com/webmasters/answer/16908024
- https://support.google.com/webmasters/answer/16984139
- https://developers.google.com/search/updates
- https://www.bing.com/webmasters/help/add-and-verify-site-12184f8b
- https://www.indexnow.org/documentation
