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
        <div className="hidden mx-auto px-8 py-4 min-sm:flex items-center justify-between">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl text-white font-bold tracking-wider">
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
                    <div className="mt-2 p-1 bg-shaad-600 w-1 h-1 rounded-full flex mx-auto" />
                  )}
                </li>
              );
            })}
          </ul>
          <Button
            className="cursor-pointer bg-transparent text-lg ml-4 hover:bg-shaad-600 hover:text-white transition-all border-shaad-600 rounded-full border-2 p-6"
            variant="default"
          >
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              View CV
            </a>
          </Button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
