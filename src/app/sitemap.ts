import type { MetadataRoute } from "next";
import { services as fallbackServices } from "../../data/services";
import { connectToDatabase } from "@/lib/mongodb";
import ServiceModel from "@/models/Service";
import TeamMemberModel from "@/models/TeamMember";
import BlogPostModel from "@/models/BlogPost";
import CaseStudyModel from "@/models/CaseStudy";
import PageModel from "@/models/Page";

export const revalidate = 3600;

const baseUrl = "https://kanooniastra.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connectToDatabase();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/aboutus`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/our-services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/ourteam`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/careers`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contactus`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/case-studies`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/testimonials`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/faq`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const [dbServices, teamMembers, blogPosts, caseStudies, pages] = await Promise.all([
    ServiceModel.find({ status: "published" }).select("slug updatedAt").lean(),
    TeamMemberModel.find({ status: "published" }).select("slug").lean(),
    BlogPostModel.find({ status: "published" }).select("slug updatedAt").lean(),
    CaseStudyModel.find({ status: "published" }).select("slug updatedAt").lean(),
    PageModel.find({ status: "published" }).select("slug updatedAt").lean(),
  ]);

  const serviceList =
    dbServices.length > 0
      ? dbServices.map((s) => ({ slug: s.slug, updatedAt: s.updatedAt }))
      : fallbackServices.map((s) => ({ slug: s.id, updatedAt: undefined }));

  const serviceRoutes: MetadataRoute.Sitemap = serviceList.map((service) => ({
    url: `${baseUrl}/our-services/${service.slug}`,
    lastModified: service.updatedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const teamRoutes: MetadataRoute.Sitemap = teamMembers.map((member) => ({
    url: `${baseUrl}/ourteam/${member.slug}`,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((caseStudy) => ({
    url: `${baseUrl}/case-studies/${caseStudy.slug}`,
    lastModified: caseStudy.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const pageRoutes: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: page.updatedAt,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...teamRoutes,
    ...blogRoutes,
    ...caseStudyRoutes,
    ...pageRoutes,
  ];
}
