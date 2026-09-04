import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import TeamMemberModel from "@/models/TeamMember";
import TeamMemberClient from "../../../components/TeamMemberClient";

export const revalidate = 3600;

export async function generateStaticParams() {
  await connectToDatabase();
  const members = await TeamMemberModel.find({ status: "published" }).select("slug").lean();
  return members.map((member) => ({ id: member.slug }));
}

async function getMember(slug: string) {
  await connectToDatabase();
  return TeamMemberModel.findOne({ slug, status: "published" }).lean();
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const member = await getMember(params.id);

  if (!member) {
    return { title: "Team Member Not Found" };
  }

  const description = member.bio.replace(/\s+/g, " ").trim().slice(0, 155);

  return {
    title: `${member.name} — ${member.designation}`,
    description,
    alternates: { canonical: `/ourteam/${member.slug}` },
    openGraph: {
      title: `${member.name} — ${member.designation}`,
      description,
      images: [{ url: member.photo.url }],
    },
  };
}

const TeamMemberPage = async ({ params }: { params: { id: string } }) => {
  const member = await getMember(params.id);

  if (!member) {
    notFound();
  }

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.designation,
    worksFor: {
      "@type": "LegalService",
      name: "Kanooni Astra",
      url: "https://kanooniastra.com",
    },
    ...(member.email ? { email: member.email } : {}),
    image: `https://kanooniastra.com${member.photo.url}`,
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <TeamMemberClient
        member={{
          name: member.name,
          image: member.photo.url,
          role: member.designation,
          bio: member.bio,
          email: member.email,
          contact: member.phone,
          education: member.qualifications,
        }}
      />
    </div>
  );
};

export default TeamMemberPage;
