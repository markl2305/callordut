export interface RoomTypeDefinition {
  id: string;
  slug: string;
  name: string;
  summary: string;
  capacity: string;
  description: string;
  idealUseCases: string[];
  coreFeatures: string[];
  optionalUpgrades?: string[];
  recommendedServices: string[];
  heroHighlights: string[];
}

export const coreRoomTypes: RoomTypeDefinition[] = [
  {
    id: "executive-boardroom",
    slug: "executive-boardroom",
    name: "Executive Boardroom",
    summary: "Flagship board spaces with dual displays, confident audio, and recording-ready paths.",
    capacity: "10–18 people",
    description:
      "Leadership rooms demand spotless joins and zero drama. We combine AV integration, smart controls, and remote project management so every executive session starts on time.",
    idealUseCases: ["Quarterly board calls", "Investor updates", "Global leadership syncs"],
    coreFeatures: [
      "Dual or panoramic displays with gallery layouts",
      "Ceiling or table array microphones tuned for the room",
      "Automated lighting and shade presets",
      "Documented touchpanel flows for moderators",
    ],
    optionalUpgrades: ["Multi-camera speaker tracking", "Recording + archival to cloud", "Integrated security views"],
    recommendedServices: [
      "AV Integration & Systems",
      "Smart Room Design & Documentation",
      "Remote Project Management",
    ],
    heroHighlights: ["Single-touch starts with documented presets", "Executive-ready presence for investors and boards"],
  },
  {
    id: "team-room",
    slug: "team-meeting-room",
    name: "Team Meeting Room",
    summary: "Standardized project rooms that feel the same whether you’re in HQ or a satellite office.",
    capacity: "6–10 people",
    description:
      "Huddle and team rooms should be boring—in the best way. We blueprint a repeatable kit, then document it so every location mirrors the last.",
    idealUseCases: ["Weekly team syncs", "Client status calls", "Workshops"],
    coreFeatures: [
      "Single-touch start with Teams/Zoom presets",
      "Optimized camera placement for half rounds",
      "Displayed cabling + labeling inside the credenza",
      "Quick-reference placards or QR guides",
    ],
    optionalUpgrades: ["Room scheduling panels", "Occupancy insights", "Assistive listening"],
    recommendedServices: ["AV Integration & Systems", "Smart Room Design & Documentation"],
    heroHighlights: ["Every location feels identical to HQ", "Hybrid teammates hear and see clearly every time"],
  },
  {
    id: "training-space",
    slug: "training-all-hands",
    name: "Training / All-Hands Space",
    summary: "Flexible spaces for presentations, orientation, and streaming large internal moments.",
    capacity: "25–80 people",
    description:
      "We balance presenter + audience audio, create multi-camera looks, and design signal paths ready for live streams or recordings.",
    idealUseCases: ["All-hands meetings", "Town halls", "Board/committee hearings"],
    coreFeatures: [
      "Presenter + audience mic matrix",
      "Confidence monitors and countdown tools",
      "Stage lighting cues with presets",
      "Broadcast/streaming patch panel",
    ],
    optionalUpgrades: ["Remote participation pods", "Translation feeds", "Camera automation"],
    recommendedServices: ["AV Integration & Systems", "Remote Project Management"],
    heroHighlights: ["Presenter + audience audio stay balanced", "Streaming-ready signal paths for every event"],
  },
  {
    id: "virtual-visit",
    slug: "virtual-visit-telehealth",
    name: "Virtual Visit / Telehealth Room",
    summary: "Private, acoustically treated spaces for senior living and healthcare virtual visits.",
    capacity: "2–4 people",
    description:
      "Families and care teams need clarity without friction. We pair smart room design with security awareness so visits are safe and simple.",
    idealUseCases: ["Family check-ins", "Telehealth consults", "Resident celebrations"],
    coreFeatures: [
      "Acoustic treatment and soft lighting",
      "One-button family dialing with Teams/Zoom",
      "Accessible signage + instructions",
      "Integrated camera + privacy shroud",
    ],
    optionalUpgrades: ["Environmental sensors", "Remote support panel", "Visitor scheduling"],
    recommendedServices: [
      "Smart Room Design & Documentation",
      "AV Integration & Systems",
      "Cannabis Security & Compliance",
    ],
    heroHighlights: ["Privacy-first visits for residents and families", "Staff-friendly controls with one-button dialing"],
  },
  {
    id: "hybrid-pod",
    slug: "small-hybrid-focus-pod",
    name: "Small Hybrid / Focus Pod",
    summary: "Acoustic pods or small rooms for two-to-four people with pro-grade AV.",
    capacity: "2–4 people",
    description:
      "Distributed teams need quiet nooks that still feel premium. We standardize pods with reliable displays, mics, and signage.",
    idealUseCases: ["1:1s", "Quick sales calls", "Remote interviews"],
    coreFeatures: [
      "Ultra-wide display or dual displays",
      "Beamforming mic/speaker combo",
      "Presence indicators + booking tie-ins",
      "Cable-free laptop prompts",
    ],
    optionalUpgrades: ["Privacy film", "Integrated security sensors"],
    recommendedServices: ["Smart Room Design & Documentation", "Remote Project Management"],
    heroHighlights: ["Bookable pods with pro-grade AV", "Instant start for interviews and quick standups"],
  },
];

export function getRoomTypeBySlug(slug: string) {
  return coreRoomTypes.find((room) => room.slug === slug);
}
