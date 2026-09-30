import type { Metadata } from "next";
import FieldNotesView from "@/views/FieldNotesView";

export const metadata: Metadata = {
  title: "Field Notes",
};

export default function Page() {
  return <FieldNotesView />;
}
