import React from "react";
import website from "@/app/config/website";
import { getClient } from "@/app/sanity-api/sanity-client";
import {
  getProduct,
  getProject,
  PRODUCT_QUERY,
} from "@/app/sanity-api/sanity-queries";
import { Product, Project } from "@/app/types/schema";
import { Metadata, NextPage } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import ContentProduct from "@/app/components/ContentProduct";

type Params = Promise<{ slug: string }>;

type PageProps = {
  params: Params;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getProduct(slug);
  return {
    title: `${data?.seo?.metaTitle || data?.title || ""}`,
    description: data?.seo?.metaDescription,
    openGraph: {
      images: data?.seo?.metaImage?.asset.url || website.image,
    },
  };
}

const ProjectPage: NextPage<PageProps> = async ({ params }) => {
  // const ProjectPage = async function Page({ params }: PageProps) {
  // const ProjectPage: ({ params }: PageProps) => Promise<JSX.Element> = async ({
  //   params,
  // }) => {
  const { isEnabled } = await draftMode();
  const { slug } = await params;
  let data: Product;
  if (isEnabled) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      PRODUCT_QUERY,
      params
    );
  } else {
    data = (await getProduct(slug)) as Product;
  }

  if (!data) return notFound();

  return (
    <div className='template template--product' data-template='product'>
      <ContentProduct input={data} />
    </div>
  );
};

export default ProjectPage;
