import SiteShell from "@/components/SiteShell";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => <SiteShell>{children}</SiteShell>;

export default layout;
