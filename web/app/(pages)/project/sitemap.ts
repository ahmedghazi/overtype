import website from "@/app/config/website";
import {
  getAllProducts,
  getAllProjects,
} from "@/app/sanity-api/sanity-queries";
import { _linkResolver } from "@/app/sanity-api/utils";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const items = await getAllProjects();

  return items.map((item) => ({
    url: `${website.url}${_linkResolver(item)}`,
    lastModified: item._updatedAt,
  }));
}
