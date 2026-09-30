import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Menu from "@/components/Menu";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: {
    default: "Northline | Built for the Field",
    template: "%s | Northline",
  },
  description:
    "Northline builds recording tools for people who work outdoors — durable field recorders and spatial-capture software for real sound, unfiltered.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-editorial">
        <SmoothScroll>
          <Menu />
          <PageTransition>{children}</PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
