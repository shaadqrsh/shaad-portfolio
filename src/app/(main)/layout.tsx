import Footer from "@/components/Footer";
import HomeBackdrop from "@/components/HomeBackdrop";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

interface MainLayout {
  children: ReactNode;
}

const layout = ({ children }: MainLayout) => {
  return (
    <section className="min-h-screen flex flex-col bg-shaad-400">
      <Navbar />
      <HomeBackdrop />
      {/* overflow-x-clip stops anything that pokes past the side, like the home image's orbiting rings, from adding a sideways scrollbar. */}
      {/* relative z-10 keeps pages above the home backdrop while it fades out. */}
      <div className="relative z-10 flex flex-1 items-start justify-center overflow-x-clip">{children}</div>
      <div className="relative z-10">
        <Footer />
      </div>
    </section>
  );
};

export default layout;
