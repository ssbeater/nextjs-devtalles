import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Pricing page description",
  keywords: ["Pricing Page", "Gridman", "NextJS"],
};

export default function Pricing() {
  return <span className="text-5xl">Pricing page</span>;
}
