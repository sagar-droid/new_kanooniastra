import type { Metadata } from "next";
import TeamMemberForm from "@/components/admin/TeamMemberForm";

export const metadata: Metadata = {
  title: "New Team Member",
  robots: { index: false, follow: false },
};

const NewTeamMemberPage = () => (
  <div className="mx-auto max-w-3xl px-6 py-10">
    <h1 className="mb-6 text-2xl font-semibold text-primary">New Team Member</h1>
    <TeamMemberForm />
  </div>
);

export default NewTeamMemberPage;
