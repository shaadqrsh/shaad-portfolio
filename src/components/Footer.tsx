import { Github, LucideLinkedin, Mail, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <section className="p-4 bg-shaad-200 grid grid-cols-3 justify-evenly items-center">
      <div className="flex justify-center items-center gap-x-4">
        <p className="text-white font-bold text-md">Get in Touch</p>
        <LucideLinkedin className="text-white" />
        <Twitter className="text-white" />
        <Github className="text-white" />
        <Mail className="text-white" />
      </div>
      <p className="text-white text-md mx-auto flex">
        Copyright ©️ {currentYear - 1} - {currentYear} | All rights reserved
      </p>
      <p className="text-white text-md mx-auto flex">
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
