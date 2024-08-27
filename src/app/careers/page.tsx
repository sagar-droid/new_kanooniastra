import Image from "next/image";
import React from "react";
import { cn } from "../../../utils/cn";

const Careers = () => {
  const data = [
    {
      id: 1,
      title: "Culture of Excellence",
      description:
        "At Kanooni Astra, excellence is not just a goal; it's a way of life. We are committed to providing a supportive and collaborative work environment where innovation thrives, and every voice is valued.",
      className: "col-span-3 md:col-span-1 row-span-2 ",
    },
    {
      id: 2,
      title: "Professional Development",
      description:
        "We believe in investing in our team members' professional growth and development. From mentorship programs to ongoing training and education opportunities, we are dedicated to helping you expand your skills and advance your career.",
      className: "col-span-3 md:col-span-2 row-span-1 ",
    },
    {
      id: 3,
      title: "Meaningful Work",
      description:
        "As a member of the Kanooni Astra team, you'll have the opportunity to work on challenging and impactful legal matters that make a difference in people's lives and contribute to positive change in society.",
      className: "col-span-3 md:col-span-1 row-span-1 ",
    },
    {
      id: 4,
      title: "Work-Life Balance",
      description:
        ": We understand the importance of maintaining a healthy work-life balance. Our flexible work arrangements and supportive policies ensure that you can excel in your career while prioritizing your well-being and personal commitments.",
      className: "col-span-3 md:col-span-1 row-span-1",
    },
  ];
  const currentOpenings = [
    { id: 1, title: "Associate Attorney" },
    { id: 2, title: "Legal Assistant" },
    { id: 3, title: "Paralegal" },
    { id: 4, title: "Internship Opportunities" },
  ];
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
      <article className=" my-10">
        <div>
          <h2 className=" text-5xl">
            Why Choose <span className=" text-primary">Kanooni Astra?</span>
          </h2>
          <div className="grid grid-cols-3 mt-[60px] gap-4 auto-rows-[minmax(100px,auto)]">
            {data.map((card, index) => (
              <div
                key={card.id}
                data-aos="fade-up"
                data-aos-delay={index + 1 * 100}
                data-aos-once="true"
                className={cn(
                  " p-4 rounded-lg shadow-md flex gap-6 flex-col",
                  card.className
                )}>
                <div className=" flex items-center gap-4">
                  <h2 className="text-xl text-primary font-semibold mb-2">
                    {card.title}
                  </h2>
                </div>
                <p className=" text-lg">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </article>
      <article className=" text-xl flex flex-col gap-10">
        <h3 className=" text-5xl">Available Positions</h3>
        <p className=" ">
          We are always on the lookout for talented individuals to join our
          team. Whether you&apos;re an experienced attorney, a recent law school
          graduate, or a legal professional with expertise in a specific area,
          we welcome your application. <br />
          <br />{" "}
          <span className=" text-2xl text-primary">Current openings</span> may
          include positions such as:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {currentOpenings.map((opening, index) => (
            <div
              key={opening.id}
              data-aos="fade-up"
              data-aos-delay={index + 1 * 100}
              data-aos-once="true"
              className="p-4 rounded-lg shadow-md flex items-center justify-center bg-primary text-white hover:bg-primary-dark transition-colors duration-300">
              <h5 className="text-lg font-semibold text-center">
                {opening.title}
              </h5>
            </div>
          ))}
        </div>
        <p>
          *If you&apos;re passionate about law and ready to take the next step
          in your career, we encourage you to explore our current job openings
          and submit your application today.
        </p>
      </article>
      <article className=" my-10 text-xl">
        <h2 className=" text-5xl mb-10">
          <span className=" text-primary">How</span> to Apply?
        </h2>
        <p>
          To apply for a position at Kanooni Astra, please send your resume/CV
          and a cover letter outlining your{" "}
          <span className=" text-primary">
            qualifications, experience, and why you&apos;re interested
          </span>{" "}
          in joining our team to{" "}
          <a href="mailto:kanooniastra@gmail.com" className=" underline ">
            kanooniastra@gmail.com
          </a>
          . We look forward to hearing from you! Join us at Kanooni Astra and
          embark on a fulfilling career journey where your talents are
          recognized, your contributions are valued, and your potential knows no
          limits
        </p>
      </article>
    </section>
  );
};

export default Careers;
