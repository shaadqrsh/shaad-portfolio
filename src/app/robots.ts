import type { MetadataRoute } from "next";
import { abs } from "@/lib/siteUrl";

// Named AI/LLM crawlers get an explicit allow rather than relying on the
// wildcard, since a few of them (and the tools recruiters run) check for their
// own user-agent before deciding whether they are welcome.
const AI_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "GoogleOther",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
  "cohere-ai",
  "Meta-ExternalAgent",
  "DuckAssistBot",
  "YouBot",
  "Amazonbot",
  "MistralAI-User",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: AI_AGENTS,
        allow: "/",
      },
    ],
    sitemap: abs("/sitemap.xml"),
    host: abs("/"),
  };
}
