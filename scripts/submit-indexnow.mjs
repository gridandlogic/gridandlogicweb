// Run after the changed URLs and public ownership key are live.
// IndexNow keys are intentionally public verification files, not API secrets.
import fs from "node:fs";
const origin = "https://www.gridandlogic.com";
const { key } = JSON.parse(
  fs.readFileSync(
    new URL("../public/indexnow-key.json", import.meta.url),
    "utf8",
  ),
);
const keyLocation = `${origin}/${key}.txt`;
const liveKey = await fetch(keyLocation);
if (!liveKey.ok || (await liveKey.text()).trim() !== key)
  throw new Error(
    "The matching ownership key is not live. Deploy before submitting.",
  );
const sitemap = await fetch(`${origin}/sitemap.xml`);
if (!sitemap.ok) throw new Error("Cannot read the live sitemap.");
const urlList = [
  ...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g),
].map((m) => m[1].replaceAll("&amp;", "&"));
if (!urlList.length || urlList.some((u) => new URL(u).origin !== origin))
  throw new Error("Unexpected sitemap URLs.");
if (!process.argv.includes("--submit")) {
  console.log("Dry run: verified public key and sitemap. URLs:", urlList);
  console.log("Use --submit to notify IndexNow of these deployed pages.");
} else {
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(origin).hostname,
      key,
      keyLocation,
      urlList,
    }),
  });
  if (![200, 202].includes(response.status))
    throw new Error(
      `IndexNow returned ${response.status}: ${await response.text()}`,
    );
  console.log(
    `IndexNow accepted ${urlList.length} URLs (HTTP ${response.status}). Acceptance does not confirm indexing.`,
  );
}
