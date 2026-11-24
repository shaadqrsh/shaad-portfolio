import Footer from "@/components/Footer";
import HomeBackdrop from "@/components/HomeBackdrop";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

/**
 * The frame every page sits in: skip link, navbar, main region and footer.
 * Used by the (main) layout and by the 404 page, which lives outside it.
 */
const SiteShell = ({ children }: { children: ReactNode }) => (
  <section className="min-h-screen flex flex-col bg-shaad-400">
    {/* Hidden until a keyboard user tabs to it, then it sits over the navbar. */}
    <a
      href="#main"
      className="sr-only rounded-full bg-shaad-fill px-[22px] py-[11px] font-semibold text-white shadow-md focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70]"
    >
      Skip to content
    </a>
    <Navbar />
    <HomeBackdrop />
    {/* overflow-x-clip stops anything that pokes past the side, like the home image's orbiting rings, from adding a sideways scrollbar. */}
    {/* relative z-10 keeps pages above the home backdrop while it fades out. */}
    {/* tabIndex -1 lets the skip link move focus here, so the next Tab starts inside the page. */}
    <main id="main" tabIndex={-1} className="relative z-10 flex flex-1 items-start justify-center overflow-x-clip">
      {children}
    </main>
    <div className="relative z-10">
      <Footer />
    </div>
  </section>
);

export default SiteShell;
