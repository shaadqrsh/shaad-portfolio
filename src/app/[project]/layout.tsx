import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

interface MainLayout {
  children: ReactNode;
}

const layout = ({ children }: MainLayout) => {
  return (
    <section className="flex flex-col h-screen bg-shaad-400">
      <Navbar />
      <MobileNav />
      <main className="flex flex-1 relative">{children}</main>
    </section>
  );
};

export default layout;