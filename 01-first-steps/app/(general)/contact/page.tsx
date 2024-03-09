import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact page description",
  keywords: ["Contact Page", "Gridman", "NextJS"],
};

export default function Contact() {
  return <span className="text-5xl">Contact page</span>;
}
