import Link from "next/link";

export const metadata = {
  title: "Thank You | CalLord Unified Technologies",
  description: "We received your message and will reply within one business day.",
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-slate via-[#0f1d32] to-[#0b1220] text-foreground">
      <main className="mx-auto max-w-3xl px-4 pb-20 pt-24 text-center lg:pt-28">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-10 shadow-xl shadow-black/40">
          <h1 className="text-3xl font-semibold lg:text-4xl">Thanks for reaching out.</h1>
          <p className="mt-3 text-lg text-slate-200">
            We received your note and will reply within one business day with next steps.
          </p>
          <div className="mt-6 space-y-2 text-sm text-slate-200">
            <p>
            If you need to talk sooner, call us at <a className="font-semibold text-brand-teal" href="tel:+15052075211">(505) 207-5211</a> or email
              <a className="font-semibold text-brand-teal" href="mailto:mark@mail.callordut.com"> mark@mail.callordut.com</a>.
            </p>
            <p>In the meantime, explore our services or room templates:</p>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/services" className="rounded-full bg-brand-teal px-5 py-3 text-sm font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90">
              View services
            </Link>
            <Link href="/room-types" className="rounded-full border border-brand-teal/70 px-5 py-3 text-sm font-semibold text-brand-teal transition hover:-translate-y-0.5 hover:bg-brand-teal/10 hover:text-brand-slate">
              See room types
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
