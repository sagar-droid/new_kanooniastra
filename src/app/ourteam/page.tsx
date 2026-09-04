import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import TeamMemberModel from "@/models/TeamMember";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the advocates and legal consultants of Kanooni Astra, serving clients from our head office and branch office in Nepal.",
  alternates: { canonical: "/ourteam" },
};

const categories = ["Head Office", "Branch Office"];

const OurTeamPage = async () => {
  await connectToDatabase();
  const team = await TeamMemberModel.find({ status: "published" })
    .sort({ displayOrder: 1 })
    .lean();

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
              .filter((member) => member.officeLocation === category)
              .map((member, index) => (
                <div
                  key={String(member._id)}
                  className={`flex flex-col ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center gap-8`}
                >
                  <div className="relative w-full md:w-[40%] overflow-hidden rounded-md">
                    <Image
                      width={300}
                      height={300}
                      src={member.photo.url}
                      alt={member.photo.alt}
                      className="object-cover object-center w-full h-full"
                    />
                  </div>
                  <div className="md:w-1/2 flex flex-col gap-6">
                    <h2 className="text-2xl font-semibold">{member.name}</h2>
                    <p className="text-xl text-gray-600">{member.designation}</p>
                    <p className="text-gray-600">{member.bio}</p>
                    <Link href={`/ourteam/${member.slug}`}>
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
