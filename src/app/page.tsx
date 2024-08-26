import About from "@/components/sections/about/About";
import HeroSection from "@/components/sections/heroSection/HeroSection";
import JoinUs from "@/components/sections/joinUs/JoinUs";
import OurTeam from "@/components/sections/ourTeam/OurTeam";
import OurServices from "@/components/sections/services/OurServices";
import KanooniAstraValues from "@/components/sections/values/Values";
import React from "react";

const HomePage = () => {
  return (
    <section>
      <HeroSection />
      <About />
      <KanooniAstraValues />
      <OurServices />
      <OurTeam />
      <JoinUs />
    </section>
  );
};

export default HomePage;
