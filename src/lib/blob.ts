// The home photo's blob: a smooth closed shape through seven points around the
// centre, in a 0 to 1 box, each point at its own distance from the centre.
// Shared by components/HomeBlob.tsx and the OpenGraph cards in lib/ogCard.tsx,
// so it lives outside the client component.
const N = 7;
const BASE = [0.45, 0.43, 0.47, 0.44, 0.46, 0.42, 0.45];
const PHASE = [0, 1.7, 3.1, 4.4, 0.9, 2.6, 5.2];

const blobPath = (t: number, scale = 1, amp = 0.035) => {
  const pts = BASE.map((base, i) => {
    const a = (i / N) * Math.PI * 2 - Math.PI / 2;
    const r = (base + amp * Math.sin(t * 0.55 + PHASE[i])) * scale;
    return [0.5 + r * Math.cos(a), 0.5 + r * Math.sin(a)];
  });
  const P = (i: number) => pts[(i + N) % N];
  const f = (n: number) => n.toFixed(4);
  let d = `M${f(P(0)[0])},${f(P(0)[1])}`;
  // Catmull-Rom through the points, written as cubic Beziers.
  for (let i = 0; i < N; i++) {
    const [p0, p1, p2, p3] = [P(i - 1), P(i), P(i + 1), P(i + 2)];
    d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)},${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)},${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])},${f(p2[1])}`;
  }
  return `${d} Z`;
};

/** The red blob the photo sits on. */
export const BLOB_SHAPE = blobPath(0, 1, 0);
/** The thicker ring just outside the blob. */
export const BLOB_RING_1 = blobPath(2, 1.07, 0.03);
/** The thinner, fainter ring further out. */
export const BLOB_RING_2 = blobPath(4, 1.14, 0.03);
