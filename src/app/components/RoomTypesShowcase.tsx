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
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-teal">Room recipes</p>
        <h2 className="font-serif text-3xl font-normal text-ink lg:text-4xl">{heading}</h2>
        <p className="max-w-3xl text-lg leading-relaxed text-ink-soft">{subheading}</p>
      </div>
      <div className="grid gap-px border border-rule bg-rule md:grid-cols-2">
        {roomTypes.map((room) => (
          <Link
            key={room.id}
            href={`/room-types/${room.slug}`}
            className="group block bg-paper p-6 text-ink transition hover:bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-xl font-normal text-ink">{room.name}</h3>
                <p className="text-sm text-ink-soft">{room.summary}</p>
              </div>
              <span className="border border-rule px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                {room.capacity}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 font-mono text-[11px] text-teal">
              {room.idealUseCases.slice(0, 3).map((useCase) => (
                <span key={useCase} className="border border-teal/40 px-3 py-1">
                  {useCase}
                </span>
              ))}
            </div>
            <div className="mt-4 inline-flex items-center text-sm font-medium text-teal">
              View template →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
