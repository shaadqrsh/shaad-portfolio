import { headers } from "@/lib/header";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-shaad-200 shadow-md">
        <div className="hidden mx-auto px-4 py-3 min-sm:flex items-center justify-between">
          <div className="flex justify-between items-center">
            <h1 className="text-lg text-white font-bold tracking-wider">
              Shaad Qureshi
            </h1>
          </div>
          <ul className="flex space-x-6 text-gray-700 font-medium ml-auto">
            {headers.map((h) => {
              return (
                <li key={h.label}>
                  <Link
                    href={h.link}
                    className="text-white tracking-wider font-semibold text-lg hover:text-shaad-400 transition"
                  >
                    {h.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Button
            className="cursor-pointer bg-transparent text-lg ml-4 hover:bg-shaad-400 hover:text-white  transition-all border-shaad-400 rounded-full border-2 p-6"
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
