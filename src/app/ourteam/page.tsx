import React from "react";
import Link from "next/link";
import { team } from "../../../data/team";
import Image from "next/image";

const OurTeamPage = () => {
  return (
    <section className="container py-24">
      <h1 className="text-5xl text-primary flex justify-center items-center mb-12">
        Meet Our Team
      </h1>
      <div className=" flex justify-center gap-12 flex-wrap ">
        {team.map((member: any) => (
          <Link
            key={member.id}
            href={`/ourteam/${member.id}`}
            className="" // Ensure the Link takes up the full width of the card
          >
            <div
              style={{
                border: "1px solid #ddd",
                padding: "1rem",
                width: "300px",
              }}
              className="rounded-lg hover:bg-primary hover:text-white transition-all" // hover on the card to change text color
            >
              <div
                className="overflow-hidden rounded-md"
                style={{ height: "250px", width: "100%" }}>
                <Image
                  width={300}
                  height={300}
                  src={member.image}
                  alt={member.name}
                  className="object-cover object-top w-full h-full"
                />
              </div>
              <h2 className="text-2xl font-semibold">{member.name}</h2>
              <p className="text-xl">{member.role}</p>
              <p>{member.bio.substring(0, 100)}...</p>
              <p className="text-blue-600">Read More</p>{" "}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default OurTeamPage;
