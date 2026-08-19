import type { MetadataRoute } from "next";
import { team } from "../../data/team";
import { services } from "../../data/services";

const baseUrl = "https://kanooniastra.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/aboutus`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/our-services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/ourteam`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/careers`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contactus`, changeFrequency: "yearly", priority: 0.6 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/our-services/${service.id}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const teamRoutes: MetadataRoute.Sitemap = team.map((member) => ({
    url: `${baseUrl}/ourteam/${member.id}`,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...teamRoutes];
}
