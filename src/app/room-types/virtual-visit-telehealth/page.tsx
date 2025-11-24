import { notFound } from "next/navigation";
import { RoomTypeTemplate } from "../RoomTypeTemplate";
import { getRoomTypeBySlug } from "../../data/roomTypes";

const room = getRoomTypeBySlug("virtual-visit-telehealth");

export default function VirtualVisitTelehealthPage() {
  if (!room) {
    notFound();
  }

  return <RoomTypeTemplate room={room} />;
}
