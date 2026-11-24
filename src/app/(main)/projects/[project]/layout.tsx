import { ReactNode } from "react";

interface MainLayout {
  children: ReactNode;
}

const layout = ({ children }: MainLayout) => {
  return (
    // min-w-0 lets these flex items shrink to the screen instead of growing
    // to fit wide content, like the scrolling thumbnail rows.
    <div className="flex flex-col min-h-screen w-full min-w-0 bg-shaad-400">
      {/* A div, not main: the (main) layout already wraps every page in <main>. */}
      <div className="flex flex-1 relative min-w-0">{children}</div>
    </div>
  );
};

export default layout;
