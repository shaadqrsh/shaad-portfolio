import PolicyPage, { A, Part, Table } from "@/components/PolicyPage";
import { metaFor } from "@/lib/pageMeta";
import { operator, services } from "@/lib/site";

export const metadata = metaFor("/cookies");

export default function Page() {
  return (
    <PolicyPage
      title="Cookie Policy"
      intro={
        <>
          This site sets no cookies and stores nothing in your browser&apos;s local storage or session storage. That is
          why there is no cookie banner: there is nothing to accept or reject.
        </>
      }
    >
      <Part title="Everything stored in your browser">
        <Table
          label="Cookies and browser storage"
          head={["Set by", "What", "Purpose", "Lasts"]}
          rows={[
            ["This site", "Nothing", "No cookies, local storage or session storage of any kind.", "Not applicable"],
            [
              services.analytics.name,
              "Nothing",
              "Counts page views without cookies or storage. See the privacy policy for what it records.",
              "Not applicable",
            ],
            [
              services.video.name,
              "Cookies and similar storage set by Google",
              <>
                Only inside a video player, and only after you press play. Google lists them in its{" "}
                <A href={services.video.cookies}>cookie policy</A>.
              </>,
              "Set by Google",
            ],
          ]}
        />
      </Part>

      <Part title="Changes">
        <p>
          If this site ever stores something optional, such as an analytics cookie, it will ask first, with equal
          choices to accept or reject, and this table will list it. Questions go to{" "}
          <A href={`mailto:${operator.email}`}>{operator.email}</A>. More about what is collected is in the{" "}
          <A href="/privacy">privacy policy</A>.
        </p>
      </Part>
    </PolicyPage>
  );
}
