import Button from "@/components/common/Button";
import Image from "next/image";
import React from "react";

const TeamMember = ({ name, image, designation, email, id }: any) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden"
      data-aos="fade-up"
      data-aos-once="true"
      data-aos-delay={id * 100 + 100}>
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          style={{ objectFit: "cover", objectPosition: "center top" }}
          className="rounded-t-lg"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-gray-600 text-lg">{designation}</p>
        <a href={`mailto:${email}`} className="text-blue-500 hover:underline">
          {email}
        </a>
      </div>
    </div>
  );
};

const OurTeam = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Advocate Praveen Bhattarai",
      image: "/profile1.jpg",
      designation: "Founder & CEO",
      email: "praveenkanooniastra@gmail.com",
    },
    {
      id: 2,
      name: "Advocate Rochak Dhungel",
      image: "/profile2.jpg",
      designation: "Co- Founder, Public Relation Officer",
      email: "rochakkanooniastra@gmail.com",
    },
    {
      id: 3,
      name: "Advocate Sita Bashyal",
      image: "/profile3.jpg",
      designation: "Co- Founder,  Managing Director",
      email: "sitakanooniastra@gmail.com",
    },
  ];

  return (
    <section className="bg-gray-50 py-24">
      <article className="container">
        <div className="mb-12">
          <h2
            className="flex flex-col gap-2 text-5xl border-primary border-l-4 pl-4"
            data-aos="fade-right">
            Our Team <span className="text-lg">Meet our team members</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
        <div className=" mt-8" data-aos="fade-up" data-aos-once="true">
          <Button title="Meet Our Team" link="/ourteam" />
        </div>
      </article>
    </section>
  );
};

export default OurTeam;
