import * as cheerio from "cheerio";

export interface ExtractedUrlContent {
  url: string;
  domain: string;
  title: string;
  author?: string;
  publisher?: string;
  publicationDate?: string;
  text: string;
  wordCount: number;
}

// Security: Prevent Server-Side Request Forgery (SSRF)
function isSafeUrl(targetUrl: string): boolean {
  try {
    const parsed = new URL(targetUrl);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return false;
    }
    const hostname = parsed.hostname.toLowerCase();
    
    // Disallow local, loopback, private ranges
    if (
      hostname === "localhost" ||
      hostname.endsWith(".localhost") ||
      hostname.endsWith(".local") ||
      hostname.endsWith(".internal") ||
      hostname === "127.0.0.1" ||
      hostname === "0.0.0.0" ||
      hostname === "::1" ||
      hostname.startsWith("192.168.") ||
      hostname.startsWith("10.") ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostname)
    ) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export async function extractArticleFromUrl(targetUrl: string): Promise<ExtractedUrlContent> {
  if (!isSafeUrl(targetUrl)) {
    throw new Error("Invalid or restricted URL. Only public HTTP/HTTPS URLs are allowed.");
  }

  const response = await fetch(targetUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 TruthLensAI/1.0",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
    },
    signal: AbortSignal.timeout(12000), // 12-second timeout
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch URL: HTTP ${response.status} ${response.statusText}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  // Remove unwanted elements
  $("script, style, noscript, nav, header, footer, iframe, aside, .advertisement, .ad, .cookie-banner, .social-share").remove();

  // Extract domain
  const parsedUrl = new URL(targetUrl);
  const domain = parsedUrl.hostname.replace(/^www\./, "");

  // Extract Title
  let title =
    $('meta[property="og:title"]').attr("content") ||
    $('meta[name="twitter:title"]').attr("content") ||
    $("h1").first().text().trim() ||
    $("title").text().trim() ||
    "Untitled Document";
  title = title.replace(/\s+/g, " ").trim();

  // Extract Author
  const author =
    $('meta[name="author"]').attr("content") ||
    $('meta[property="article:author"]').attr("content") ||
    $('[rel="author"]').first().text().trim() ||
    $('.author, .byline, [itemprop="author"]').first().text().trim() ||
    undefined;

  // Extract Publisher
  const publisher =
    $('meta[property="og:site_name"]').attr("content") ||
    $('meta[name="publisher"]').attr("content") ||
    domain;

  // Extract Publication Date
  const rawDate =
    $('meta[property="article:published_time"]').attr("content") ||
    $('meta[name="pubdate"]').attr("content") ||
    $('meta[name="publish-date"]').attr("content") ||
    $("time").first().attr("datetime") ||
    $("time").first().text().trim() ||
    undefined;

  let publicationDate: string | undefined = undefined;
  if (rawDate) {
    try {
      const parsedD = new Date(rawDate);
      if (!isNaN(parsedD.getTime())) {
        publicationDate = parsedD.toISOString().split("T")[0];
      } else {
        publicationDate = rawDate.slice(0, 30);
      }
    } catch {
      publicationDate = rawDate.slice(0, 30);
    }
  }

  // Extract Article text
  let bodyText = "";
  const articleEl = $("article, [itemprop='articleBody'], .article-body, .story-body, main");

  if (articleEl.length > 0) {
    const paragraphs: string[] = [];
    articleEl.find("p").each((_, el) => {
      const pText = $(el).text().trim();
      if (pText.length > 30) {
        paragraphs.push(pText);
      }
    });
    bodyText = paragraphs.join("\n\n");
  }

  if (!bodyText || bodyText.length < 100) {
    const generalParagraphs: string[] = [];
    $("p").each((_, el) => {
      const pText = $(el).text().trim();
      if (pText.length > 35) {
        generalParagraphs.push(pText);
      }
    });
    bodyText = generalParagraphs.slice(0, 35).join("\n\n");
  }

  if (!bodyText || bodyText.length < 50) {
    bodyText = $("body").text().replace(/\s+/g, " ").trim().slice(0, 4000);
  }

  const wordCount = bodyText.split(/\s+/).filter(Boolean).length;

  return {
    url: targetUrl,
    domain,
    title,
    author: author ? author.slice(0, 100) : undefined,
    publisher: publisher ? publisher.slice(0, 100) : undefined,
    publicationDate,
    text: bodyText,
    wordCount,
  };
}
