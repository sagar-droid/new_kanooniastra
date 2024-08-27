import Image from "next/image";
import React from "react";

const Careers = () => {
  return (
    <section className=" container py-24">
      <article className=" flex gap-10 items-center mb-10">
        <div className="flex-1">
          <h1 className=" text-[124px]">
            Join Our <span className=" text-primary">Team</span>
          </h1>
          <p className=" text-xl ">
            At Kanooni Astra, we believe in nurturing talent, fostering growth,
            and empowering individuals to reach their full potential. If
            you&apos;re passionate about law, driven by a desire to make a
            difference, and eager to embark on a rewarding career journey, we
            invite you to explore opportunities to join our dynamic team.
          </p>
        </div>
        <div>
          <Image
            src="/team.png"
            alt="team"
            width={500}
            height={500}
            className=""
          />
        </div>
      </article>
      <article>
        <div>
          <h2 className=" text-5xl">
            Why Choose <span className=" text-primary">Kanooni Astra?</span>
          </h2>
        </div>
      </article>
    </section>
  );
};

export default Careers;
