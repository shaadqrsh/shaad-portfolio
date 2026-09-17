import { fullProfile } from "@/lib/agentProfile";
import { abs } from "@/lib/siteUrl";

export const dynamic = "force-static";

/** Everything the site knows, in one JSON document. */
export async function GET() {
  const body = {
    $schema: "https://schema.org/Person",
    generatedAt: new Date().toISOString(),
    documentation: abs("/llms.txt"),
    ...fullProfile,
  };

  return Response.json(body, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
