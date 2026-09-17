import { profile, projects } from "@/lib/agentProfile";
import { abs } from "@/lib/siteUrl";

export const dynamic = "force-static";

/** Projects with full detail, for agents that only care about the work. */
export async function GET() {
  const body = {
    author: profile.fullName,
    documentation: abs("/llms.txt"),
    generatedAt: new Date().toISOString(),
    count: projects.length,
    projects,
  };

  return Response.json(body, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
