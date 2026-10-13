import Link from "next/link";
import { siteConfig } from "../../config/site";
import { SmsConsentRule } from "../components/SmsConsentRule";
import ConsentChoice from "../components/consent/ConsentChoice";

export const metadata = {
  title: "Privacy Policy | CalLord Unified Technologies",
  description:
    "How CalLord Unified Technologies handles contact form submissions, project details, SMS opt-in data, and analytics data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <main className="mx-auto max-w-4xl px-4 pb-16 pt-10 lg:px-0">
        <div className="bg-cream border border-rule p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-teal">Legal</p>
          <h1 className="mt-3 font-serif text-3xl font-normal tracking-tight text-ink lg:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-ink-soft">
            Updated for {siteConfig.legalName}. Last updated: October 12, 2026.
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            If you have questions, contact{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-medium text-teal"
            >
              {siteConfig.email}
            </a>
            .
          </p>

          <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink-soft">
            <section>
              <h2 className="font-serif text-xl font-normal text-ink">
                What We Collect
              </h2>
              <p>
                We collect information you submit through our contact forms,
                including name, email, phone number, company, room details, and
                any message you provide. Our hosting provider&rsquo;s servers log
                basic request data (IP address, browser, and the page requested)
                to deliver and secure the site. Analytics and advertising data
                reach Google only if you allow it; see{" "}
                <a href="#analytics" className="cl-notice-link">
                  Analytics, Advertising and Cookies
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-normal text-ink">
                How We Use Your Info
              </h2>
              <p>
                We use the information you submit to us, such as through our
                contact forms, only to respond to inquiries, scope projects, and
                deliver services. We do not sell or rent it. Relevant details may
                be shared with trusted vendors or subcontractors only when needed
                to fulfill project work. Analytics and advertising data are
                separate: they are collected only if you allow it, as described
                in Analytics, Advertising and Cookies below.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-normal text-ink">
                Information Sharing and Disclosure
              </h2>
              <p className="font-medium text-ink">
                We do not sell, rent, or trade your personal information to
                third parties for promotional or marketing purposes.
              </p>
              <p className="mt-3">
                We may share your information only in the following
                circumstances:
              </p>
              <ul className="mt-2 list-disc space-y-2 pl-6">
                <li>
                  <strong>Service Providers:</strong> With trusted third-party
                  service providers who assist us in operating our website and
                  conducting our business (our hosting provider, email
                  delivery, and telecommunications providers, and, only if you
                  allow it, Google Analytics and Google Ads). These
                  providers are contractually obligated to protect your
                  information.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law,
                  subpoena, or legal process, or to protect our rights,
                  property, or safety.
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a
                  merger, acquisition, or sale of all or a portion of our
                  business.
                </li>
                <li>
                  <strong>With Your Consent:</strong> When you explicitly
                  authorize us to share your information.
                </li>
              </ul>
            </section>

            <section className="border border-teal/40 bg-teal/10 p-5">
              <h2 className="font-serif text-xl font-normal text-ink">
                SMS/Text Messaging Consent and Data
              </h2>
              <SmsConsentRule className="mt-2 font-medium text-ink" />
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  <strong>Where to opt in:</strong> the SMS box is on our
                  contact form at{" "}
                  <Link
                    href="/contact"
                    className="font-medium text-teal"
                  >
                    callordut.com/contact
                  </Link>
                  .
                </li>
                <li>
                  <strong>What you can receive:</strong> service messages about
                  your request or project, such as appointment, scheduling, and
                  job updates. We do not send marketing text messages.
                </li>
                <li>
                  <strong>What we keep:</strong> for each form submission we
                  keep a consent record: whether the box was checked, the exact
                  consent wording and its version, your number, the time, the
                  seller (CalLord Unified Technologies LLC), the purpose, and
                  the IP address and browser that sent the form.
                </li>
                <li>
                  <strong>Opt-out:</strong> You can reply STOP to any message to
                  stop receiving SMS communications at any time. Reply HELP for
                  help.
                </li>
                <li>
                  <strong>Frequency:</strong> Message frequency varies based on
                  your interactions (typically 1–10 messages per month).
                </li>
                <li>
                  <strong>Rates:</strong> Message and data rates may apply
                  depending on your carrier and plan.
                </li>
                <li>
                  <strong>Consent not required:</strong> Consent to receive SMS
                  messages is not required to request a quote or to purchase any
                  goods or services.
                </li>
              </ul>
              <p className="mt-4 font-medium text-ink">
                We will not share your opt-in to an SMS campaign with any third
                party for purposes unrelated to providing you with the services
                of that campaign. We will not share or sell your personal data,
                including SMS opt-in data and consent, to any third parties for
                marketing purposes.
              </p>
              <p className="mt-3">
                For complete SMS messaging program details, see our{" "}
                <Link
                  href="/sms-terms"
                  className="font-medium text-teal"
                >
                  SMS Messaging Terms
                </Link>
                .
              </p>
            </section>

            <section className="border border-teal/40 bg-teal/10 p-5">
              <h2 className="font-serif text-xl font-normal text-ink">
                QuickBooks Online Integration
              </h2>
              <p className="mt-2">
                Our software can connect to Intuit QuickBooks Online at your direction,
                through Intuit&rsquo;s authorized OAuth&nbsp;2.0 connection. When you connect a
                QuickBooks company, you authorize us to access and process data from that
                company to power financial and accounts-receivable reporting.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  <strong>What we access:</strong> invoice records (amounts, due dates,
                  balances, and status), customer records, and payment / accounts-receivable
                  data from the QuickBooks company you authorize.
                </li>
                <li>
                  <strong>How we use it:</strong> solely to display financial and
                  accounts-receivable reporting (outstanding AR, aging, invoice status)
                  within your business dashboard. We do not use QuickBooks data for
                  advertising, and we never sell it.
                </li>
                <li>
                  <strong>Sharing:</strong> we do not sell, rent, or share your QuickBooks
                  data with third parties, except infrastructure providers that host our
                  software under confidentiality obligations, or where required by law.
                </li>
                <li>
                  <strong>Storage &amp; security:</strong> QuickBooks data is stored in our
                  secured, access-controlled systems and encrypted in transit (HTTPS/TLS).
                  Access tokens are stored encrypted and are never exposed to end users.
                </li>
                <li>
                  <strong>Disconnection &amp; deletion:</strong> you can disconnect
                  QuickBooks at any time from the integration settings, or from within
                  QuickBooks (Apps &rarr; Connected apps). On disconnection or request, we
                  delete the QuickBooks data and access tokens we hold for your company.
                </li>
              </ul>
              <p className="mt-4">
                Intuit&reg; and QuickBooks&reg; are trademarks of Intuit&nbsp;Inc. Our access
                to and use of QuickBooks data is limited to the scopes you authorize and
                complies with the Intuit Developer terms. See also our{" "}
                <Link href="/eula" className="font-medium text-teal">
                  End-User License Agreement
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-normal text-ink">
                Storage and Security
              </h2>
              <p>
                Submitted information is stored in our business systems and
                email. We implement reasonable security measures including
                encryption of data in transit (HTTPS/SSL) and limited access to
                personal information by authorized personnel only. Access is
                limited to CalLord UT team members and trusted partners working
                on your project.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-normal text-ink">
                Data Retention
              </h2>
              <p>
                We retain your personal information only as long as necessary to
                fulfill the purposes outlined in this Privacy Policy, unless a
                longer retention period is required or permitted by law. When
                information is no longer needed, we securely delete or anonymize
                it.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-normal text-ink">
                Your Choices
              </h2>
              <p>You have the right to:</p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of marketing communications</li>
                <li>Opt out of SMS messages by replying STOP</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, contact us at{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-medium text-teal"
                >
                  {siteConfig.email}
                </a>
                . We will honor reasonable requests promptly.
              </p>
            </section>

            <section id="analytics">
              <h2 className="font-serif text-xl font-normal text-ink">
                Analytics, Advertising and Cookies
              </h2>
              <p>
                This site offers one choice, and it covers two Google services,
                both provided by Google LLC: Google Analytics and cookieless
                Google Ads measurement. Neither runs until you press
                &ldquo;Allow&rdquo;.
              </p>
              <ul className="mt-2 list-disc space-y-2 pl-6">
                <li>
                  <strong>Google Analytics</strong> tells us how the site is
                  used: pages viewed, how you arrived, approximate location,
                  device and browser.
                </li>
                <li>
                  <strong>Google Ads measurement</strong> tells us whether our
                  ads lead to visits and inquiries. Our Google Analytics tag is
                  linked to our Google Ads account, so allowing analytics also
                  lets Google Ads receive measurement signals from this site.
                  We tell Google not to store advertising cookies, not to use
                  your data for ad personalization or remarketing, and not to
                  use ad user data, so Google Ads sets no cookies here.
                  Google&rsquo;s tag is also set up so that, after you allow it,
                  it may read an email address, phone number or postal address
                  typed into one of our forms and send it to Google Ads in
                  hashed form to match an inquiry to an ad (Google calls this
                  enhanced conversions).
                </li>
              </ul>
              <p className="mt-3">
                Until you choose, and if you choose &ldquo;No thanks&rdquo;,
                neither service loads and nothing is sent to Google. With
                JavaScript off, nothing is sent either. Google uses what it
                receives under its own terms; see{" "}
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  className="cl-notice-link"
                >
                  how Google uses information from sites that use its services
                </a>
                .
              </p>
              <p className="mt-3">
                <strong>Cookies, only if you allow them:</strong>{" "}
                <code>_ga</code> and <code>_ga_</code> followed by our property
                id (Google Analytics). Google Ads sets none.
              </p>
              <p className="mt-3">
                <strong>Always set, not used for tracking:</strong> your choice
                is kept in two places on your browser. The{" "}
                <code>callord-consent</code> cookie and a copy with the same
                name in your browser&rsquo;s local storage are each honoured
                for 180 days from when you chose; after that you are asked
                again, and changing your choice below replaces both.{" "}
                <code>consent_gpc</code> is a cookie set for one day only when
                your browser sends a Global Privacy Control signal, and{" "}
                <code>cl-theme</code> keeps your light or dark choice in your
                browser.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-normal text-ink">
                Global Privacy Control
              </h2>
              <p>
                If your browser sends a Global Privacy Control signal, we treat
                it as &ldquo;No thanks&rdquo;: neither Google service
                loads, we do not ask, and the signal overrides an earlier
                &ldquo;Allow&rdquo;. We treat the signal as your request to opt
                out of the sale or sharing of your personal information,
                including sharing for targeted advertising.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-normal text-ink">
                Your Analytics Choice
              </h2>
              <p>
                You can change your choice here at any time. Withdrawing turns
                Google Analytics and Google Ads measurement off at once, removes
                the Google cookies and browser storage this site can remove, and
                reloads the page.
              </p>
              <ConsentChoice />
            </section>

            <section>
              <h2 className="font-serif text-xl font-normal text-ink">
                Children&apos;s Privacy
              </h2>
              <p>
                Our services are not directed to individuals under the age of
                18. We do not knowingly collect personal information from
                children.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-normal text-ink">
                Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time to reflect
                changes in our practices or for legal, regulatory, or
                operational reasons. We will notify you of any material changes
                by posting the updated policy on this page with a new
                &ldquo;Last updated&rdquo; date.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-normal text-ink">
                Contact Us
              </h2>
              <p>
                If you have questions or concerns about this Privacy Policy or
                our privacy practices, contact us:
              </p>
              <div className="mt-3 border border-rule bg-paper p-5">
                <p className="font-medium text-ink">
                  {siteConfig.shortName}
                </p>
                <p className="mt-2">
                  Email:{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="font-medium text-teal"
                  >
                    {siteConfig.email}
                  </a>
                </p>
                <p>
                  Phone:{" "}
                  <a
                    href={siteConfig.phoneHref}
                    className="font-medium text-teal"
                  >
                    {siteConfig.phone}
                  </a>
                </p>
                <p className="mt-2">Albuquerque, New Mexico</p>
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
