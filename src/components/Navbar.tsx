"use client";
import { headers } from "@/lib/header";
import { cn } from "@/lib/utils";
import Hamburger from "hamburger-react";
import { FileUser } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-shaad-200 shadow-md">
        <div className="absolute left-2 mr-auto top-[10px] min-sm:hidden">
          <Hamburger
            color="white"
            size={25}
            toggle={setToggle}
            toggled={toggle}
          />
        </div>

        <div className="mx-auto px-8 py-4 flex items-center min-sm:justify-between justify-center">
          <div className="flex justify-between items-center">
            <h1 className="min-sm:text-2xl text-lg text-white font-bold tracking-wider flex items-center">
              <a href="/home">
              <motion.img
                src="/icon.png"
                className="mr-2 min-sm:w-[55px] min-sm:h-[55px] w-[35px] h-[35px]"
              />
              </a>
              <a href="/home">Shaad Qureshi</a>
            </h1>
          </div>
          <ul className="hidden min-sm:flex min-md:space-x-10 gap-x-6 text-gray-700 font-medium">
            {headers.map((h) => {
              return (
                <li key={h.label}>
                  <Link
                    href={h.link}
                    className={cn(
                      "text-white flex tracking-wider items-center font-semibold text-xl hover:text-shaad-600 transition",
                      pathname.startsWith(h.link)
                        ? "text-white"
                        : "text-shaad-100"
                    )}
                  >
                    <h.icon
                      className="mr-2"
                      size={23}
                    />
                    {h.label}
                  </Link>
                  {pathname.startsWith(h.link) && (
                    <div className="mt-2 p-1 bg-shaad-600 w-2 h-2 rounded-full flex mx-auto" />
                  )}
                </li>
              );
            })}
          </ul>

          <a
            className=" hidden cursor-pointer bg-transparent text-lg ml-4 hover:bg-shaad-600 hover:text-white transition-all border-shaad-600 rounded-full border-2 px-6 py-3 min-sm:flex items-center text-white"
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileUser
              size={20}
              className="mr-2"
            />
            View CV
          </a>
        </div>
      </nav>

      <AnimatePresence
        initial={false}
        onExitComplete={() => null}
      >
        {toggle && <MobileNav />}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
