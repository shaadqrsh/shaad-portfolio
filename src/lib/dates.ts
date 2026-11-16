// Dates in resume_data.json are dd/mm/yyyy strings, with 00 for an unknown
// day or month ("00/08/2026" is August 2026, "00/00/2025" is just 2025).

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const parts = (date: string) => date.split("/").map(Number) as [number, number, number];

/** "Aug 2026", "Nov 27, 2025" or "2025", depending on how much of the date is known. */
export const formatDate = (date?: string) => {
  if (!date) return "";
  const [d, m, y] = parts(date);
  if (!m) return String(y);
  if (!d) return `${MONTHS[m - 1]} ${y}`;
  return `${MONTHS[m - 1]} ${d}, ${y}`;
};

export const yearOf = (date: string) => parts(date)[2];

/** Sortable number for a date string; newer is larger. */
export const dateKey = (date: string) => {
  const [d, m, y] = parts(date);
  return y * 10000 + m * 100 + d;
};

interface Span {
  startDate: string;
  endDate?: string;
  inProgress?: boolean;
}

/** "Jan 2026 to Present", or "Jan 2026 to May 2028 (expected)" for a dated course still in progress. */
export const dateRange = ({ startDate, endDate, inProgress }: Span) => {
  const end = inProgress ? (endDate ? `${formatDate(endDate)} (expected)` : "Present") : formatDate(endDate);
  return end ? `${formatDate(startDate)} to ${end}` : formatDate(startDate);
};

/** "2023 to 2025", "2026 to Present", or a single year when it starts and ends in the same one. */
export const yearRange = ({ startDate, endDate, inProgress }: Span) => {
  const start = yearOf(startDate);
  if (inProgress) return `${start} to Present`;
  if (!endDate || yearOf(endDate) === start) return String(start);
  return `${start} to ${yearOf(endDate)}`;
};
