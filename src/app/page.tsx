import { Hero } from "@/components/Hero";
import { Greca } from "@/components/Greca";
import { Stats } from "@/components/Stats";
import { About } from "@/components/About";
import { Temas } from "@/components/Temas";
import { InteractiveMap } from "@/components/map/InteractiveMap";
import { Prensa } from "@/components/Prensa";

export default function Home() {
  return (
    <>
      <Hero />
      <Greca />
      <Stats />
      <About />
      <Temas />
      <InteractiveMap />
      <Prensa />
    </>
  );
}
