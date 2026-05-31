import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { CTASection } from "../components/CTASection";
import { SectionHeader } from "../components/SectionHeader";
import { FadeIn, Stagger, StaggerItem, GlowCard } from "../components/MotionWrappers";

export const metadata: Metadata = {
  title: "About CalLord Unified Technologies | Design-Led AV & Security",
  description:
    "Meet the team behind CalLord UT and our design-first approach to AV, smart rooms, and security for operators nationwide.",
};

const processSteps = [
  { title: "Discover", description: "Site walks, remote interviews, and call recordings tell us how your team actually works and where rooms break down." },
  { title: "Design & Documentation", description: "We turn requirements into schematics, elevations, and room templates that anyone on the project can understand." },
  { title: "Coordinate & Build", description: "We guide local installers, GCs, and IT teams so every trade knows what happens when." },
  { title: "Commission & Verify", description: "Room testing, labeling, punch lists, and recordings ensure the space works before anyone important walks in." },
  { title: "Support & Iterate", description: "We stay available for tweaks, expansions, and ongoing documentation updates as your footprint grows." },
];

const audiences = [
  { title: "Small & mid-size businesses", bullets: ["Executive rooms that never stall before a board call", "Hybrid spaces where remote teammates sound equal", "Documentation that outlives employee turnover"] },
  { title: "Senior living communities", bullets: ["Virtual visit rooms that respect privacy", "Nurse stations and common areas with dependable AV", "Clear instructions for staff handoffs"] },
  { title: "Hospitality groups", bullets: ["Guest-facing AV that feels effortless", "Discrete security and access control planning", "Documentation that scales across locations"] },
  { title: "Nonprofits & mission-driven orgs", bullets: ["Town hall and donor update spaces", "Volunteer-friendly controls", "Budgets respected without cutting reliability"] },
];

const principles = [
  "Documentation is a deliverable, not an afterthought. Every room ships with drawings, labels, and an update path.",
  "Operator-friendly design beats spec-sheet flexing. If the room embarrasses someone on Monday morning, we missed.",
  "Security and compliance matter even in AV projects, so we design with Eagle Eye + Brivo expectations baked in.",
  "Long-term relationships win—we leave behind templates so future rooms build faster, even if another installer executes.",
];

