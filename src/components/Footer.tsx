import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const links = [
  {
    label: Linkedin,
    href: "",
  },
  {
    label: Twitter,
    href: "",
  },
  {
    label: Github,
    href: "",
  },
  {
    label: Mail,
    href: "",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <section className="p-4 bg-shaad-200 grid grid-cols-3 justify-evenly items-center">
      <div className="flex justify-center items-center gap-x-4">
        <p className="text-white font-bold text-sm">Get in Touch</p>
        {links.map((l, idx) => {
          return (
            <a
              href={l.href}
              key={idx}
            >
              <l.label
                className="text-white"
                size={18}
              />
            </a>
          );
        })}
      </div>
      <p className="text-white text-sm mx-auto flex">
        Copyright ©️ {currentYear - 1} - {currentYear} | All rights reserved
      </p>
      <p className="text-white text-sm mx-auto flex">
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
