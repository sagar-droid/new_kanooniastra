import type { Metadata } from "next";
import { team } from "../../../../data/team";
import TeamMemberClient from "../../../components/TeamMemberClient";

export async function generateStaticParams() {
  return team.map((member) => ({
    id: member.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const member = team.find((m) => m.id === parseInt(params.id));

  if (!member) {
    return { title: "Team Member Not Found" };
  }

  const description = member.bio.replace(/\s+/g, " ").trim().slice(0, 155);

  return {
    title: `${member.name} — ${member.role}`,
    description,
    alternates: { canonical: `/ourteam/${member.id}` },
    openGraph: {
      title: `${member.name} — ${member.role}`,
      description,
      images: [{ url: member.image }],
    },
  };
}

const TeamMemberPage = ({ params }: { params: { id: string } }) => {
  const member = team.find((m) => m.id === parseInt(params.id));

  if (!member) {
    return <div>Team member not found.</div>;
  }

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.role,
    worksFor: {
      "@type": "LegalService",
      name: "Kanooni Astra",
      url: "https://kanooniastra.com",
    },
    ...(member.email !== "N/A" ? { email: member.email } : {}),
    image: `https://kanooniastra.com${member.image}`,
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <TeamMemberClient member={member} />
    </div>
  );
};

export default TeamMemberPage;
