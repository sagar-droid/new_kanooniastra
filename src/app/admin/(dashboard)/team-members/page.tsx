import Link from "next/link";
import type { Metadata } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import TeamMemberModel from "@/models/TeamMember";
import DeleteButton from "@/components/admin/DeleteButton";

export const metadata: Metadata = {
  title: "Team Members",
  robots: { index: false, follow: false },
};

const PAGE_SIZE = 20;

interface TeamMembersPageProps {
  searchParams: { q?: string; status?: string; page?: string };
}

const TeamMembersPage = async ({ searchParams }: TeamMembersPageProps) => {
  await connectToDatabase();

  const page = Math.max(1, Number(searchParams.page) || 1);
  const filter: Record<string, unknown> = {};
  if (searchParams.q) filter.name = { $regex: searchParams.q, $options: "i" };
  if (searchParams.status === "draft" || searchParams.status === "published") {
    filter.status = searchParams.status;
  }

  const [items, total] = await Promise.all([
    TeamMemberModel.find(filter)
      .sort({ displayOrder: 1 })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean(),
    TeamMemberModel.countDocuments(filter),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-primary">Team Members</h1>
        <Link
          href="/admin/team-members/new"
          className="rounded-md bg-primary px-4 py-2 text-sm text-white hover:bg-primary/90"
        >
          New Team Member
        </Link>
      </div>

      <form method="GET" className="mb-6 flex flex-wrap gap-3">
        <input
          type="text"
          name="q"
          defaultValue={searchParams.q}
          placeholder="Search by name…"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
        <select
          name="status"
          defaultValue={searchParams.status ?? ""}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="">All statuses</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <button type="submit" className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100">
          Filter
        </button>
      </form>

      <div className="overflow-hidden rounded-md border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 whitespace-nowrap">Name</th>
                <th className="px-4 py-3 whitespace-nowrap">Designation</th>
                <th className="px-4 py-3 whitespace-nowrap">Order</th>
                <th className="px-4 py-3 whitespace-nowrap">Status</th>
                <th className="px-4 py-3 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={String(item._id)} className="border-t border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{item.designation}</td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{item.displayOrder}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        item.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex gap-3">
                      <Link
                        href={`/admin/team-members/${item._id}/edit`}
                        className="text-sm text-primary hover:underline"
                      >
                        Edit
                      </Link>
                      <DeleteButton
                        endpoint={`/api/admin/team-members/${item._id}`}
                        confirmMessage={`Delete "${item.name}"? This cannot be undone.`}
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                    No team members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex gap-2">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <Link
              key={pageNumber}
              href={{ pathname: "/admin/team-members", query: { ...searchParams, page: pageNumber } }}
              className={`rounded-md border px-3 py-1 text-sm ${
                pageNumber === page
                  ? "border-primary bg-primary text-white"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {pageNumber}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamMembersPage;
