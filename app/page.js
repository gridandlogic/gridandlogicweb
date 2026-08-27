import { Hero } from "@/app/sections/Hero";
import { CapabilityStrip } from "@/app/sections/CapabilityStrip";
import { Services } from "@/app/sections/Services";
import { Work } from "@/app/sections/Work";
import { Process } from "@/app/sections/Process";
import { Studio } from "@/app/sections/Studio";
import { Testimonial } from "@/app/sections/Testimonial";
import { Journal } from "@/app/sections/Journal";
import { Contact } from "@/app/sections/Contact";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <CapabilityStrip />
      <Services />
      <Work />
      <Process />
      <Studio />
      <Testimonial />
      <Journal />
      <Contact />
    </main>
  );
}
