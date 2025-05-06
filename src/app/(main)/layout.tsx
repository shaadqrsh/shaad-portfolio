import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

interface MainLayout {
  children: ReactNode;
}

const layout = ({ children }: MainLayout) => {
  return (
    <section className="min-h-screen flex flex-col bg-shaad-400">
      <Navbar />
      <MobileNav />
      <div className="flex-1">{children}</div>
      <Footer />
    </section>
  );
};

export default layout;
