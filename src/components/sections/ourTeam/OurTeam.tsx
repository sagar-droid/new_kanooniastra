import Button from "@/components/common/Button";
import Image from "next/image";
import React from "react";
import { connectToDatabase } from "@/lib/mongodb";
import TeamMemberModel from "@/models/TeamMember";

interface TeamMemberCardProps {
  id: number;
  name: string;
  image: string;
  designation: string;
  email?: string;
}

const TeamMember = ({ id, name, image, designation, email }: TeamMemberCardProps) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden"
      data-aos="fade-up"
      data-aos-once="true"
      data-aos-delay={id * 100 + 100}>
      <div className="relative w-full aspect-square overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{ objectFit: "cover", objectPosition: "center top" }}
          className="rounded-t-lg"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-gray-600 text-lg">{designation}</p>
        {email && (
          <a href={`mailto:${email}`} className="text-blue-500 hover:underline">
            {email}
          </a>
        )}
      </div>
    </div>
  );
};

const OurTeam = async () => {
  await connectToDatabase();
  const members = await TeamMemberModel.find({
    status: "published",
    officeLocation: "Head Office",
  })
    .sort({ displayOrder: 1 })
    .lean();

  const teamMembers = members.map((member) => ({
    id: member.displayOrder,
    name: member.name,
    image: member.photo.url,
    designation: member.designation,
    email: member.email,
  }));

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
