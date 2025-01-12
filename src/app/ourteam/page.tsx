import React from "react";
import Link from "next/link";
import Image from "next/image";
import { team } from "../../../data/team";
// import { Button } from "@/components/ui/button";

const OurTeamPage = () => {
  return (
    <section className="container py-24">
      <h1 className="text-5xl text-primary flex justify-center items-center mb-12">
        Meet Our Team
      </h1>
      <div className="flex justify-center gap-12 flex-wrap">
        {team.map((member) => (
          <div
            key={member.id}
            className="rounded-lg border border-gray-200 p-4 w-[300px] hover:shadow-lg transition-all duration-300">
            <div className="overflow-hidden rounded-md h-64 mb-4">
              <Image
                width={300}
                height={300}
                src={member.image}
                alt={member.name}
                className="object-cover object-top w-full h-full"
              />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">{member.name}</h2>
              <p className="text-xl text-gray-600">{member.role}</p>
              <p className="text-gray-600 line-clamp-3">{member.bio}</p>
              <div className="pt-4">
                <Link href={`/ourteam/${member.id}`}>
                  <button className="w-full bg-primary hover:bg-primary/90 text-white">
                    View Profile
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurTeamPage;
