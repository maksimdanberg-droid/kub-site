import { Header } from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Services from '@/components/sections/Services';
import Timeline from '@/components/sections/Timeline';
import AboutTeaser from "@/components/sections/AboutTeaser";
import FAQ from "@/components/sections/FAQ";

export default function Home() {
  return ( 
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Timeline />
        <AboutTeaser />
        <FAQ />
      </main>
    </>
  );
}