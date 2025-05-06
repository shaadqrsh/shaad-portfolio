"use client";
import { headers } from "@/lib/header";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-shaad-200 shadow-md">
        <div className="hidden mx-auto px-4 py-3 min-sm:flex items-center justify-between">
          <div className="flex justify-between items-center">
            <h1 className="text-lg text-white font-bold tracking-wider">
              Shaad Qureshi
            </h1>
          </div>
          <ul className="flex min-md:space-x-10 gap-x-6 text-gray-700 font-medium ">
            {headers.map((h) => {
              return (
                <li key={h.label}>
                  <Link
                    href={h.link}
                    className={cn(
                      "text-white tracking-wider font-semibold text-lg hover:text-shaad-400 transition",
                      pathname === h.link ? "text-white" : "text-white/30"
                    )}
                  >
                    {h.label}
                  </Link>
                  {pathname === h.link && (
                    <div className="p-1 bg-white w-1 h-1 rounded-full flex mx-auto" />
                  )}
                </li>
              );
            })}
          </ul>
          <Button
            className="cursor-pointer bg-transparent text-lg ml-4 hover:bg-shaad-400 hover:text-white transition-all border-shaad-600 rounded-full border-2 p-6"
            variant="default"
          >
            Download CV
          </Button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
