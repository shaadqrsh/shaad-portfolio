import { headers } from "@/lib/header";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-sm bg-white/10 border-b border-shaad-200/20 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center">
        {/* <div className="text-xl font-bold text-gray-800">Brand</div> */}
        <ul className="flex space-x-6">
          {headers.map((h) => {
            return (
              <li key={h.label}>
                <Link
                  href={h.link}
                  className="text-white tracking-wider font-semibold"
                >
                  {h.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
