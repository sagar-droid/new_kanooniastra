import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { FiPlus, FiExternalLink } from "react-icons/fi";
import { connectToDatabase } from "@/lib/mongodb";
import ServiceModel from "@/models/Service";
import DeleteButton from "@/components/admin/DeleteButton";

export const metadata: Metadata = {
  title: "Services Management",
  robots: { index: false, follow: false },
};

const PAGE_SIZE = 20;

interface ServicesPageProps {
  searchParams: { q?: string; status?: string; page?: string };
}

const ServicesAdminPage = async ({ searchParams }: ServicesPageProps) => {
  await connectToDatabase();

  const page = Math.max(1, Number(searchParams.page) || 1);
  const filter: Record<string, unknown> = {};
  if (searchParams.q) {
    filter.$or = [
      { title: { $regex: searchParams.q, $options: "i" } },
      { slug: { $regex: searchParams.q, $options: "i" } },
    ];
  }
  if (searchParams.status === "draft" || searchParams.status === "published") {
    filter.status = searchParams.status;
  }

  const [items, total] = await Promise.all([
    ServiceModel.find(filter)
      .sort({ displayOrder: 1, createdAt: 1 })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean(),
    ServiceModel.countDocuments(filter),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Legal Services</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage practice areas and services. Each service layout includes the static direct consultation sidebar.
          </p>
        </div>
        <Link
          href="/admin/services/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 transition-colors"
        >
          <FiPlus />
          <span>New Service</span>
        </Link>
      </div>

      <form method="GET" className="mb-6 flex flex-wrap gap-3">
        <input
          type="text"
          name="q"
          defaultValue={searchParams.q}
          placeholder="Search by title or slug…"
          className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
        />
        <select
          name="status"
          defaultValue={searchParams.status ?? ""}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none bg-white"
        >
          <option value="">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <button
          type="submit"
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Filter
        </button>
      </form>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600 border-b border-gray-100">
            <tr>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Scope Items</th>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item) => (
              <tr key={String(item._id)} className="hover:bg-gray-50/70 transition-colors">
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-12 flex-shrink-0 overflow-hidden rounded bg-gray-50 border border-gray-200">
                      {item.image?.url && (
                        <Image
                          src={item.image.url}
                          alt={item.image.alt || item.title}
                          fill
                          className="object-contain p-1"
                        />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{item.title}</p>
                      <p className="text-xs text-gray-500 line-clamp-1 max-w-xs">{item.intro}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5 font-mono text-xs text-gray-600">
                  /our-services/{item.slug}
                </td>
                <td className="px-4 py-3.5 text-gray-600">
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                    {item.description?.length || 0} items
                  </span>
                </td>
                <td className="px-4 py-3.5 text-gray-600">{item.displayOrder}</td>
                <td className="px-4 py-3.5">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      item.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/our-services/${item.slug}`}
                      target="_blank"
                      className="text-gray-500 hover:text-primary transition-colors flex items-center gap-1 text-xs"
                      title="View public page"
                    >
                      <FiExternalLink />
                      <span>View</span>
                    </Link>
                    <Link
                      href={`/admin/services/${item._id}/edit`}
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      Edit
                    </Link>
                    <DeleteButton
                      endpoint={`/api/admin/services/${item._id}`}
                      confirmMessage={`Delete "${item.title}" service? This will remove it from the website.`}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No services found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-5 flex gap-2">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <Link
              key={pageNumber}
              href={{ pathname: "/admin/services", query: { ...searchParams, page: pageNumber } }}
              className={`rounded-md border px-3 py-1 text-sm font-medium ${
                pageNumber === page
                  ? "border-primary bg-primary text-white"
                  : "border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
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

export default ServicesAdminPage;
