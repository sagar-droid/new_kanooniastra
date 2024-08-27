import Button from "@/components/common/Button";
import Image from "next/image";
import React from "react";

const JoinUs = () => {
  return (
    <section className=" bg-primary py-10">
      <article className="container flex flex-col justify-center md:flex-row gap-20 md:gap-32">
        <div className=" bg-primary">
          <Image
            src="/laptop_mockup.png"
            alt="laptop_mockup"
            width={700}
            height={700}
            data-aos="fade-right"
            data-aaos-once="true"
          />
        </div>
        <div
          className=" flex flex-col justify-center items-center text-white gap-10 text-center lg:pr-20"
          data-aos="fade-up"
          // data-aos-once="true"
        >
          <p className=" text-2xl">Wanna become part of us?</p>
          <h2 className=" text-5xl font-semibold ">Join Us</h2>
          <Button title="Get Started" link="#" />
        </div>
      </article>
    </section>
  );
};

export default JoinUs;
