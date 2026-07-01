import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { LangProvider } from "@/components/LangProvider";
import { ContactProvider } from "@/components/ContactProvider";
import { Header } from "@/components/Header";
import { Greca } from "@/components/Greca";
import { SiteFooter } from "@/components/SiteFooter";
import { getPartners } from "@/lib/posters";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Verano Internacional de la Ciencia | REDNACECYT–EAAMO",
  description:
    "Un programa que conecta mujeres indígenas investigadoras en México con mentores internacionales y redes de investigación interdisciplinaria.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const partners = getPartners();

  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-brand-cream text-brand-gray">
        <LangProvider>
          <ContactProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Greca />
            <SiteFooter partners={partners} />
          </ContactProvider>
        </LangProvider>
      </body>
    </html>
  );
}
