import Button from "@/components/common/Button";
import Image from "next/image";

import React from "react";

const About = () => {
  return (
    <section className=" container py-24 overflow-x-hidden flex flex-col lg:flex-row gap-6">
      <div className=" flex flex-col flex-1 gap-6">
        <h2
          className=" text-5xl font-semibold"
          data-aos="fade-up"
          data-aos-once="true">
          Building Lasting Relationships
        </h2>
        <p
          className=" text-xl"
          data-aos="fade-up"
          data-aos-once="true"
          data-aos-delay="500">
          At Kanooni Astra, we don&apos;t just represent clients; we build
          lasting relationships based on trust, integrity, and transparency. Our
          goal is not just to meet expectations but to exceed them, leaving a
          lasting impact that extends far beyond the courtroom. <br />
          <br />
          Join us on our journey to redefine the standards of legal excellence.
          Whether you&apos;re facing a complex legal challenge or seeking
          proactive legal counsel, trust in Kanooni Astra to be your steadfast
          partner every step of the way.
        </p>
        <div data-aos="fade-up" data-aos-once="true">
          <Button title="About Us" link="/aboutus" />
        </div>
      </div>
      <div data-aos-once="true" data-aos="fade-left">
        <Image
          src="/about.jpg"
          alt="about"
          width={500}
          height={500}
          className=" rounded"
        />
      </div>
    </section>
  );
};

export default About;
