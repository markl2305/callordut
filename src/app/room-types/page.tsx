import Image from "next/image";
import type { Metadata } from "next";
import { coreRoomTypes } from "../data/roomTypes";
import { PageHero, Section, Cards } from "../components/system/Blocks";

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

export default function RoomTypesHubPage() {
  return (
    <>
      <PageHero
        eyebrow="Room recipes"
        title="Room types we build"
        accent="again and again."
        lead={
          <p>
            Each template captures the AV, smart-room, and security details needed to go from sketch to first call—then scale across other sites.
          </p>
        }
      />
      <Section
        tone="cream"
        mark="Room recipes"
        title="Room Types"
        lead={
          <p>
            Proven configurations we build again and again. Start with a template, customize for your space, and skip the trial-and-error.
          </p>
        }
      >
        <Cards
          cols={2}
          items={coreRoomTypes.map((room) => {
            const img = roomImages[room.slug] ?? roomImages.default;
            return {
              media: (
                <div style={{ position: "relative", aspectRatio: "16 / 10" }}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 560px"
                    style={{ objectFit: "contain", padding: 16 }}
                  />
                </div>
              ),
              k: room.capacity,
              title: room.name,
              body: <p>{room.summary}</p>,
              chips: room.idealUseCases.slice(0, 3),
              href: `/room-types/${room.slug}`,
              linkLabel: "View template →",
            };
          })}
        />
      </Section>
    </>
  );
}
