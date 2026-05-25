import resumeData from "./resume_data.json";

export const EMAIL = resumeData.links.find((l) => l.text === "Email")?.href || "shaadqrsh.work@gmail.com";

export function handleEmail() {
  const recipient = EMAIL;
  const subject = "";
  const body = "";

  const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoUrl;
}
