"use client";

import { ReactNode } from "react";

import { ParallaxProvider } from "react-scroll-parallax";

interface MainLayout {
  children: ReactNode;
}

const layout = ({ children }: MainLayout) => {
  return (
    <ParallaxProvider>
      <div className="flex flex-col min-h-screen bg-shaad-400">
        <main className="flex flex-1 relative">{children}</main>
      </div>
    </ParallaxProvider>
  );
};

export default layout;
