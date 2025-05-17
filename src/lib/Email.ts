export const EMAIL = "shaadqrsh.work@gmail.com";

export function handleEmail() {
  const recipient = EMAIL;
  const subject = "";
  const body = "";

  const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoUrl;
}
