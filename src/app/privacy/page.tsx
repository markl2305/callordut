import Link from "next/link";
import { siteConfig } from "../../config/site";

export const metadata = {
  title: "Privacy Policy | CalLord Unified Technologies",
  description:
    "How CalLord Unified Technologies handles contact form submissions, project details, SMS opt-in data, and analytics data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-slate via-[#0f1d32] to-[#0b1220] text-foreground">
      <main className="mx-auto max-w-4xl px-4 pb-16 pt-10 lg:px-0">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-xl shadow-black/40">
          <h1 className="text-3xl font-semibold lg:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-slate-200">
            Updated for {siteConfig.legalName}. Last updated: March 18, 2026.
          </p>
          <p className="mt-1 text-sm text-slate-200">
            If you have questions, contact{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-semibold text-brand-teal"
            >
              {siteConfig.email}
            </a>
            .
          </p>

          <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-200">
            <section>
              <h2 className="text-lg font-semibold text-slate-50">
                What We Collect
              </h2>
              <p>
                We collect information you submit through our contact forms,
                including name, email, phone number, company, room details, and
                any message you provide. We may also receive basic analytics
                data from our website traffic tools.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-50">
                How We Use Your Info
              </h2>
              <p>
                We use your information solely to respond to inquiries, scope
                projects, and deliver services. We do not sell or rent your
                information. Relevant details may be shared with trusted vendors
                or subcontractors only when necessary to fulfill project work.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-50">
                Information Sharing and Disclosure
              </h2>
              <p className="font-semibold text-slate-100">
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
                  conducting our business (e.g., email service providers,
                  telecommunications providers, analytics tools). These
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

            <section className="rounded-2xl border border-brand-teal/30 bg-brand-teal/10 p-5">
              <h2 className="text-lg font-semibold text-slate-50">
                SMS/Text Messaging Consent and Data
              </h2>
              <p className="mt-2">
                When you submit a form on callordut.com and provide your phone
                number, or when you verbally consent during a phone call or
                in-person meeting, you agree that CalLord Unified Technologies
                may contact you via SMS text messages for service updates,
                project coordination, scheduling, and follow-ups related to your
                inquiry or project.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  <strong>Opt-in:</strong> You opt in by providing your phone
                  number and submitting a form on our website at{" "}
                  <Link
                    href="/contact"
                    className="font-semibold text-brand-teal"
                  >
                    callordut.com/contact
                  </Link>
                  , by verbally agreeing during a phone call or meeting, or by
                  texting a keyword to our business number.
                </li>
                <li>
                  <strong>Opt-out:</strong> You can reply STOP to any message to
                  stop receiving SMS communications at any time. Reply HELP for
                  help.
                </li>
                <li>
                  <strong>Frequency:</strong> Message frequency varies based on
                  your interactions (typically 1–10 messages per month). We do
                  not send unsolicited marketing blasts.
                </li>
                <li>
                  <strong>Rates:</strong> Message and data rates may apply
                  depending on your carrier and plan.
                </li>
                <li>
                  <strong>Consent not required:</strong> Consent to receive SMS
                  messages is not required as a condition of purchasing any goods
                  or services.
                </li>
              </ul>
              <p className="mt-4 font-semibold text-slate-100">
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
                  className="font-semibold text-brand-teal"
                >
                  SMS Messaging Terms
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-50">
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
              <h2 className="text-lg font-semibold text-slate-50">
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
              <h2 className="text-lg font-semibold text-slate-50">
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
                  className="font-semibold text-brand-teal"
                >
                  {siteConfig.email}
                </a>
                . We will honor reasonable requests promptly.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-50">
                Cookies and Analytics
              </h2>
              <p>
                We use Google Analytics to analyze website traffic and may use
                Google Ads to display advertisements. These services may collect
                information about your online activities. You can opt out of
                Google Analytics by installing the Google Analytics Opt-out
                Browser Add-on.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-50">
                Children&apos;s Privacy
              </h2>
              <p>
                Our services are not directed to individuals under the age of
                18. We do not knowingly collect personal information from
                children.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-50">
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
              <h2 className="text-lg font-semibold text-slate-50">
                Contact Us
              </h2>
              <p>
                If you have questions or concerns about this Privacy Policy or
                our privacy practices, contact us:
              </p>
              <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="font-semibold text-slate-50">
                  {siteConfig.shortName}
                </p>
                <p className="mt-2">
                  Email:{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="font-semibold text-brand-teal"
                  >
                    {siteConfig.email}
                  </a>
                </p>
                <p>
                  Phone:{" "}
                  <a
                    href={siteConfig.phoneHref}
                    className="font-semibold text-brand-teal"
                  >
                    {siteConfig.phone}
                  </a>
                </p>
                <p className="mt-2">Albuquerque, New Mexico</p>
              </div>
            </section>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-xs text-slate-400">
                By using our website and services, you acknowledge that you have
                read and understood this Privacy Policy and agree to its terms.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
