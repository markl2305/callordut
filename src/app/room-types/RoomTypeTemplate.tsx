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
    <div className="min-h-screen bg-paper text-ink">
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-10 lg:px-0">
        <section className="border border-rule bg-cream px-6 py-14 lg:px-12 lg:py-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-teal">Room template</p>
          <h1 className="mt-4 font-serif text-4xl font-normal leading-tight text-ink sm:text-5xl lg:text-6xl">{room.name}</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft lg:text-xl">{room.summary}</p>
          <ul className="mt-6 space-y-2 text-sm text-ink-soft">
            {room.heroHighlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 bg-teal" aria-hidden />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="h-btn bg-teal px-6 py-3.5 text-sm font-medium text-on-teal"
            >
              Plan this room
            </Link>
            <Link
              href="/room-types"
              className="h-btn border border-ink px-6 py-3.5 text-sm font-medium text-ink"
            >
              Explore all room types
            </Link>
          </div>
        </section>

        <section className="mt-16 space-y-6 lg:mt-24">
          <h2 className="font-serif text-2xl font-normal text-ink">Best for</h2>
          <div className="flex flex-wrap gap-2">
            {room.idealUseCases.map((useCase) => (
              <span key={useCase} className="border border-rule px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-teal">
                {useCase}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="border border-rule bg-cream p-6 text-ink">
            <div className="mb-4 flex items-center gap-4">
              <div className="border border-rule bg-cream p-2">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={140}
                  height={140}
                  className="h-24 w-24 object-contain"
                />
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-teal">Layout</p>
                <p className="text-sm text-ink-soft">Top-down reference for this room type</p>
              </div>
            </div>
            <h2 className="font-serif text-2xl font-normal text-ink">Core design pattern</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              {room.description}
              <br />
              <span className="text-ink-faint">Capacity: {room.capacity}</span>
            </p>
          </div>
          <div className="border border-rule bg-cream-deep p-6 text-ink">
            <h3 className="font-serif text-lg font-normal text-ink">Core AV features</h3>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              {room.coreFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 bg-teal" aria-hidden />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">Capacity: {room.capacity}</p>
          </div>
        </section>

        <section className="mt-16 space-y-6 lg:mt-24">
          <h2 className="font-serif text-2xl font-normal text-ink">Recommended services</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {room.recommendedServices.map((service) => (
              <Link
                key={service}
                href={serviceLinkMap[service] ?? "/services"}
                className="h-hover-cream border border-rule bg-cream px-5 py-4 text-sm font-medium text-ink"
              >
                {service}
              </Link>
            ))}
          </div>
        </section>

        {room.optionalUpgrades ? (
          <section className="mt-16 space-y-4 lg:mt-24">
            <h2 className="font-serif text-2xl font-normal text-ink">Optional upgrades &amp; variants</h2>
            <ul className="space-y-2 text-sm text-ink-soft">
              {room.optionalUpgrades.map((upgrade) => (
                <li key={upgrade} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 bg-teal" aria-hidden />
                  <span>{upgrade}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-16 grid gap-4 border border-rule bg-cream p-6 text-ink lg:mt-24 lg:grid-cols-2">
          <div className="space-y-2">
            <h3 className="font-serif text-xl font-normal text-ink">Get this room designed</h3>
            <p className="text-sm text-ink-soft">We’ll document and spec this room template for your space.</p>
            <Link
              href="/smart-room-design"
              className="h-btn inline-flex items-center justify-center bg-teal px-6 py-3.5 text-sm font-medium text-on-teal"
            >
              Get Room Design
            </Link>
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-xl font-normal text-ink">Need full-service install?</h3>
            <p className="text-sm text-ink-soft">We handle design + installation + commissioning end to end.</p>
            <Link
              href="/av-integration"
              className="h-btn inline-flex items-center justify-center border border-ink px-6 py-3.5 text-sm font-medium text-ink"
            >
              Explore AV Integration
            </Link>
          </div>
        </section>

        <section className="mt-16 space-y-4 lg:mt-24">
          <h3 className="font-serif text-2xl font-normal text-ink">Related room types</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {coreRoomTypes
              .filter((r) => r.slug !== room.slug)
              .slice(0, 3)
              .map((related) => (
                <Link
                  key={related.slug}
                  href={`/room-types/${related.slug}`}
                  className="h-hover-cream border border-rule bg-cream p-4 text-sm font-medium text-teal"
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
