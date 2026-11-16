import { PageFrames } from "@/components/PageTransition";
import { ReactNode } from "react";

// Wraps every page so it fades out and in on navigation.
export default function Template({ children }: { children: ReactNode }) {
  return <PageFrames>{children}</PageFrames>;
}
