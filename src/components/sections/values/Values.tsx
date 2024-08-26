import React from "react";
import { cn } from "../../../../utils/cn";

const KanooniAstraValues = () => {
  const values = [
    {
      id: 1,
      title: "Integrity",
      description:
        "We conduct ourselves with honesty, transparency, and ethical conduct at all times. Integrity is the bedrock of our relationships with clients, colleagues, and the community, and we remain steadfast in upholding the trust placed in us.",
      className: "col-span-1 row-span-2 ",
    },
    {
      id: 2,
      title: "Excellence",
      description:
        "We are relentless in our pursuit of excellence, striving to deliver superior outcomes and innovative solutions to our clients' legal challenges. Our dedication to continuous improvement and learning ensures that we stay at the forefront of legal innovation.",
      className: "col-span-2 row-span-1 ",
    },
    {
      id: 3,
      title: "Client-Centricity",
      description:
        "Our clients are at the heart of everything we do. We listen attentively to their needs, understand their objectives, and tailor our services to meet their unique requirements. Building lasting relationships based on trust, respect, and empathy is paramount to us.",
      className: "col-span-1 row-span-1 ",
    },
    {
      id: 4,
      title: "Collaboration",
      description:
        "We believe in the power of teamwork and collaboration. By harnessing the collective expertise and diverse perspectives of our team members, we deliver comprehensive and holistic solutions that exceed our clients' expectations.",
      className: "col-span-1 row-span-1",
    },
    {
      id: 5,
      title: "Social Responsibility",
      description:
        "We are committed to making a positive impact on society and giving back to the communities we serve. Through pro bono work, community service initiatives, and advocacy for social justice, we strive to be agents of positive change in the world.",
      className: "col-span-1 row-span-2 ",
    },
    {
      id: 6,
      title: "Innovation",
      description:
        "We embrace creativity, innovation, and forward thinking in everything we do. By staying abreast of emerging legal trends, leveraging technology, and adopting progressive approaches, we continuously seek to redefine the boundaries of legal excellence.",
      className: "col-span-2 row-span-2 ",
    },
  ];

  return (
    <section className="container py-12">
      <div className=" flex flex-col justify-center items-center gap-6">
        <h2
          className="text-5xl font-bold text-center text-gray-800"
          data-aos="fade-up"
          data-aos-once="true"
        >
          Our Values
        </h2>
        <p data-aos="fade-up" data-aos-once="true" className=" text-xl">
          At Kanooni Astra, our values form the cornerstone of everything we do.
          They guide our actions, shape our decisions, and define who we are as
          a firm. Our commitment to these core principles ensures that we uphold
          the highest standards of integrity, professionalism, and excellence in
          all our endeavors.
          <br />
          <br />
          At Kanooni Astra, our values are not just words on a page; they are
          the guiding principles that inform our actions and shape our identity
          as a firm. We are proud to uphold these values each day as we work
          tirelessly to serve our clients and make a difference in the world.
        </p>
      </div>
      <div className="grid grid-cols-3 mt-[60px] gap-4 auto-rows-[minmax(100px,auto)]">
        {values.map((card, index) => (
          <div
            key={card.id}
            data-aos="fade-up"
            data-aos-delay={index + 1 * 100}
            data-aos-once="true"
            className={cn(
              " p-4 rounded-lg shadow-md flex gap-6 flex-col",
              card.className
            )}
          >
            <div className=" flex items-center gap-4">
              <h2 className="text-xl text-primary font-semibold mb-2">
                {card.title}
              </h2>
            </div>
            <p className=" text-lg">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KanooniAstraValues;
