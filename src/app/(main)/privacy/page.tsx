import PolicyPage, { A, Bullets, Part } from "@/components/PolicyPage";
import { metaFor } from "@/lib/pageMeta";
import { operator, services } from "@/lib/site";

export const metadata = metaFor("/privacy");

export default function Page() {
  const mail = `mailto:${operator.email}`;

  return (
    <PolicyPage
      title="Privacy Policy"
      intro={
        <>
          This is my personal portfolio. It has no accounts, no forms and no advertising, and it sets no cookies of its
          own. This page lists the little that is collected when you visit, who handles it and how to ask me about it.
        </>
      }
    >
      <Part title="Who runs this site">
        <p>
          I do: {operator.name}, an individual based in {operator.region}. I am responsible for the personal data
          described here. You can reach me at <A href={mail}>{operator.email}</A> about anything on this page.
        </p>
      </Part>

      <Part title="What is collected and why">
        <Bullets
          items={[
            <>
              <strong className="text-white">Server requests.</strong>{" "}
              The site is hosted by{" "}
              <A href={services.hosting.policy}>{services.hosting.name}</A>. To deliver each page, Vercel receives your
              IP address, your browser&apos;s user agent, the address you asked for, the time and the page that linked
              you here, and keeps request logs for a limited time to run and protect the service. I use these only to
              fix problems with the site.
            </>,
            <>
              <strong className="text-white">Visit counts.</strong>{" "}
              The site uses{" "}
              <A href={services.analytics.docs}>{services.analytics.name}</A> to count page views. For each view it
              records the page, the referring page, your rough location (country, region and city, worked out from your
              IP address), your browser, operating system and device type. It sets no cookies and stores nothing in
              your browser. Vercel tells visits apart with a hash of the request that it discards after 24 hours, so a
              visit is never linked to you over time. I only see totals, such as how many people opened a project page.
              I use them to learn which pages people read.
            </>,
            <>
              <strong className="text-white">YouTube videos.</strong>{" "}
              Some project pages have videos. Nothing is loaded
              from YouTube until you press play: the thumbnails are fetched by this site&apos;s server, so your browser
              does not contact Google while you browse. When you press play, the player loads from
              youtube-nocookie.com, and from then on <A href={services.video.policy}>Google&apos;s privacy policy</A>{" "}
              applies. Google receives your IP address and may store cookies or similar data in the player.
            </>,
            <>
              <strong className="text-white">Email.</strong>{" "}
              If you email me, I receive your address and whatever you
              write, and use them only to reply.
            </>,
          ]}
        />
        <p>
          That is everything. There are no third-party trackers, the fonts are served from this site rather than
          Google Fonts, and nothing is sold or shared for advertising. Links to LinkedIn, GitHub, X, itch.io and
          similar sites take you to services with their own privacy policies.
        </p>
      </Part>

      <Part title="Legal basis">
        <p>
          Server requests and visit counts rely on my legitimate interest in running a working, secure site and
          knowing which pages are read. They are limited to what that needs. YouTube loads only because you choose to
          play a video. Emails rely on you having written to me.
        </p>
      </Part>

      <Part title="How long it is kept">
        <Bullets
          items={[
            "Server request logs: kept by Vercel for a limited time under its own policy, then deleted.",
            "Visit counts: kept as totals for as long as my Vercel plan keeps analytics. They cannot be traced back to you.",
            "Emails: kept while we are in touch, and deleted when you ask.",
          ]}
        />
      </Part>

      <Part title="Where it is processed">
        <p>
          Vercel and Google are based in the United States and process data there and in other countries. Both
          describe their safeguards for international transfers in the policies linked above.
        </p>
      </Part>

      <Part title="Your rights">
        <p>
          Wherever you live, you can ask me what data I hold about you, and ask me to correct or delete it. You can
          also object to its use. Depending on where you are, laws give you these rights formally, for example the GDPR
          in the EU and UK, India&apos;s Digital Personal Data Protection Act and US state privacy laws.
        </p>
        <p>
          In practice the only data I can link to you is email you have sent me, which I will delete on request.
          Visit counts are anonymous, so there is nothing to look up or delete. You can stop them being sent with any
          content blocker. To stop YouTube&apos;s data collection, don&apos;t press play.
        </p>
      </Part>

      <Part title="Children">
        <p>
          This site is not aimed at children and collects nothing that identifies anyone. If a child has emailed me
          and a parent or guardian wants that email deleted, write to me and I will delete it.
        </p>
      </Part>

      <Part title="Questions and complaints">
        <p>
          Write to <A href={mail}>{operator.email}</A> with any question or grievance about your data. I aim to reply
          within 30 days. If you are not satisfied, you can complain to the data protection authority where you live,
          such as your EU or UK supervisory authority or the Data Protection Board of India.
        </p>
        <p>
          If this policy changes, the date at the top changes with it. Browser storage is covered in more detail on
          the <A href="/cookies">cookie policy</A>.
        </p>
      </Part>
    </PolicyPage>
  );
}
