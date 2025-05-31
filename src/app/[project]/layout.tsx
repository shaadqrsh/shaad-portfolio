"use client";

import MobileNav from "@/components/MobileNav";
import { ReactNode } from "react";

import { ParallaxProvider } from "react-scroll-parallax";

interface MainLayout {
  children: ReactNode;
}

const layout = ({ children }: MainLayout) => {
  return (
    <ParallaxProvider>
      <section className="flex flex-col h-screen bg-shaad-400">
        {/* <Navbar /> */}
        <MobileNav />
        <main className="flex flex-1 relative">{children}</main>
      </section>
    </ParallaxProvider>
  );
};

export default layout;
