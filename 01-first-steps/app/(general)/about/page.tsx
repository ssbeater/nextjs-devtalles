import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About page description",
  keywords: ["About Page", "Gridman", "NextJS"],
};

export default function About() {
  return <span className="text-5xl">About page</span>;
}
