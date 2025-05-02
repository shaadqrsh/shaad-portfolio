import { ReactNode } from "react";

interface MainLayout {
  children: ReactNode;
}

const layout = ({ children }: MainLayout) => {
  return <section className="w-full h-screen bg-shaad-400">{children}</section>;
};

export default layout;
