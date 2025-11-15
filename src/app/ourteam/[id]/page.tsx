import { team } from "../../../../data/team";
import TeamMemberClient from "../../../components/TeamMemberClient";

export async function generateStaticParams() {
  return team.map((member) => ({
    id: member.id.toString(),
  }));
}

const TeamMemberPage = ({ params }: { params: { id: string } }) => {
  const member = team.find((m) => m.id === parseInt(params.id));

  if (!member) {
    return <div>Team member not found.</div>;
  }
  return (
    <div>
      <TeamMemberClient member={member} />
    </div>
  );
};

export default TeamMemberPage;
