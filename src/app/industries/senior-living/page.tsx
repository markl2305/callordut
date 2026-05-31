import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Senior Living AV & Security | Virtual Visit Rooms | CalLord",
  description:
    "AV and security systems for senior living communities. Virtual visit rooms, common-area displays, and camera coverage that keeps residents connected.",
};

export default function SeniorLivingPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <main className="mx-auto max-w-5xl px-4 pb-16 pt-16 lg:px-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-teal">Senior Living</p>
        <h1 className="mt-4 font-serif text-4xl font-normal leading-tight text-ink sm:text-5xl">AV &amp; Technology for Senior Living Communities</h1>
        <p className="mt-3 text-base text-ink-soft">
          Virtual visit rooms, common-area displays, and security systems that keep residents connected — without tech friction for staff or families.
        </p>
        <div className="mt-10 space-y-4 text-sm leading-relaxed text-ink-soft">
          <h2 className="font-serif text-2xl font-normal text-ink">Challenges We Solve</h2>
          <ul className="space-y-3">
            <li>
              <strong className="font-medium text-ink">Virtual Visit Frustration.</strong> Family members can’t hear or see their loved ones clearly. Staff waste time troubleshooting instead of caring for residents.
            </li>
            <li>
              <strong className="font-medium text-ink">Common Area Chaos.</strong> TVs in dining rooms and lounges are too quiet, too loud, or showing the wrong content. Residents complain. Staff juggle remotes.
            </li>
            <li>
              <strong className="font-medium text-ink">Security &amp; Safety Gaps.</strong> Camera coverage is inconsistent. Access points aren’t documented. When incidents happen, footage is missing or unusable.
            </li>
          </ul>
          <h2 className="font-serif text-2xl font-normal text-ink">How We Help</h2>
          <ul className="space-y-2">
            <li>Private Virtual Visit Rooms — acoustically treated, easy-to-use video calling spaces.</li>
            <li>Common Area AV — zoned audio, scheduled content, and simple controls for staff.</li>
            <li>Security Coverage — camera systems designed for compliance and incident documentation.</li>
            <li>Staff-Friendly Design — systems that don’t require an IT degree to operate.</li>
          </ul>
        </div>
        <div className="mt-8 grid gap-3 text-sm text-teal">
          <Link href="/smart-room-design" className="h-link font-medium underline-offset-2 hover:underline">
            Smart Room Design →
          </Link>
          <Link href="/av-integration" className="h-link font-medium underline-offset-2 hover:underline">
            AV Integration →
          </Link>
          <Link href="/room-types/virtual-visit-telehealth" className="h-link font-medium underline-offset-2 hover:underline">
            Virtual Visit / Telehealth Room →
          </Link>
        </div>
        <div className="mt-10">
          <h2 className="font-serif text-2xl font-normal text-ink">Let’s Design Spaces Your Residents and Families Deserve</h2>
          <Link
            href="/contact"
            className="h-btn mt-4 inline-flex items-center justify-center bg-teal px-6 py-3.5 text-sm font-medium text-on-teal"
          >
            Start a Conversation
          </Link>
        </div>
      </main>
    </div>
  );
}
