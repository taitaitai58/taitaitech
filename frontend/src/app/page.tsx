import { AboutSection } from "@/components/sections/AboutSection";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Hero } from "@/components/sections/Hero";
import { SolutionsSlider } from "@/components/sections/SolutionsSlider";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <div className="mt-24 flex flex-col space-y-24">
        <AboutSection />
        <CapabilitiesSection />
        <SolutionsSlider />
        <ContactSection />
      </div>
      {/* <p className="mt-16 text-center text-sm text-white-500">
        このサイトはデモです。現在、このような組織は存在していません。
      </p> */}
    </div>
  );
}
