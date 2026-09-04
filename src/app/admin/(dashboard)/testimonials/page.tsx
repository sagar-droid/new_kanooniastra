import Link from "next/link";
import type { Metadata } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import TestimonialModel from "@/models/Testimonial";
import DeleteButton from "@/components/admin/DeleteButton";

export const metadata: Metadata = {
  title: "Testimonials",
  robots: { index: false, follow: false },
};

const PAGE_SIZE = 10;

interface TestimonialsPageProps {
  searchParams: { status?: string; page?: string };
}

const TestimonialsPage = async ({ searchParams }: TestimonialsPageProps) => {
  await connectToDatabase();

  const page = Math.max(1, Number(searchParams.page) || 1);
  const filter: Record<string, unknown> = {};
  if (searchParams.status === "approved" || searchParams.status === "pending") {
    filter.status = searchParams.status;
  }

  const [items, total] = await Promise.all([
    TestimonialModel.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean(),
    TestimonialModel.countDocuments(filter),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-primary">Testimonials</h1>
        <Link
          href="/admin/testimonials/new"
          className="rounded-md bg-primary px-4 py-2 text-sm text-white hover:bg-primary/90"
        >
          New Testimonial
        </Link>
      </div>

      <form method="GET" className="mb-6 flex flex-wrap gap-3">
        <select
          name="status"
          defaultValue={searchParams.status ?? ""}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
        </select>
        <button type="submit" className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100">
          Filter
        </button>
      </form>

      <div className="overflow-hidden rounded-md border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Quote</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={String(item._id)} className="border-t border-gray-100">
                <td className="px-4 py-3 font-medium text-gray-900">{item.clientName}</td>
                <td className="max-w-md truncate px-4 py-3 text-gray-600">{item.quote}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      item.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/testimonials/${item._id}/edit`}
                      className="text-sm text-primary hover:underline"
                    >
                      Edit
                    </Link>
                    <DeleteButton
                      endpoint={`/api/admin/testimonials/${item._id}`}
                      confirmMessage={`Delete this testimonial from "${item.clientName}"? This cannot be undone.`}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                  No testimonials found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex gap-2">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <Link
              key={pageNumber}
              href={{ pathname: "/admin/testimonials", query: { ...searchParams, page: pageNumber } }}
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

export default TestimonialsPage;
