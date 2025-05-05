import { links } from "@/lib/header";
import { Copyright } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <section className="p-4 bg-shaad-200 grid grid-cols-3 justify-evenly items-center max-sm:flex max-sm:flex-col max-sm:gap-y-4">
      <div className="flex flex-col justify-center items-center gap-x-4">
        <p className="text-white font-bold min-lg:text-sm text-xs">
          Get in Touch
        </p>
        <div className="flex gap-x-4 mt-2">
          {links.map((l, idx) => {
            return (
              <a
                href={l.href}
                key={idx}
              >
                <l.label
                  className="text-white min-lg:text-sm text-xs hover:text-shaad-400 transition"
                  size={18}
                />
              </a>
            );
          })}
        </div>
      </div>
      <p className="text-white min-lg:text-sm text-xs mx-auto flex text-center items-center">
        Copyright
        <Copyright
          className="mx-1"
          size={16}
        />
        {currentYear - 1} - {currentYear} | All rights reserved
      </p>
      <p className="text-white min-lg:text-sm text-xs mx-auto flex">
        Designed By{" "}
        <a
          href="https://hardikportfolio-hardik-malhotra.vercel.app"
          target="_blank"
          className="underline hover:text-blue-400 ml-1"
        >
          Hardik Malhotra
        </a>
      </p>
    </section>
  );
};

export default Footer;
