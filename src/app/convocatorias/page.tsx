import type { Metadata } from "next";
import { Participa } from "@/components/Participa";

export const metadata: Metadata = {
  title: "Convocatorias | Verano Internacional de la Ciencia",
  description:
    "Convocatorias abiertas del Verano Internacional de la Ciencia: participa en la construcción de tecnologías más inclusivas desde una perspectiva intercultural y de derechos.",
};

export default function ConvocatoriasPage() {
  return <Participa />;
}
