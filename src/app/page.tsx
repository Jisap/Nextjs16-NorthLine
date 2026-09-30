import type { Metadata } from "next";
import HomeView from "@/views/HomeView";

export const metadata: Metadata = {
  title: "Northline | Built for the Field",
};

export default function Page() {
  return <HomeView />;
}
