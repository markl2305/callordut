import Link from "next/link";
import { siteConfig } from "../../config/site";

export const metadata = {
  title: "End-User License Agreement | CalLord Unified Technologies",
  description:
    "The end-user license agreement (EULA) governing use of CalLord Unified Technologies software, including its QuickBooks Online integration.",
};

export default function EulaPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <main className="mx-auto max-w-4xl px-4 pb-16 pt-10 lg:px-0">
        <div className="bg-cream border border-rule p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-teal">Legal</p>
          <h1 className="mt-3 font-serif text-3xl font-normal tracking-tight text-ink lg:text-4xl">
            End-User License Agreement
          </h1>
          <p className="mt-3 text-sm text-ink-soft">
            {siteConfig.legalName}. Last updated: June 30, 2026.
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            Questions? Contact{" "}
            <a href={`mailto:${siteConfig.email}`} className="font-medium text-teal">
              {siteConfig.email}
            </a>
            .
          </p>

          <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink-soft">
            <section>
              <p>
                This End-User License Agreement (&ldquo;Agreement&rdquo;) is a legal
                agreement between you and {siteConfig.legalName}
                (&ldquo;{siteConfig.shortName},&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo;
                or &ldquo;our&rdquo;) governing your access to and use of our software,
                web applications, dashboards, and related services (collectively, the
                &ldquo;Software&rdquo;). By accessing or using the Software, or by
                connecting a third-party account such as QuickBooks Online, you agree to
                be bound by this Agreement. If you do not agree, do not use the Software.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-normal text-ink">1. License Grant</h2>
              <p>
                Subject to your compliance with this Agreement, we grant you a limited,
                non-exclusive, non-transferable, revocable license to access and use the
                Software for your internal business purposes. We reserve all rights not
                expressly granted to you.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-normal text-ink">2. Accounts &amp; Authorization</h2>
              <p>
                You are responsible for maintaining the confidentiality of your account
                credentials and for all activity that occurs under your account. You
                represent that you are authorized to connect any third-party accounts you
                link to the Software and to grant us access to the associated data.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-normal text-ink">3. Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Use the Software in violation of any applicable law or regulation;</li>
                <li>Reverse engineer, decompile, or attempt to derive the source code of the Software, except as permitted by law;</li>
                <li>Resell, sublicense, or provide the Software to third parties except as expressly authorized;</li>
                <li>Interfere with, disrupt, or attempt to gain unauthorized access to the Software or its infrastructure;</li>
                <li>Upload or transmit malicious code, or use the Software to store or transmit unlawful content.</li>
              </ul>
            </section>

            <section className="border border-teal/40 bg-teal/10 p-5">
              <h2 className="font-serif text-xl font-normal text-ink">
                4. Third-Party Services &amp; QuickBooks Online
              </h2>
              <p className="mt-2">
                The Software integrates with third-party services, including
                <strong> Intuit QuickBooks Online</strong>. When you connect QuickBooks
                Online through Intuit&rsquo;s authorized OAuth&nbsp;2.0 connection, you
                authorize us to access and process data from the QuickBooks company you
                select (such as invoices, customers, payments, and accounts-receivable
                balances) solely to provide the Software&rsquo;s financial and
                accounts-receivable reporting features.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  Your use of QuickBooks Online remains subject to Intuit&rsquo;s own terms
                  and privacy policy. Intuit&reg; and QuickBooks&reg; are trademarks of
                  Intuit&nbsp;Inc.; we are not affiliated with or endorsed by Intuit.
                </li>
                <li>
                  You may disconnect QuickBooks Online at any time from within the Software
                  or from QuickBooks (Apps &rarr; Connected apps). We are not responsible
                  for the availability, accuracy, or content of third-party services.
                </li>
                <li>
                  How we handle QuickBooks data is described in our{" "}
                  <Link href="/privacy" className="font-medium text-teal">Privacy Policy</Link>.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-normal text-ink">5. Data &amp; Privacy</h2>
              <p>
                Our collection and use of information, including data accessed from
                connected services such as QuickBooks Online, is governed by our{" "}
                <Link href="/privacy" className="font-medium text-teal">Privacy Policy</Link>,
                which is incorporated into this Agreement by reference. We do not sell your
                data and use connected-service data only to provide the Software.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-normal text-ink">6. Intellectual Property</h2>
              <p>
                The Software, including all associated content, trademarks, and
                intellectual property, is owned by {siteConfig.shortName} or its licensors
                and is protected by applicable laws. This Agreement does not transfer any
                ownership rights to you.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-normal text-ink">7. Disclaimer of Warranties</h2>
              <p>
                The Software is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
                without warranties of any kind, whether express or implied, including
                implied warranties of merchantability, fitness for a particular purpose,
                and non-infringement. We do not warrant that the Software will be
                uninterrupted, error-free, or that data displayed from third-party services
                will be complete or accurate.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-normal text-ink">8. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, {siteConfig.shortName} will not be
                liable for any indirect, incidental, special, consequential, or punitive
                damages, or any loss of profits or revenues, whether incurred directly or
                indirectly, arising from your use of the Software. Our total liability for
                any claim arising out of or relating to the Software will not exceed the
                amount you paid us, if any, for the Software in the twelve months preceding
                the claim.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-normal text-ink">9. Term &amp; Termination</h2>
              <p>
                This Agreement remains in effect while you use the Software. We may suspend
                or terminate your access at any time if you violate this Agreement or if we
                discontinue the Software. Upon termination, your license ends and, where
                applicable, we will delete or return connected-service data as described in
                our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-normal text-ink">10. Governing Law</h2>
              <p>
                This Agreement is governed by the laws of the State of New Mexico, United
                States, without regard to its conflict-of-laws principles. Any disputes
                will be resolved in the state or federal courts located in New Mexico.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-normal text-ink">11. Changes to This Agreement</h2>
              <p>
                We may update this Agreement from time to time. Material changes will be
                posted on this page with a new &ldquo;Last updated&rdquo; date. Your
                continued use of the Software after changes take effect constitutes
                acceptance of the revised Agreement.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-normal text-ink">12. Contact</h2>
              <p>Questions about this Agreement can be directed to:</p>
              <div className="mt-3 border border-rule bg-paper p-5">
                <p className="font-medium text-ink">{siteConfig.legalName}</p>
                <p className="mt-2">
                  Email:{" "}
                  <a href={`mailto:${siteConfig.email}`} className="font-medium text-teal">
                    {siteConfig.email}
                  </a>
                </p>
                <p>
                  Phone:{" "}
                  <a href={siteConfig.phoneHref} className="font-medium text-teal">
                    {siteConfig.phone}
                  </a>
                </p>
                <p className="mt-2">Albuquerque, New Mexico</p>
              </div>
            </section>

            <div className="mt-8 border-t border-rule pt-6">
              <p className="text-xs text-ink-faint">
                By accessing or using the Software, you acknowledge that you have read,
                understood, and agree to be bound by this End-User License Agreement.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
