export const metadata = {
  title: "Privacy Policy | CalLord Unified Technologies",
  description:
    "How CalLord Unified Technologies handles contact form submissions, project details, and analytics data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-slate via-[#0f1d32] to-[#0b1220] text-foreground">
      <main className="mx-auto max-w-4xl px-4 pb-16 pt-10 lg:px-0">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-xl shadow-black/40">
          <h1 className="text-3xl font-semibold lg:text-4xl">Privacy Policy</h1>
          <p className="mt-3 text-sm text-slate-200">
            Updated for CalLord Unified Technologies LLC. If you have questions, contact <a href="mailto:sales@callordut.com" className="font-semibold text-brand-teal">sales@callordut.com</a>.
          </p>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-200">
            <section>
              <h2 className="text-lg font-semibold text-slate-50">What we collect</h2>
              <p>We collect information you submit through our contact forms, including name, email, phone, company, room details, and any message you provide. We may also receive basic analytics data from our website traffic tools.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-slate-50">How we use it</h2>
              <p>We use your information solely to respond to inquiries, scope projects, and deliver services. We do not sell or rent your information. Relevant details may be shared with security vendors or subcontractors only when necessary to fulfill project work.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-slate-50">Storage and security</h2>
              <p>Submitted information is stored in our business systems and email. Access is limited to CalLord UT team members and trusted partners working on your project.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-slate-50">Your choices</h2>
              <p>You can request access, correction, or deletion of your data by emailing <a href="mailto:sales@callordut.com" className="font-semibold text-brand-teal">sales@callordut.com</a>. We will honor reasonable requests promptly.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-slate-50">Questions</h2>
              <p>For any privacy concerns, contact us at <a href="mailto:sales@callordut.com" className="font-semibold text-brand-teal">sales@callordut.com</a>.</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
