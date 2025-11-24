import Link from "next/link";
import Image from "next/image";
import { coreRoomTypes } from "../data/roomTypes";

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
    <div className="min-h-screen bg-gradient-to-b from-brand-slate via-[#0f1d32] to-[#0b1220] text-foreground">
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-10 lg:px-6">
        <section className="rounded-3xl border border-white/5 bg-gradient-to-br from-brand-slate via-[#112033] to-[#0b1220] px-6 py-14 shadow-[0_35px_100px_-60px_rgba(0,0,0,0.8)] lg:px-12 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-teal">Room recipes</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Room types we build again and again.
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted lg:text-xl">
            Each template captures the AV, smart-room, and security details needed to go from sketch to first call—then scale across other sites.
          </p>
        </section>

        <section className="mt-16 space-y-8 lg:mt-24">
          <div className="grid gap-4 md:grid-cols-2">
            {coreRoomTypes.map((room) => (
              <Link
                key={room.slug}
                href={`/room-types/${room.slug}`}
                className="group block rounded-2xl border border-slate-600/60 bg-slate-900/70 p-5 text-slate-100 shadow-md shadow-black/40 transition hover:-translate-y-1 hover:border-brand-teal/50"
              >
                <div className="mb-3 flex items-center gap-3">
                  <Image
                    src={(roomImages[room.slug] ?? roomImages.default).src}
                    alt={(roomImages[room.slug] ?? roomImages.default).alt}
                    width={96}
                    height={96}
                    className="h-20 w-20 rounded-2xl border border-brand-teal/30 bg-slate-950/60 object-contain"
                  />
                  <span className="rounded-full bg-brand-sand/70 px-3 py-1 text-xs font-semibold text-brand-slate">
                    {room.capacity}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{room.name}</h3>
                    <p className="text-sm text-slate-200">{room.summary}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-brand-teal">
                  {room.idealUseCases.slice(0, 3).map((useCase) => (
                    <span key={useCase} className="rounded-full border border-brand-teal/50 px-3 py-1">
                      {useCase}
                    </span>
                  ))}
                </div>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-brand-teal transition group-hover:text-brand-teal/80">
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
