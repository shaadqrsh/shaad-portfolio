import Button from "@/components/ui/button";
import { FolderOpen, House } from "lucide-react";

/** The 404 message, shared by the root 404 page and the one inside the site layout. */
const NotFoundContent = () => (
  <div className="w-full max-w-[860px] px-8 py-8 text-white max-sm:px-4 max-sm:pb-14">
    <div className="flex flex-col items-start gap-5 rounded-4xl bg-shaad-200 p-8 shadow-2xl max-sm:rounded-3xl max-sm:p-5">
      <p className="font-label text-xs font-medium uppercase tracking-[0.06em] text-shaad-ink-3">Error 404</p>
      <h1 className="font-display text-[34px] leading-tight font-bold tracking-[-0.01em] text-shaad-600 max-sm:text-[26px]">
        Page not found
      </h1>
      <p className="max-w-[60ch] text-[17px] leading-[1.7] text-shaad-ink max-sm:text-base">
        There is no page at this address. It may have moved, or the link may have a typo. The projects list has
        everything I have built.
      </p>
      <div className="flex flex-wrap gap-2.5">
        <Button href="/projects">
          <FolderOpen className="size-[18px]" aria-hidden />
          <span className="font-semibold">See projects</span>
        </Button>
        <Button href="/home" variant="tinted">
          <House className="size-[18px]" aria-hidden />
          <span className="font-semibold">Go home</span>
        </Button>
      </div>
    </div>
  </div>
);

export default NotFoundContent;
