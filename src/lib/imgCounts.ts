// Populated at build time by next.config.ts from the contents of public/project_*/.
const counts: { [key: string]: number } = JSON.parse(
  process.env.NEXT_PUBLIC_IMG_COUNTS || "{}"
);

export const getImgCount = (url?: string) => (url ? counts[url] || 0 : 0);
