import type { Metadata } from "next";
import AboutView from "@/views/AboutView";

export const metadata: Metadata = {
  title: "About Us",
};

export default function Page() {
  return <AboutView />;
}
