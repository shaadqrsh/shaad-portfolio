"use client";
import { headers } from "@/lib/header";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const MobileNav = () => {
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: "-100vh" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0, y: "-100vh" }}
        className="flex items-center justify-center fixed bg-shaad-400 top-0 left-0 w-full h-full z-10"
      >
        <ul className="list-none p-0 flex flex-col gap-6 mt-6">
          {headers.map((h, idx) => (
            <li key={idx}>
              <a
                href={h.link}
                className={cn(
                  "text-white flex tracking-wider items-center font-semibold text-xl hover:text-shaad-600 transition",
                  pathname.startsWith(h.link) ? "text-white" : "text-shaad-100"
                )}
              >
                <h.icon
                  className="mr-2"
                  size={23}
                />
                {h.label}
              </a>
            </li>
          ))}
        </ul>
      </motion.nav>
    </>
  );
};

export default MobileNav;
