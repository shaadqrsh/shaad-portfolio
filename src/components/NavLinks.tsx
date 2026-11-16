import { EMAIL } from "@/lib/Email";
import { headers, links } from "@/lib/header";
import { cn } from "@/lib/utils";
import { FileUser } from "lucide-react";
import IconButton from "./ui/IconButton";

/** Every page in the nav, in order. Resume is a page like the rest. */
export const pages = [
  ...headers.map(({ label, link, icon }) => ({ label, link, icon })),
  { label: "Resume", link: "/resume", icon: FileUser },
];

export const isActive = (pathname: string, link: string) => pathname === link || pathname.startsWith(`${link}/`);

/** Social links as icon buttons. Email opens the mail app. */
export const Socials = ({ className }: { className?: string }) => (
  <div className={cn("flex gap-2", className)}>
    {links.map(({ text, href, label: Icon }) => {
      const isEmail = href === EMAIL;
      return (
        <IconButton
          key={text}
          label={text}
          href={isEmail ? `mailto:${EMAIL}` : href}
          {...(isEmail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        >
          <Icon />
        </IconButton>
      );
    })}
  </div>
);
