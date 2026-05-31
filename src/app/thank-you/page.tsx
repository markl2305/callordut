import Link from "next/link";

export const metadata = {
  title: "Thank You | CalLord Unified Technologies",
  description: "We received your message and will reply within one business day.",
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <main className="mx-auto max-w-3xl px-4 pb-20 pt-24 text-center lg:pt-28">
        <div className="bg-cream border border-rule p-10">
          <h1 className="font-serif text-3xl font-normal tracking-tight text-ink lg:text-4xl">Thanks for reaching out.</h1>
          <p className="mt-3 text-lg text-ink-soft">
            We received your note and will reply within one business day with next steps.
          </p>
          <div className="mt-6 space-y-2 text-sm text-ink-soft">
            <p>
            If you need to talk sooner, call us at <a className="font-medium text-teal" href="tel:+18666572383">(866) 657-2383</a> or email
              <a className="font-medium text-teal" href="mailto:sales@callordut.com"> sales@callordut.com</a>.
            </p>
            <p>In the meantime, explore our services or room templates:</p>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/services" className="h-btn bg-teal px-5 py-3.5 text-sm font-medium text-on-teal">
              View services
            </Link>
            <Link href="/room-types" className="h-btn border border-ink px-5 py-3.5 text-sm font-medium text-ink bg-transparent">
              See room types
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
