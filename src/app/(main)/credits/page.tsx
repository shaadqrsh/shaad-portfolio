import PolicyPage, { A, Part, Table } from "@/components/PolicyPage";
import { metaFor } from "@/lib/pageMeta";
import { operator } from "@/lib/site";

export const metadata = metaFor("/credits");

const fonts = [
  ["Space Grotesk", "Headings", "The Space Grotesk Project Authors", "/licenses/SpaceGrotesk-OFL.txt"],
  ["IBM Plex Sans", "Body text", "IBM Corp.", "/licenses/IBMPlex-OFL.txt"],
  ["IBM Plex Mono", "Small labels", "IBM Corp.", "/licenses/IBMPlex-OFL.txt"],
];

const libraries: [name: string, url: string, license: string][] = [
  ["Next.js", "https://nextjs.org", "MIT"],
  ["React", "https://react.dev", "MIT"],
  ["Tailwind CSS", "https://tailwindcss.com", "MIT"],
  ["Motion", "https://motion.dev", "MIT"],
  ["Radix UI Dialog", "https://www.radix-ui.com/primitives", "MIT"],
  ["Lucide icons", "https://lucide.dev", "ISC"],
  ["class-variance-authority", "https://github.com/joe-bell/cva", "Apache-2.0"],
  ["clsx", "https://github.com/lukeed/clsx", "MIT"],
  ["tailwind-merge", "https://github.com/dcastil/tailwind-merge", "MIT"],
  ["tw-animate-css", "https://github.com/Wombosvideo/tw-animate-css", "MIT"],
  ["Vercel Web Analytics", "https://github.com/vercel/analytics", "MPL-2.0"],
];

export default function Page() {
  return (
    <PolicyPage
      title="Credits"
      intro={
        <>
          Who designed this site, and the fonts, icons and code libraries it is built with, with the licenses they are
          used under. The site&apos;s text and project material are © {operator.name}.
        </>
      }
    >
      <Part title="Design">
        <p>
          UI and website design by <A href="https://hardik-malhotra.vercel.app">Hardik Malhotra</A>.
        </p>
      </Part>

      <Part title="Fonts">
        <p>
          All three fonts are served from this site and licensed under the SIL Open Font License 1.1. The license
          files are linked below.
        </p>
        <Table
          label="Fonts"
          head={["Font", "Used for", "Copyright", "License"]}
          rows={fonts.map(([name, use, owner, file]) => [name, use, owner, <A key={file} href={file}>OFL 1.1</A>])}
        />
      </Part>

      <Part title="Libraries">
        <Table
          label="Libraries"
          head={["Library", "License"]}
          rows={libraries.map(([name, url, license]) => [<A key={name} href={url} className="text-white">{name}</A>, license])}
        />
      </Part>

      <Part title="Icons and images">
        <p>
          Interface icons are from <A href="https://lucide.dev">Lucide</A> (ISC). The itch.io logo and many of the
          technology logos are from <A href="https://simpleicons.org">Simple Icons</A> (CC0), and technologies with
          no logo of their own use a Lucide icon. Logos of engines, languages and tools belong to
          their owners and appear only to name the software I used. Screenshots, art and videos come from my own
          projects and the teams I made them with.
        </p>
      </Part>
    </PolicyPage>
  );
}
