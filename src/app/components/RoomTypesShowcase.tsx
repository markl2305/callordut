import Link from "next/link";
import { coreRoomTypes, type RoomTypeDefinition } from "../data/roomTypes";

interface RoomTypesShowcaseProps {
  roomTypes?: RoomTypeDefinition[];
  heading?: string;
  subheading?: string;
  id?: string;
}

export function RoomTypesShowcase({
  roomTypes = coreRoomTypes,
  heading = "Systems and rooms we build again and again",
  subheading = "Browse the recipe, then open the template to plan your next space.",
  id,
}: RoomTypesShowcaseProps) {
  return (
    <section id={id} className="space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-teal">Room recipes</p>
        <h2 className="text-3xl font-semibold text-foreground lg:text-4xl">{heading}</h2>
        <p className="max-w-3xl text-lg leading-relaxed text-muted">{subheading}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {roomTypes.map((room) => (
          <Link
            key={room.id}
            href={`/room-types/${room.slug}`}
            className="group block rounded-2xl border border-brand-sand/40 bg-brand-sand/10 p-5 text-foreground shadow-[0_25px_80px_-60px_rgba(242,232,220,0.8)] transition hover:-translate-y-1 hover:border-brand-teal/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-teal"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground">{room.name}</h3>
                <p className="text-sm text-muted">{room.summary}</p>
              </div>
              <span className="rounded-full bg-brand-sand/70 px-3 py-1 text-xs font-semibold text-brand-slate">
                {room.capacity}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-brand-teal">
              {room.idealUseCases.slice(0, 3).map((useCase) => (
                <span key={useCase} className="rounded-full border border-brand-teal/50 px-3 py-1">
                  {useCase}
                </span>
              ))}
            </div>
            <div className="mt-4 inline-flex items-center text-sm font-semibold text-brand-teal transition group-hover:text-brand-teal/80">
              View template →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
