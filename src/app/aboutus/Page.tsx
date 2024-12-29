import Image from "next/image";
import React from "react";

const AboutusPage = () => {
  return (
    <section className="container py-24">
      <div>
        <h1 className=" text-[124px] text-primary">About Us</h1>
      </div>
      <div className=" flex flex-col md:flex-row gap-6">
        <div className="flex-1 flex text-lg">
          <p>
            Welcome to Kanooni Astra, a beacon of legal excellence forged by
            passion and commitment. Founded on December 5th, 2022, by Adv.
            Praveen Bhattarai and his dedicated colleagues, Adv. Rochak Dhungel
            and Sita Bashyal, stand as a testament to the power of youth and
            innovation in the legal field.
            <br />
            <br /> Driven by a shared enthusiasm for justice and a relentless
            pursuit of excellence, our team at Kanooni Astra is fully determined
            to provide unparalleled legal services to our clients. We believe in
            going above and beyond to ensure the highest level of satisfaction,
            conducting thorough research and applying our best efforts to
            accomplish every task within the given time frame.
            <br />
            <br /> But beyond our professional prowess, what truly sets us apart
            is our unwavering commitment to our clients&apos; needs. We
            understand that each legal matter is unique, and we approach every
            case with a personalized touch, tailoring our strategies to achieve
            the best possible outcome.
            <br />
            <br /> At Kanooni Astra, we don&apos;t just represent clients; we
            build lasting relationships based on trust, integrity, and
            transparency. Our goal is not just to meet expectations but to
            exceed them, leaving a lasting impact that extends far beyond the
            courtroom.
            <br />
            <br /> Join us on our journey to redefine the standards of legal
            excellence. Whether you&apos;re facing a complex legal challenge or
            seeking proactive legal counsel, trust in Kanooni Astra to be your
            steadfast partner every step of the way.
          </p>
        </div>
        <div className="">
          <Image
            src="/aboutPage.png"
            alt="aboutPage"
            width={500}
            height={500}
            className=""
          />
        </div>
      </div>
    </section>
  );
};

export default AboutusPage;
