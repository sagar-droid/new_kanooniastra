import React from "react";
import Link from "next/link";
import Image from "next/image";
import { team } from "../../../data/team";

const categories = ["Head Office", "Branch Office"];

const OurTeamPage = () => {
  return (
    <section className="container py-24">
      <h1 className="text-5xl text-primary flex justify-center items-center mb-12">
        Meet Our Team
      </h1>
      {categories.map((category) => (
        <div key={category} className="mb-16">
          <h2 className="text-4xl text-primary mb-8">{category}</h2>
          <div className="flex flex-col gap-16">
            {team
              .filter((member) => member.category === category)
              .map((member, index) => (
                <div
                  key={member.id}
                  className={`flex flex-col ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center gap-8`}
                >
                  <div className="relative w-full md:w-[40%] overflow-hidden rounded-md">
                    <Image
                      width={300}
                      height={300}
                      src={member.image}
                      alt={member.name}
                      className="object-cover object-center w-full h-full"
                    />
                  </div>
                  <div className="md:w-1/2 flex flex-col gap-6">
                    <h2 className="text-2xl font-semibold">{member.name}</h2>
                    <p className="text-xl text-gray-600">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                    <Link href={`/ourteam/${member.id}`}>
                      <button className="bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md transition-all duration-300">
                        View Profile
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default OurTeamPage;