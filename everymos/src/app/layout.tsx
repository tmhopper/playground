import type { Metadata } from "next";
import "../styles/globals.css";
import { SearchProvider } from "@/components/SearchProvider";
import { CommandPalette } from "@/components/CommandPalette";

export const metadata: Metadata = {
  title: {
    default: "EveryMOS — Every military job, explained straight",
    template: "%s · EveryMOS",
  },
  description:
    "A reference for every military occupational specialty across all six U.S. military branches. Sources cited, no recruiter spin.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "EveryMOS — Every military job, explained straight",
    description: "Reference for every U.S. military job across all six branches. Built by a Marine.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EveryMOS",
    description: "Every military job, explained straight.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SearchProvider>
          {children}
          <CommandPalette />
        </SearchProvider>
      </body>
    </html>
  );
}
