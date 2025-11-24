import { notFound } from "next/navigation";
import { RoomTypeTemplate } from "../RoomTypeTemplate";
import { getRoomTypeBySlug } from "../../data/roomTypes";

const room = getRoomTypeBySlug("executive-boardroom");

export default function ExecutiveBoardroomPage() {
  if (!room) {
    notFound();
  }

  return <RoomTypeTemplate room={room} />;
}
