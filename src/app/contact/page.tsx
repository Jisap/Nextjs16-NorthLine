import type { Metadata } from "next";
import ContactView from "@/views/ContactView";

export const metadata: Metadata = {
  title: "Contact",
};

export default function Page() {
  return <ContactView />;
}
