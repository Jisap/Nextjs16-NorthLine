import type { Metadata } from "next";
import GearView from "@/views/GearView";

export const metadata: Metadata = {
  title: "Gear",
};

export default function Page() {
  return <GearView />;
}
