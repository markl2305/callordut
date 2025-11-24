import { notFound } from "next/navigation";
import { RoomTypeTemplate } from "../RoomTypeTemplate";
import { getRoomTypeBySlug } from "../../data/roomTypes";

const room = getRoomTypeBySlug("team-meeting-room");

export default function TeamMeetingRoomPage() {
  if (!room) {
    notFound();
  }

  return <RoomTypeTemplate room={room} />;
}
