import { coreRoomTypes, type RoomTypeDefinition } from "../data/roomTypes";
import { Cards } from "./system/Blocks";

interface RoomTypesShowcaseProps {
  roomTypes?: RoomTypeDefinition[];
  heading?: string;
  subheading?: string;
  id?: string;
}

/* Room recipes in the site system: § mark, section head, linked cards. */
export function RoomTypesShowcase({
  roomTypes = coreRoomTypes,
  heading = "Systems and rooms we build again and again",
  subheading = "Browse the recipe, then open the template to plan your next space.",
  id,
}: RoomTypesShowcaseProps) {
  return (
    <div id={id}>
      <p className="cl-secmark">
        <span className="s">§</span>
        Room recipes
      </p>
      <div className="cl-sec-head">
        <h2 className="cl-h2 cl-reveal">{heading}</h2>
        <p className="cl-lead cl-sec-lead cl-reveal">{subheading}</p>
      </div>
      <div className="cl-sec-body">
        <Cards
          cols={2}
          items={roomTypes.map((room) => ({
            title: room.name,
            body: <p>{room.summary}</p>,
            k: room.capacity,
            chips: room.idealUseCases.slice(0, 3),
            href: `/room-types/${room.slug}`,
            linkLabel: "View template →",
          }))}
        />
      </div>
    </div>
  );
}
