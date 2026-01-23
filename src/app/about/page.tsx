import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { CTASection } from "../components/CTASection";
import { SectionHeader } from "../components/SectionHeader";

export const metadata: Metadata = {
  title: "About CalLord Unified Technologies | Design-Led AV & Security",
  description:
    "Meet the team behind CalLord UT and our design-first approach to AV, smart rooms, and security for operators nationwide.",
};

const processSteps = [
  {
    title: "Discover",
    description: "Site walks, remote interviews, and call recordings tell us how your team actually works and where rooms break down.",
  },
  {
    title: "Design & Documentation",
    description: "We turn requirements into schematics, elevations, and room templates that anyone on the project can understand.",
  },
  {
    title: "Coordinate & Build",
    description: "We guide local installers, GCs, and IT teams so every trade knows what happens when.",
  },
  {
    title: "Commission & Verify",
    description: "Room testing, labeling, punch lists, and recordings ensure the space works before anyone important walks in.",
  },
  {
    title: "Support & Iterate",
    description: "We stay available for tweaks, expansions, and ongoing documentation updates as your footprint grows.",
  },
];

const audiences = [
  {
    title: "Small & mid-size businesses",
    bullets: [
      "Executive rooms that never stall before a board call",
      "Hybrid spaces where remote teammates sound equal",
      "Documentation that outlives employee turnover",
    ],
  },
  {
    title: "Senior living communities",
    bullets: [
      "Virtual visit rooms that respect privacy",
      "Nurse stations and common areas with dependable AV",
      "Clear instructions for staff handoffs",
    ],
  },
  {
    title: "Hospitality groups",
    bullets: [
      "Guest-facing AV that feels effortless",
      "Discrete security and access control planning",
      "Documentation that scales across locations",
    ],
  },
  {
    title: "Nonprofits & mission-driven orgs",
    bullets: [
      "Town hall and donor update spaces",
      "Volunteer-friendly controls",
      "Budgets respected without cutting reliability",
    ],
  },
];

const principles = [
  "Documentation is a deliverable, not an afterthought. Every room ships with drawings, labels, and an update path.",
  "Operator-friendly design beats spec-sheet flexing. If the room embarrasses someone on Monday morning, we missed.",
  "Security and compliance matter even in AV projects, so we design with Eagle Eye + Brivo expectations baked in.",
  "Long-term relationships win—we leave behind templates so future rooms build faster, even if another installer executes.",
];

