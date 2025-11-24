import { notFound } from "next/navigation";
import { RoomTypeTemplate } from "../RoomTypeTemplate";
import { getRoomTypeBySlug } from "../../data/roomTypes";

const room = getRoomTypeBySlug("small-hybrid-focus-pod");

export default function SmallHybridFocusPodPage() {
  if (!room) {
    notFound();
  }

  return <RoomTypeTemplate room={room} />;
}
