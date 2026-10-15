import Image from "next/image";
import type { Metadata } from "next";
import type { RoomTypeDefinition } from "../data/roomTypes";
import { getRoomTypeBySlug, coreRoomTypes } from "../data/roomTypes";
import { siteConfig } from "../../config/site";
import { PageHero, Section, Cards, Dashes, LinkRow, CloseBand } from "../components/system/Blocks";

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
      src: "/smart-room-virtual-visit-interior.png",
      alt: "Virtual visit room interior",
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
    <>
      <PageHero
        eyebrow="Room template"
        title={room.name}
        lead={<p>{room.summary}</p>}
        primary={{ label: "Plan this room", href: "/contact" }}
        secondary={{ label: "Explore all room types", href: "/room-types" }}
      >
        <Dashes items={room.heroHighlights.map((highlight) => ({ text: highlight }))} />
      </PageHero>

      <Section tone="cream" title="Best for">
        <div className="cl-chips cl-reveal">
          {room.idealUseCases.map((useCase) => (
            <span key={useCase} className="cl-chip">
              {useCase}
            </span>
          ))}
        </div>
      </Section>

      <Section
        title="Core design pattern"
        lead={
          <p>
            {room.description}
            <br />
            <span className="text-ink-faint">Capacity: {room.capacity}</span>
          </p>
        }
      >
        <Cards
          cols={2}
          items={[
            {
              media: (
                <div style={{ position: "relative", aspectRatio: "4 / 3" }}>
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 560px"
                    style={{ objectFit: "contain", padding: 20 }}
                  />
                </div>
              ),
              k: "Layout",
              body: <p>Top-down reference for this room type</p>,
            },
            {
              title: "Core AV features",
              bullets: room.coreFeatures,
              extra: <p className="cl-chip" style={{ display: "inline-block", marginTop: 16 }}>Capacity: {room.capacity}</p>,
            },
          ]}
        />
      </Section>

      <Section tone="cream" title="Recommended services">
        <LinkRow
          links={room.recommendedServices.map((service) => ({
            label: service,
            href: serviceLinkMap[service] ?? "/services",
          }))}
        />
      </Section>

      {room.optionalUpgrades ? (
        <Section title="Optional upgrades &amp; variants" split>
          <Dashes items={room.optionalUpgrades.map((upgrade) => ({ text: upgrade }))} />
        </Section>
      ) : null}

      <Section tone={room.optionalUpgrades ? "cream" : "paper"} title="Related room types">
        <LinkRow
          links={coreRoomTypes
            .filter((r) => r.slug !== room.slug)
            .slice(0, 3)
            .map((related) => ({
              label: `${related.name} →`,
              href: `/room-types/${related.slug}`,
            }))}
        />
      </Section>

      <CloseBand
        title="Get this room designed"
        lead={<p>We’ll document and spec this room template for your space.</p>}
        primary={{ label: "Get Room Design", href: "/smart-room-design" }}
        secondary={{ label: "Explore AV Integration", href: "/av-integration" }}
      >
        <div className="cl-lead cl-close-lead cl-reveal" style={{ marginTop: 20 }}>
          <h3 style={{ font: "inherit", fontWeight: 600, margin: 0 }}>Need full-service install?</h3>
          <p>We handle design + installation + commissioning end to end.</p>
        </div>
      </CloseBand>
    </>
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
