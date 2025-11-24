import { notFound } from "next/navigation";
import { RoomTypeTemplate } from "../RoomTypeTemplate";
import { getRoomTypeBySlug } from "../../data/roomTypes";

const room = getRoomTypeBySlug("training-all-hands");

export default function TrainingAllHandsPage() {
  if (!room) {
    notFound();
  }

  return <RoomTypeTemplate room={room} />;
}
