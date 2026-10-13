// Populated at build time by next.config.ts from the contents of public/:
// every .png, .jpg and .jpeg, keyed by its lowercased path without the extension.
const images: { [key: string]: string } = JSON.parse(
  process.env.NEXT_PUBLIC_IMAGES || "{}"
);

const IMAGE_EXT = /\.(png|jpe?g)$/i;
const keyOf = (src: string) => src.replace(IMAGE_EXT, "").toLowerCase();

/**
 * Resolves a public image path to the file actually on disk, so an image can
 * be saved as .png or .jpg without touching the code or resume_data.json.
 * "/about/img_neu.png", "/about/img_neu.jpg" and "/about/img_neu" all find
 * whichever one exists. Paths that match nothing come back unchanged.
 */
export function img(src: string): string;
export function img(src?: string): string | undefined;
export function img(src?: string) {
  return src ? images[keyOf(src)] ?? src : src;
}

/** An image in a project's folder, e.g. projectImg("bushido", "cover"). */
export const projectImg = (url: string | undefined, name: string) =>
  img(`/project_${url}/${name}`);

// Count only the unbroken img_1..img_N run so a gap never renders a 404.
export const getImgCount = (url?: string) => {
  if (!url) return 0;
  let count = 0;
  while (keyOf(`/project_${url}/img_${count + 1}`) in images) count++;
  return count;
};
