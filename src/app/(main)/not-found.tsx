import NotFoundContent from "@/components/NotFoundContent";

/**
 * notFound() from a page inside the site layout, such as an unknown project
 * slug. The layout already draws the navbar and footer, so this is only the
 * message. The root not-found.tsx handles addresses that match no route.
 */
export default function NotFound() {
  return <NotFoundContent />;
}
