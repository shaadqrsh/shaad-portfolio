"use client";
import { headers } from "@/lib/header";
import { cn } from "@/lib/utils";
import Hamburger from "hamburger-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const MobileNav = () => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (toggle) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [toggle]);

  return (
    <>
      <nav
        className={cn(
          "sticky top-0 z-50 backdrop-blur-md bg-shaad-200 shadow-md",
          toggle && "shadow-none"
        )}
      >
        <div className="relative hidden p-4 max-sm:flex items-center justify-center">
          <div className="absolute left-2 mr-auto">
            <Hamburger
              color="white"
              size={30}
              toggle={setToggle}
              toggled={toggle}
            />
          </div>
          <h1 className="text-base text-white font-bold tracking-wider">
            Shaad Qureshi
          </h1>
        </div>
      </nav>
      {toggle && (
        <motion.div
          layout
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5 }}
          className="h-screen z-90 bg-shaad-200 flex flex-col justify-start items-center gap-y-4"
        >
          {headers.map((h) => {
            return (
              <li
                key={h.label}
                className="list-none"
              >
                <Link
                  href={h.link}
                  className="text-white tracking-wider font-semibold text-lg hover:text-shaad-400 transition"
                >
                  {h.label}
                </Link>
              </li>
            );
          })}
        </motion.div>
      )}
    </>
  );
};

export default MobileNav;
