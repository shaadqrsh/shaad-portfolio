import NotFoundContent from "@/components/NotFoundContent";
import SiteShell from "@/components/SiteShell";
import { name } from "@/lib/Data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: `Page not found | ${name}` },
  robots: { index: false, follow: true },
};

/**
 * Any address that matches no route. It sits outside the (main) layout, so it
 * brings the navbar and footer itself. Static, so it works without JavaScript.
 */
export default function NotFound() {
  return (
    <SiteShell>
      <NotFoundContent />
    </SiteShell>
  );
}
