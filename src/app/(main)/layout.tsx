import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

interface MainLayout {
  children: ReactNode;
}

const layout = ({ children }: MainLayout) => {
  return (
    <section className="min-h-screen flex flex-col bg-shaad-400">
      <Navbar />
      <div className="flex flex-1 items-center justify-center">{children}</div>
      <div className="relative z-10">
        <Footer />
      </div>
    </section>
  );
};

export default layout;