const team = [
  {
    name: "Mark Lord",
    title: "Co-Founder",
    image: "/mark.jpeg",
    bio: "Mark focuses on strategic direction, partnerships, and long-term vision at CalLord Unified Technologies. He works to ensure the company delivers practical, reliable technology solutions that support real operational needs.",
  },
  {
    name: "Patrick Calandro, CTS",
    title: "Co-Founder & Chief Operations Officer",
    image: "/patrick.jpeg",
    bio: "Patrick leads operations, systems design, and project execution across CalLord’s deployments. With deep experience in integrated technology environments, he ensures projects are delivered cleanly, reliably, and to specification.",
  },
  {
    name: "Brianna Lord",
    title: "Business Manager",
    image: "/bri.jpeg",
    bio: "Brianna manages business operations, marketing coordination, and client communications. She ensures internal processes, messaging, and customer touchpoints remain organized, consistent, and professional.",
  },
  {
    name: "Amanda Martinez",
    title: "Project Manager",
    image: "/amanda.jpeg",
    bio: "Amanda coordinates project timelines, vendor communication, and delivery milestones. She bridges client needs with technical execution to keep projects moving smoothly from planning through completion.",
  },
  {
    name: "Joshua Dworsky",
    title: "Engineering Manager",
    image: "/joshua.jpeg",
    bio: "Joshua leads engineering and system architecture for CalLord projects. He is responsible for ensuring solutions are technically sound, secure, and aligned with real-world operational requirements.",
  },
  {
    name: "Trevor Garcia",
    title: "Information Technology Technician",
    image: "/trevor.jpeg",
    bio: "Trevor supports installation, configuration, and on-site technical execution. He works hands-on with systems and infrastructure to ensure deployments are completed accurately and perform as intended.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-slate via-[#0f1d32] to-[#0b1220] text-foreground">
      <main className="mx-auto max-w-6xl px-4 pb-20 pt-6 lg:px-6">
        <section className="rounded-3xl border border-white/5 bg-gradient-to-br from-brand-slate via-[#10223a] to-[#0b1220] px-6 py-14 shadow-[0_25px_80px_-40px_rgba(0,0,0,0.8)] lg:px-12 lg:py-20">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-teal">About CalLord Unified Technologies</p>
            <h1 className="text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              We design rooms that don’t embarrass you on Monday morning.
            </h1>
            <p className="text-lg leading-relaxed text-muted lg:text-xl">
              CalLord is a design-led AV, smart room, and security partner for teams that can’t afford failed calls or compliance drama. We obsess over documentation, operator experience, and remote collaboration so your rooms feel effortless every time you tap “Join”.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-brand-teal px-6 py-3 text-base font-semibold text-brand-slate transition hover:-translate-y-0.5 hover:bg-brand-teal/90 hover:shadow-[0_25px_60px_-40px_rgba(39,154,146,0.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
              >
                Schedule Free Assessment
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-brand-teal/70 px-6 py-3 text-base font-semibold text-brand-teal transition hover:-translate-y-0.5 hover:bg-brand-teal/10 hover:text-brand-slate focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
              >
                See our services
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-8 overflow-hidden rounded-3xl border border-white/5 bg-slate-900/60 shadow-[0_30px_90px_-60px_rgba(0,0,0,0.9)] lg:mt-12">
          <div className="relative h-64 w-full sm:h-80 lg:h-96">
            <Image
              src="/about-designer-desk-av-drawings.png"
              alt="AV designer desk with technical room drawings"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-slate-950/80" aria-hidden />
          </div>
        </section>

        <section className="mt-16 space-y-10 lg:mt-24">
          <SectionHeader
            kicker="Who we are"
            title="Design-first integrators with a documentation habit"
            subtitle="We started CalLord to fix meeting rooms that only ‘the AV person’ could start, to translate complex security requirements into clear drawings, and to remove the chaos from working with out-of-town installers."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <p className="text-base leading-relaxed text-muted">
              Every room starts with operator interviews and recordings. We map how teams speak about their spaces so the final documentation feels native—plain-language call flows, annotated drawings, and inventory lists that live in the same shared folder as the rest of your projects. No mystery boxes.
            </p>
            <p className="text-base leading-relaxed text-muted">
              Because our projects regularly span multiple sites, we built remote collaboration into our DNA. Clear rev-control, video walkthroughs, and modern platforms mean a GC in Albuquerque, an IT lead in Denver, and a compliance officer in Phoenix are all staring at the same truth.
            </p>
          </div>
        </section>

        <section className="mt-16 space-y-8 lg:mt-24">
          <SectionHeader
            kicker="How we work"
            title="From idea to support, every step is documented"
            subtitle="We borrowed the rigor of product teams: kickoff notes, structured reviews, and issue tracking so you always know what’s next."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="relative rounded-2xl border border-slate-600/60 bg-slate-900/70 p-5 text-slate-100 shadow-md shadow-black/40"
              >
                <div className="mb-4 flex items-center gap-3 text-sm font-semibold text-brand-teal">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-teal/40 bg-brand-teal/10 text-base">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {step.title}
                </div>
                <p className="text-sm leading-relaxed text-slate-200">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 space-y-8 border-t border-brand-teal/20 pt-12 lg:mt-24 lg:pt-16">
          <SectionHeader
            kicker="Team"
            title="People who keep rooms calm"
            subtitle="A focused team covering strategy, operations, project delivery, and hands-on execution."
          />
          <div className="grid gap-8 md:grid-cols-2">
            {team.map((member) => (
              <div key={member.name} className="flex items-start gap-4 text-slate-100">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={72}
                  height={72}
                  className="h-14 w-14 max-h-[56px] max-w-[56px] flex-shrink-0 rounded-full object-cover md:h-16 md:w-16 md:max-h-[64px] md:max-w-[64px] lg:h-[72px] lg:w-[72px] lg:max-h-[72px] lg:max-w-[72px]"
                  sizes="(min-width: 1024px) 72px, (min-width: 768px) 64px, 56px"
                />
                <div>
                  <p className="text-sm font-semibold text-brand-teal">{member.title}</p>
                  <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-200">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 space-y-8 border-t border-brand-teal/20 pt-12 lg:mt-24 lg:pt-16">
          <SectionHeader
            kicker="Who we serve"
            title="Rooms and systems for teams who can’t afford failure"
            subtitle="We focus on operators who carry a real reputational or regulatory cost if tech flakes out."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {audiences.map((audience) => (
              <div
                key={audience.title}
                className="rounded-2xl border border-slate-600/60 bg-slate-900/70 p-5 text-slate-100 shadow-md shadow-black/40"
              >
                <h3 className="text-xl font-semibold text-foreground">{audience.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-200">
                  {audience.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-teal" aria-hidden />
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 space-y-8 lg:mt-24">
          <SectionHeader
            kicker="Values & principles"
            title="What guides every build"
            subtitle="These are the habits and guardrails that shape every CalLord project."
          />
          <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
            <div className="rounded-3xl border border-slate-600/60 bg-slate-900/70 p-6 text-slate-100 shadow-md shadow-black/40">
              <ul className="space-y-3 text-sm text-slate-200">
                {principles.map((principle) => (
                  <li key={principle} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-teal" aria-hidden />
                    <span>{principle}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-brand-sand/60 bg-brand-sand/40 p-6 text-brand-slate shadow-[0_20px_60px_-50px_rgba(242,232,220,0.8)]">
              <h3 className="text-2xl font-semibold">What matters to us when we build for you</h3>
              <p className="mt-3 text-sm text-slate-700">
                We treat every space like it needs to survive a leadership offsite or a compliance inspection. That means obsessive documentation, calm operators, and platforms that can be supported long after the ribbon-cutting.
              </p>
            </div>
          </div>
        </section>

        <CTASection
          title="Ready to stop apologizing for your conference rooms?"
          subtitle="We’ll audit your current rooms, outline a phased plan, and coordinate local partners so Monday morning feels calm."
          primaryLabel="Schedule Free Assessment"
          primaryHref="/contact"
          secondaryLabel="See our services"
          secondaryHref="/services"
        />
      </main>
    </div>
  );
}
