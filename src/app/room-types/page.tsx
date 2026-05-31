import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { coreRoomTypes } from "../data/roomTypes";

export const metadata: Metadata = {
  title: "Room Templates & Recipes | CalLord Unified Technologies",
  description:
    "Executive boardrooms, team meeting rooms, training spaces, telehealth rooms, and focus pods — room templates refined across real projects.",
};
const roomImages: Record<string, { src: string; alt: string }> = {
  "executive-boardroom": {
    src: "/room-executive-boardroom-topdown.png",
    alt: "Top-down layout of an executive boardroom",
  },
  "team-meeting-room": {
    src: "/room-team-meeting-topdown.png",
    alt: "Top-down layout of a team meeting room",
  },
  "training-all-hands": {
    src: "/room-training-allhands-topdown.png",
    alt: "Top-down layout of a training and all-hands space",
  },
  "virtual-visit-telehealth": {
    src: "/room-virtual-visit-topdown.png",
    alt: "Top-down layout of a virtual visit room",
  },
  "small-hybrid-focus-pod": {
    src: "/room-small-hybrid-focus-pod-topdown.png",
    alt: "Top-down layout of a small hybrid focus pod",
  },
  default: {
    src: "/room-generic-topdown.png",
    alt: "Top-down room layout",
  },
};

export default function RoomTypesHubPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-10 lg:px-6">
        <section className="border border-rule bg-cream px-6 py-14 lg:px-12 lg:py-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-teal">Room recipes</p>
          <h1 className="mt-4 font-serif text-4xl font-normal leading-tight text-ink sm:text-5xl lg:text-6xl">
            Room types we build again and again.
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-soft lg:text-xl">
            Each template captures the AV, smart-room, and security details needed to go from sketch to first call—then scale across other sites.
          </p>
        </section>

        <section className="mt-16 space-y-8 lg:mt-24">
          <div className="space-y-3">
            <h2 className="font-serif text-3xl font-normal text-ink lg:text-4xl">Room Types</h2>
            <p className="max-w-3xl text-lg leading-relaxed text-ink-soft">
              Proven configurations we build again and again. Start with a template, customize for your space, and skip the trial-and-error.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {coreRoomTypes.map((room) => (
              <Link
                key={room.slug}
                href={`/room-types/${room.slug}`}
                className="group h-hover-cream block border border-rule bg-cream p-5 text-ink"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="border border-rule bg-cream p-2">
                    <Image
                      src={(roomImages[room.slug] ?? roomImages.default).src}
                      alt={(roomImages[room.slug] ?? roomImages.default).alt}
                      width={96}
                      height={96}
                      className="h-16 w-16 object-contain"
                    />
                  </div>
                  <span className="border border-rule px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-teal">
                    {room.capacity}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-xl font-normal text-ink">{room.name}</h3>
                    <p className="text-sm text-ink-soft">{room.summary}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {room.idealUseCases.slice(0, 3).map((useCase) => (
                    <span key={useCase} className="border border-rule px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-teal">
                      {useCase}
                    </span>
                  ))}
                </div>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-teal">
                  View template →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