const team = [
  { name: "Mark Lord", title: "Co-Founder", image: "/mark.jpeg", bio: "Mark focuses on strategic direction, partnerships, and long-term vision at CalLord Unified Technologies. He works to ensure the company delivers practical, reliable technology solutions that support real operational needs." },
  { name: "Patrick Calandro, CTS", title: "Co-Founder & Chief Operations Officer", image: "/patrick.jpeg", bio: "Patrick leads operations, systems design, and project execution across CalLord's deployments. With deep experience in integrated technology environments, he ensures projects are delivered cleanly, reliably, and to specification." },
  { name: "Brianna Lord", title: "Business Manager", image: "/bri.jpeg", bio: "Brianna manages business operations, marketing coordination, and client communications. She ensures internal processes, messaging, and customer touchpoints remain organized, consistent, and professional." },
  { name: "Amanda Martinez", title: "Project Manager", image: "/amanda.jpeg", bio: "Amanda coordinates project timelines, vendor communication, and delivery milestones. She bridges client needs with technical execution to keep projects moving smoothly from planning through completion." },
  { name: "Joshua Dworsky", title: "Engineering Manager", image: "/joshua.jpeg", bio: "Joshua leads engineering and system architecture for CalLord projects. He is responsible for ensuring solutions are technically sound, secure, and aligned with real-world operational requirements." },
  { name: "Trevor Garcia", title: "Information Technology Technician", image: "/trevor.jpeg", bio: "Trevor supports installation, configuration, and on-site technical execution. He works hands-on with systems and infrastructure to ensure deployments are completed accurately and perform as intended." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <main className="mx-auto max-w-6xl px-4 pb-20 pt-6 lg:px-6">

        {/* Hero */}
        <FadeIn>
          <section className="border border-rule bg-cream px-6 py-14 lg:px-12 lg:py-20">
            <div className="space-y-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-teal">About CalLord Unified Technologies</span>
              <h1 className="font-serif text-4xl font-normal leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
                We design rooms that don't embarrass you on Monday morning.
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-ink-soft lg:text-xl">
                CalLord is a design-led AV, smart room, and security partner for teams that can't afford failed calls or compliance drama. We obsess over documentation, operator experience, and remote collaboration so your rooms feel effortless every time you tap "Join".
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/contact" className="h-btn bg-teal px-6 py-3.5 text-sm font-medium text-on-teal">
                  Schedule Free Assessment
                </Link>
                <Link href="/services" className="h-btn border border-ink bg-transparent px-6 py-3.5 text-sm font-medium text-ink">
                  See our services
                </Link>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Photo */}
        <FadeIn delay={0.1} className="mt-8 lg:mt-12">
          <section className="overflow-hidden border border-rule">
            <div className="relative h-64 w-full sm:h-80 lg:h-96">
              <Image src="/about-designer-desk-av-drawings.png" alt="AV designer desk with technical room drawings" fill className="object-cover" priority />
            </div>
          </section>
        </FadeIn>

        {/* Who we are */}
        <section className="mt-16 space-y-8 lg:mt-24">
          <SectionHeader kicker="Who we are" title="Design-first integrators with a documentation habit" subtitle="We started CalLord to fix meeting rooms that only 'the AV person' could start, to translate complex security requirements into clear drawings, and to remove the chaos from working with out-of-town installers." />
          <FadeIn>
            <div className="grid gap-6 lg:grid-cols-2">
              <p className="text-base leading-relaxed text-ink-soft">
                Every room starts with operator interviews and recordings. We map how teams speak about their spaces so the final documentation feels native—plain-language call flows, annotated drawings, and inventory lists that live in the same shared folder as the rest of your projects. No mystery boxes.
              </p>
              <p className="text-base leading-relaxed text-ink-soft">
                Because our projects regularly span multiple sites, we built remote collaboration into our DNA. Clear rev-control, video walkthroughs, and modern platforms mean a GC in Albuquerque, an IT lead in Denver, and a compliance officer in Phoenix are all staring at the same truth.
              </p>
            </div>
          </FadeIn>
        </section>

        <div className="section-divider mx-auto mt-16 max-w-2xl lg:mt-24" />

        {/* How we work */}
        <section className="mt-16 space-y-8 lg:mt-24">
          <SectionHeader kicker="How we work" title="From idea to support, every step is documented" subtitle="We borrowed the rigor of product teams: kickoff notes, structured reviews, and issue tracking so you always know what's next." />
          <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, index) => (
              <StaggerItem key={step.title}>
                <div className="border border-rule bg-cream p-5 h-full">
                  <div className="mb-4 flex items-center gap-3 text-sm font-medium text-teal">
                    <span className="flex h-8 w-8 items-center justify-center border border-teal/40 bg-teal/10 font-mono text-xs">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {step.title}
                  </div>
                  <p className="text-sm leading-relaxed text-ink-soft">{step.description}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        <div className="section-divider mx-auto mt-16 max-w-2xl lg:mt-24" />

        {/* Team */}
        <section className="mt-16 space-y-8 lg:mt-24">
          <SectionHeader kicker="Team" title="People who keep rooms calm" subtitle="A focused team covering strategy, operations, project delivery, and hands-on execution." />
          <Stagger className="grid gap-8 md:grid-cols-2">
            {team.map((member) => (
              <StaggerItem key={member.name}>
                <div className="flex items-start gap-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={72}
                    height={72}
                    className="h-14 w-14 max-h-[56px] max-w-[56px] flex-shrink-0 object-cover border border-rule md:h-16 md:w-16 md:max-h-[64px] md:max-w-[64px] lg:h-[72px] lg:w-[72px] lg:max-h-[72px] lg:max-w-[72px]"
                    sizes="(min-width: 1024px) 72px, (min-width: 768px) 64px, 56px"
                  />
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-teal">{member.title}</p>
                    <h3 className="mt-1 font-serif text-xl font-normal text-ink">{member.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{member.bio}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        <div className="section-divider mx-auto mt-16 max-w-2xl lg:mt-24" />

        {/* Who we serve */}
        <section className="mt-16 space-y-8 lg:mt-24">
          <SectionHeader kicker="Who we serve" title="Rooms and systems for teams who can't afford failure" subtitle="We focus on operators who carry a real reputational or regulatory cost if tech flakes out." />
          <Stagger className="grid gap-4 md:grid-cols-2">
            {audiences.map((audience) => (
              <StaggerItem key={audience.title}>
                <GlowCard className="h-full">
                  <h3 className="font-serif text-xl font-normal text-ink">{audience.title}</h3>
                  <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                    {audience.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-teal" />
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </GlowCard>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* Values */}
        <section className="mt-16 space-y-8 lg:mt-24">
          <SectionHeader kicker="Values & principles" title="What guides every build" subtitle="These are the habits and guardrails that shape every CalLord project." />
          <FadeIn>
            <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
              <div className="border border-rule bg-cream p-6">
                <ul className="space-y-3 text-sm text-ink-soft">
                  {principles.map((principle) => (
                    <li key={principle} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-teal" />
                      <span className="leading-relaxed">{principle}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-teal/40 bg-teal/10 p-6">
                <h3 className="font-serif text-2xl font-normal text-ink">What matters to us when we build for you</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  We treat every space like it needs to survive a leadership offsite or a compliance inspection. That means obsessive documentation, calm operators, and platforms that can be supported long after the ribbon-cutting.
                </p>
              </div>
            </div>
          </FadeIn>
        </section>

        <CTASection
          title="Ready to stop apologizing for your conference rooms?"
          subtitle="We'll audit your current rooms, outline a phased plan, and coordinate local partners so Monday morning feels calm."
          primaryLabel="Schedule Free Assessment"
          primaryHref="/contact"
          secondaryLabel="See our services"
          secondaryHref="/services"
        />
      </main>
    </div>
  );
}
