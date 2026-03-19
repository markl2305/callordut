import Link from "next/link";
import { siteConfig } from "../../config/site";

export const metadata = {
  title: "SMS Messaging Terms | CalLord Unified Technologies",
  description:
    "SMS messaging terms, opt-in consent, and mobile messaging program details for CalLord Unified Technologies.",
};

export default function SmsTermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-slate via-[#0f1d32] to-[#0b1220] text-foreground">
      <main className="mx-auto max-w-4xl px-4 pb-16 pt-10 lg:px-0">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-xl shadow-black/40">
          <h1 className="text-3xl font-semibold lg:text-4xl">
            SMS Messaging Terms
          </h1>
          <p className="mt-3 text-sm text-slate-200">
            CalLord Unified Technologies — Mobile Messaging Program
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Last updated: March 18, 2026
          </p>

          <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-200">
            <section>
              <h2 className="text-lg font-semibold text-slate-50">
                Program Description
              </h2>
              <p>
                CalLord Unified Technologies (&ldquo;we,&rdquo;
                &ldquo;us,&rdquo; or &ldquo;our&rdquo;) offers an SMS
                messaging program to communicate with customers and prospective
                clients regarding service inquiries, project updates,
                appointment confirmations, scheduling coordination, follow-ups,
                and customer support. By opting in to our messaging program, you
                agree to the terms outlined below.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-50">
                How to Opt In
              </h2>
              <p>
                You may opt in to receive SMS messages from CalLord Unified
                Technologies by any of the following methods:
              </p>
              <ul className="mt-2 list-disc space-y-2 pl-6">
                <li>
                  <strong>Web Form Submission:</strong> By entering your mobile
                  phone number on any form on our website (callordut.com),
                  including our contact form at{" "}
                  <Link
                    href="/contact"
                    className="font-semibold text-brand-teal"
                  >
                    callordut.com/contact
                  </Link>
                  . The form displays SMS consent language near the submit
                  button.
                </li>
                <li>
                  <strong>Verbal Consent:</strong> By verbally providing your
                  phone number and agreeing to receive text messages during a
                  phone call or in-person meeting with a CalLord Unified
                  Technologies representative. Our representatives inform you
                  that message frequency varies, message and data rates may
                  apply, you can reply STOP to opt out and HELP for assistance,
                  and direct you to our privacy policy at callordut.com/privacy.
                </li>
                <li>
                  <strong>Text-In:</strong> By texting a keyword (e.g.,
                  &ldquo;START&rdquo; or &ldquo;INFO&rdquo;) to our business
                  number. You will receive a confirmation message with program
                  details.
                </li>
              </ul>
              <p className="mt-3">
                By opting in, you confirm that you are the owner or authorized
                user of the mobile phone number provided, and you consent to
                receive text messages from CalLord Unified Technologies at that
                number.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-50">
                Types of Messages
              </h2>
              <p>Messages you may receive include:</p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Responses to your inquiries and service requests</li>
                <li>Appointment and meeting confirmations or reminders</li>
                <li>Project status updates and milestones</li>
                <li>
                  Follow-up messages related to proposals or consultations
                </li>
                <li>Scheduling coordination</li>
                <li>Customer support communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-50">
                Message Frequency
              </h2>
              <p>
                Message frequency varies based on your interactions with CalLord
                Unified Technologies. You will only receive messages that are
                relevant to your inquiry or ongoing project. Typical frequency
                ranges from 1 to 10 messages per month depending on your level
                of engagement with our team. You will not receive unsolicited
                marketing blasts.
              </p>
            </section>

            <section className="rounded-2xl border border-brand-teal/30 bg-brand-teal/10 p-5">
              <h2 className="text-lg font-semibold text-slate-50">
                Message and Data Rates
              </h2>
              <p className="mt-1 font-semibold text-slate-100">
                Message and data rates may apply. Please contact your mobile
                carrier for details about your messaging plan and any charges
                that may apply to messages you send or receive.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-50">
                How to Opt Out (STOP)
              </h2>
              <p>
                You may opt out of receiving SMS messages at any time by
                replying <strong>STOP</strong> to any text message you receive
                from us. After you send STOP, you will receive a one-time
                confirmation message acknowledging your request. No further
                messages will be sent unless you re-opt in.
              </p>
              <p className="mt-3">
                You may also opt out by contacting us directly at{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-semibold text-brand-teal"
                >
                  {siteConfig.email}
                </a>{" "}
                or{" "}
                <a
                  href={siteConfig.phoneHref}
                  className="font-semibold text-brand-teal"
                >
                  {siteConfig.phone}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-50">
                How to Get Help (HELP)
              </h2>
              <p>
                If you need assistance with our messaging program, reply{" "}
                <strong>HELP</strong> to any text message you receive from us.
                You will receive a response with our contact information and
                instructions for opting out.
              </p>
              <p className="mt-3">You can also reach us at:</p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>
                  Email:{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="font-semibold text-brand-teal"
                  >
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  Phone:{" "}
                  <a
                    href={siteConfig.phoneHref}
                    className="font-semibold text-brand-teal"
                  >
                    {siteConfig.phone}
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-50">
                Consent Not Required for Purchase
              </h2>
              <p>
                Consent to receive SMS messages is <strong>not</strong> required
                as a condition of purchasing any goods or services from CalLord
                Unified Technologies. You may choose not to opt in and still do
                business with us.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-50">
                Privacy and Data Protection
              </h2>
              <p>
                We respect your privacy. Your mobile phone number and SMS opt-in
                consent data will{" "}
                <strong>
                  not be sold, rented, or shared with any third parties
                </strong>{" "}
                for their promotional or marketing purposes. We will not share
                your opt-in to an SMS campaign with any third party for purposes
                unrelated to providing you with the services of that campaign.
                We may share your information only with service providers who
                help us deliver messages (such as our telecommunications
                provider), and only to the extent necessary to send the messages
                you have consented to receive.
              </p>
              <p className="mt-3">
                For full details on how we collect, use, and protect your
                information, please see our{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-brand-teal"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-50">
                Supported Carriers
              </h2>
              <p>
                Our messaging program supports all major U.S. mobile carriers
                including AT&amp;T, T-Mobile, Verizon, and their subsidiaries.
                Carriers are not liable for delayed or undelivered messages.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-50">
                Contact Information
              </h2>
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
                <p className="mt-2">
                  <Link
                    href="/privacy"
                    className="font-semibold text-brand-teal"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </section>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-xs text-slate-400">
                Last updated: March 18, 2026. By opting in to receive SMS
                messages from CalLord Unified Technologies, you acknowledge that
                you have read and agree to these SMS Messaging Terms.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
