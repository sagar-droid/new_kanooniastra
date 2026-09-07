import React from "react";
import Button from "@/components/common/Button";

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen ">
      <section>
        <video
          className="absolute z-0 top-0 left-0 w-full h-[100vh] object-cover"
          autoPlay
          loop
          muted
          playsInline>
          <source src="/video.mp4" type="video/mp4" className="w-full" />
          Your browser does not support the video tag.
        </video>
      </section>
      
      <article className="relative h-screen">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-5xl lg:text-[120px] uppercase text-primary font-bold">
            Kanooni
            <span className="text-white">Astra</span>
          </h1>
          {/* <h2 className="text-2xl font-semibold text-white">
            Law Firm in Kathmandu, Nepal
          </h2> */}
          <h2 className="text-2xl font-semibold text-white">
            &ldquo; ASTRA FOR ALL LEGAL ISSUES &rdquo;
          </h2>
          <div className="mt-8">
            <Button
              title="Book a Consultation"
              link="/contactus"
              className="bg-transparent text-white border-2 border-white hover:bg-primary hover:text-white hover:border-primary"
            />
          </div>
        </div>
        <div className="absolute flex text-2xl items-center justify-center bottom-0 text-white p-8">
          <p>
            Beacon of{" "}
            <span className="text-primary italic">legal excellence</span> forged
            by <br />
            <span className="text-primary italic">passion</span> and{" "}
            <span className="text-primary italic"> commitment</span>
          </p>
        </div>
      </article>
    </section>
  );
};

export default HeroSection;
