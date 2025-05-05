import { homePara } from "@/lib/Data";
import { links } from "@/lib/header";
import Image from "next/image";

const Home = () => {
  return (
    <section className="bg-shaad-400 text-white h-full flex items-center justify-center px-6">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        <div className="flex-1 border-shaad-100 border-2 p-4 rounded-4xl shadow-2xl">
          <h3 className="text-shaad-600 text-xl mb-1">Hello,</h3>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            I&apos;m <span className="text-white">Shaad Qureshi</span>
          </h1>
          <h2 className="text-xl text-gray-300 mb-2">Professional ChutPaglu</h2>
          <p className="text-gray-400 mb-3 max-w-md">{homePara}</p>
          <div className="flex gap-4">
            {links.map((l, idx) => {
              return (
                <a
                  href={l.href}
                  key={idx}
                >
                  <l.label
                    className="text-white min-lg:text-sm text-xs hover:text-shaad-100 transition"
                    size={18}
                  />
                </a>
              );
            })}
          </div>
        </div>

        <div className="relative flex-1 ml-4 max-sm:mx-auto">
          <Image
            src="vercel.svg"
            width={100}
            height={100}
            alt="Alina Smith"
            className="relative z-10 w-full max-w-sm object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
