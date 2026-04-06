"use client";
import { EMAIL, handleEmail } from "@/lib/Email";
import { links } from "@/lib/header";
import { cn } from "@/lib/utils";
import { Copyright, MapPin } from "lucide-react";
import { usePathname } from "next/navigation";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  return (
    <section
      className={cn(
        "px-4 py-6 bg-shaad-200 grid justify-evenly items-center max-sm:flex max-sm:flex-col max-sm:gap-y-4",
        pathname === "/home" ? "grid-cols-1" : "grid-cols-2"
      )}
    >
      {pathname !== "/home" && (
        <div className="mx-auto">
          <div className="flex max-md:flex-col justify-center items-center gap-x-4">
            <p className="text-white font-bold min-lg:text-sm text-xs flex items-center justify-center">
              <MapPin className="mr-1 text-shaad-600" size={20} />
              Get in Touch:
            </p>
            <div className="flex gap-x-4 max-md:mt-2">
              {links.map((l, idx) => {
                return (
                  <a
                    href={l.href}
                    key={idx}
                    target="_blank"
                    onClick={l.href === EMAIL ? handleEmail : undefined}
                  >
                    <l.label
                      className="text-white min-lg:text-sm text-xs hover:text-shaad-600 transition"
                      size={18}
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto">
        <p className="text-white min-lg:text-sm text-xs mx-auto flex text-center items-center">
          Copyright
          <Copyright className="mx-1" size={16} />
          {currentYear - 1} - {currentYear} | All rights reserved
        </p>
      </div>
    </section>
  );
};

export default Footer;
