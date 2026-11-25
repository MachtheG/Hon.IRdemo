import type { Metadata } from "next";
import Link from "next/link";
import { RETENTION_UNTIL, candidate, contact } from "@/config/site";
import { getDict } from "@/lib/i18n";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "Privacy notice", description: "How the Isaac Ruto 2027 campaign handles your personal data under the Kenya Data Protection Act, 2019." };

const BUILD_DATE = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Nairobi" });

export default async function Privacy({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  return (
    <>
      <PageHero kicker={t.footer.privacy} title="Your data, plainly" intro={<p>How we handle the details you give us, under the Kenya Data Protection Act, 2019.</p>}>
        <p className="mt-6 text-sm text-muted">{t.common.lastUpdated}: <time>{BUILD_DATE}</time></p>
      </PageHero>
      <div className="container-site py-14 md:py-20">
        <div className="prose-site max-w-3xl text-[17px]">
          <h2>1. Who is responsible</h2>
          <p>The {candidate.short} 2027 campaign is the data controller. That means we decide how your data is used, and we are answerable for it.</p>
          {/* CONFIRM data-controller name, email, phone and postal address with the campaign */}
          <p>
            Contact:{" "}
            {contact.email ? <a href={`mailto:${contact.email}`}>{contact.email}</a> : <em>contact details to be confirmed by the campaign</em>}
            {contact.phone ? ` · ${contact.phone}` : ""}
            {contact.postal ? ` · ${contact.postal}` : ""}.
          </p>

          <h2>2. What we collect</h2>
          <p>Only what you type into our forms:</p>
          <ul>
            <li>your name, phone number and ward;</li>
            <li>if you choose: your email, how you would like to help, and a message.</li>
          </ul>
          <p>We do not ask for ID numbers. We do not buy, rent or receive voter lists.</p>

          <h2>3. Why we use it</h2>
          <ul>
            <li>To count pledges by ward.</li>
            <li>To organise volunteers.</li>
            <li>To reply to your messages.</li>
            <li>To send SMS or WhatsApp updates — only if you tick the box to receive them.</li>
          </ul>

          <h2>4. Our lawful basis</h2>
          <p>We rely on your consent (sections 30 and 32 of the Act). A political pledge reveals your political opinion, so we treat it as sensitive personal data and take extra care with it.</p>
          <p>You can withdraw your consent at any time. Tell us and we will stop using your data and delete it.</p>

          <h2>5. Who we share it with</h2>
          <p>Nobody outside the campaign, except service providers who help us run this website and send messages. They work under written agreements and may only use your data on our instructions.</p>
          <p>We never sell or rent your data.</p>
          <p>Some providers (such as website hosting) may store data outside Kenya. When that happens we use the safeguards required by sections 48 to 50 of the Act.</p>

          <h2>6. How long we keep it</h2>
          <p>Until {RETENTION_UNTIL}. Then we delete it, unless the law requires us to keep it longer.</p>

          <h2>7. Your rights</h2>
          <p>Under section 26 of the Act you have the right to:</p>
          <ul>
            <li>be informed about how your data is used;</li>
            <li>access the data we hold about you;</li>
            <li>object to its use;</li>
            <li>have it corrected if it is wrong;</li>
            <li>have it deleted.</li>
          </ul>
          <p>To use any of these rights, contact us using the details in section 1.</p>

          <h2>8. Complaints</h2>
          <p>
            If you are not happy with how we handle your data, you can complain to the Office of the Data Protection Commissioner (ODPC):{" "}
            <a href="https://www.odpc.go.ke" target="_blank" rel="noopener noreferrer">odpc.go.ke</a>.
          </p>

          <h2>9. Cookies and tracking</h2>
          <p>We use no advertising or tracking cookies. The only setting we store is “lite mode”, and it is kept in your own browser, not sent to us.</p>

          <h2>10. Children</h2>
          <p>Our forms are for people aged 18 and over.</p>
        </div>
        <p className="mt-12 text-sm text-muted">
          See also: <Link prefetch={false} href={`/${locale}/sources`} className="underline">Sources</Link> · <Link prefetch={false} href={`/${locale}/credits`} className="underline">Credits</Link>
        </p>
      </div>
    </>
  );
}
