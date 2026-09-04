import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { team } from "../../../../data/team";
import TeamMemberClient from "../../../components/TeamMemberClient";

const siteUrl = "https://kanooniastra.com";

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
    notFound();
  }

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.role,
    description: member.details,
    url: `${siteUrl}/ourteam/${member.id}`,
    worksFor: {
      "@type": "LegalService",
      name: "Kanooni Astra",
      url: siteUrl,
    },
    ...(member.email !== "N/A" ? { email: member.email } : {}),
    ...(member.contact !== "N/A" ? { telephone: member.contact } : {}),
    image: `${siteUrl}${member.image}`,
    alumniOf: member.education.map((edu) => ({
      "@type": "EducationalOrganization",
      name: edu,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Our Team", item: `${siteUrl}/ourteam` },
      { "@type": "ListItem", position: 2, name: member.name, item: `${siteUrl}/ourteam/${member.id}` },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <TeamMemberClient member={member} />
    </div>
  );
};

export default TeamMemberPage;
