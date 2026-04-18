import { POSTS } from "../../../data/posts";

export function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:5000";
  const items = [...POSTS]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(
      (p) => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${base}/blog/${p.slug}</link>
      <guid>${base}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <category>${p.category}</category>
      <description><![CDATA[${p.excerpt}]]></description>
    </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>EveryMOS</title>
    <link>${base}</link>
    <description>Every military job, explained straight.</description>
    <language>en-us</language>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
