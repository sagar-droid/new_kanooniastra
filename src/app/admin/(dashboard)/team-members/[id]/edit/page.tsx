import type { Metadata } from "next";
import { notFound } from "next/navigation";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import TeamMemberModel from "@/models/TeamMember";
import TeamMemberForm from "@/components/admin/TeamMemberForm";

export const metadata: Metadata = {
  title: "Edit Team Member",
  robots: { index: false, follow: false },
};

const EditTeamMemberPage = async ({ params }: { params: { id: string } }) => {
  if (!mongoose.isValidObjectId(params.id)) notFound();

  await connectToDatabase();
  const item = await TeamMemberModel.findById(params.id).lean();
  if (!item) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="mb-6 text-2xl font-semibold text-primary">Edit Team Member</h1>
      <TeamMemberForm
        memberId={String(item._id)}
        initialValues={{
          name: item.name,
          slug: item.slug,
          designation: item.designation,
          photo: item.photo,
          bio: item.bio,
          qualifications: item.qualifications.join(", "),
          practiceAreas: item.practiceAreas.join(", "),
          officeLocation: item.officeLocation ?? "",
          email: item.email ?? "",
          phone: item.phone ?? "",
          facebook: item.socialLinks?.facebook ?? "",
          linkedin: item.socialLinks?.linkedin ?? "",
          instagram: item.socialLinks?.instagram ?? "",
          twitter: item.socialLinks?.twitter ?? "",
          displayOrder: item.displayOrder,
          status: item.status,
        }}
      />
    </div>
  );
};

export default EditTeamMemberPage;
