import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import type { RoomTypeDefinition } from "../data/roomTypes";
import { getRoomTypeBySlug, coreRoomTypes } from "../data/roomTypes";
import { siteConfig } from "../../config/site";

const serviceLinkMap: Record<string, string> = {
  "AV Integration & Systems": "/av-integration",
  "Smart Room Design & Documentation": "/smart-room-design",
  "Remote Project Management": "/services/project-management",
};

interface RoomTypeTemplateProps {
  room: RoomTypeDefinition;
}

export function RoomTypeTemplate({ room }: RoomTypeTemplateProps) {
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
  const selectedImage = roomImages[room.slug] ?? roomImages.default;

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-slate via-[#0f1d32] to-[#0b1220] text-foreground">
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-10 lg:px-0">
        <section className="rounded-3xl border border-white/5 bg-gradient-to-br from-brand-slate via-[#10223a] to-[#0b1220] px-6 py-14 shadow-[0_30px_90px_-50px_rgba(0,0,0,0.9)] lg:px-12 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-teal">Room template</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">{room.name}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted lg:text-xl">{room.summary}</p>
          <ul className="mt-6 space-y-2 text-sm text-muted">
            {room.heroHighlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-teal" aria-hidden />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-brand-teal px-6 py-3 text-base font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90 hover:shadow-[0_25px_60px_-40px_rgba(39,154,146,0.9)]"
            >
              Plan this room
            </Link>
            <Link
              href="/room-types"
              className="rounded-full border border-brand-teal/70 px-6 py-3 text-base font-semibold text-brand-teal transition hover:-translate-y-0.5 hover:bg-brand-teal/10 hover:text-brand-slate"
            >
              Explore all room types
            </Link>
          </div>
        </section>

        <section className="mt-16 space-y-6 lg:mt-24">
          <h2 className="text-2xl font-semibold">Best for</h2>
          <div className="flex flex-wrap gap-2">
            {room.idealUseCases.map((useCase) => (
              <span key={useCase} className="rounded-full border border-brand-teal/50 px-4 py-2 text-sm font-semibold text-brand-teal">
                {useCase}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="rounded-3xl border border-slate-600/60 bg-slate-900/70 p-6 text-slate-100 shadow-md shadow-black/40">
            <div className="mb-4 flex items-center gap-4">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={140}
                height={140}
                className="h-28 w-28 rounded-2xl border border-brand-teal/30 bg-slate-950/60 object-contain"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">Layout</p>
                <p className="text-sm text-slate-200">Top-down reference for this room type</p>
              </div>
            </div>
            <h2 className="text-2xl font-semibold">Core design pattern</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-200">
              {room.description}
              <br />
              <span className="text-brand-sand/90">Capacity: {room.capacity}</span>
            </p>
          </div>
          <div className="rounded-3xl border border-brand-sand/60 bg-brand-sand/30 p-6 text-brand-slate shadow-[0_20px_60px_-50px_rgba(242,232,220,0.8)]">
            <h3 className="text-lg font-semibold">Core AV features</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {room.coreFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-teal" aria-hidden />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs font-semibold text-slate-600">Capacity: {room.capacity}</p>
          </div>
        </section>

        <section className="mt-16 space-y-6 lg:mt-24">
          <h2 className="text-2xl font-semibold">Recommended services</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {room.recommendedServices.map((service) => (
              <Link
                key={service}
                href={serviceLinkMap[service] ?? "/services"}
                className="rounded-2xl border border-slate-600/60 bg-slate-900/70 px-5 py-4 text-sm font-semibold text-slate-100 shadow-md shadow-black/40 transition hover:-translate-y-0.5 hover:border-brand-teal/50"
              >
                {service}
              </Link>
            ))}
          </div>
        </section>

        {room.optionalUpgrades ? (
          <section className="mt-16 space-y-4 lg:mt-24">
            <h2 className="text-2xl font-semibold">Optional upgrades & variants</h2>
            <ul className="space-y-2 text-sm text-muted">
              {room.optionalUpgrades.map((upgrade) => (
                <li key={upgrade} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-teal" aria-hidden />
                  <span>{upgrade}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-16 grid gap-4 rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-slate-100 shadow-md shadow-black/40 lg:mt-24 lg:grid-cols-2">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">Get this room designed</h3>
            <p className="text-sm text-slate-200">We’ll document and spec this room template for your space.</p>
            <Link
              href="/smart-room-design"
              className="inline-flex items-center justify-center rounded-full bg-brand-teal px-5 py-3 text-sm font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90"
            >
              Get Room Design
            </Link>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">Need full-service install?</h3>
            <p className="text-sm text-slate-200">We handle design + installation + commissioning end to end.</p>
            <Link
              href="/av-integration"
              className="inline-flex items-center justify-center rounded-full border border-brand-teal/70 px-5 py-3 text-sm font-semibold text-brand-teal transition hover:-translate-y-0.5 hover:bg-brand-teal/10 hover:text-brand-slate"
            >
              Explore AV Integration
            </Link>
          </div>
        </section>

        <section className="mt-16 space-y-4 lg:mt-24">
          <h3 className="text-2xl font-semibold text-foreground">Related room types</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {coreRoomTypes
              .filter((r) => r.slug !== room.slug)
              .slice(0, 3)
              .map((related) => (
                <Link
                  key={related.slug}
                  href={`/room-types/${related.slug}`}
                  className="rounded-2xl border border-slate-600/60 bg-slate-900/70 p-4 text-sm font-semibold text-brand-teal shadow-md shadow-black/40 transition hover:-translate-y-0.5 hover:border-brand-teal"
                >
                  {related.name} →
                </Link>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const room = getRoomTypeBySlug(params.slug);
  const roomName = room?.name ?? params.slug.replace(/-/g, " ");
  return {
    title: `${roomName} Design Template | CalLord UT`,
    description: `${roomName} template for teams who need reliable AV, smart rooms, and security. ${siteConfig.serviceArea}`,
  };
}
