import type { Metadata } from "next";
import { getPosters } from "@/lib/posters";
import { Posters } from "@/components/Posters";

export const metadata: Metadata = {
  title: "Pósters | Verano Internacional de la Ciencia",
  description:
    "Galería de pósters de investigación elaborados por las participantes del Verano Internacional de la Ciencia, año con año.",
};

export default function PostersPage() {
  const posters = getPosters();
  return <Posters posters={posters} />;
}
