import ContentModulaire from "@/app/components/ContentModulaire";
import website from "@/app/config/website";
import { getClient } from "@/app/sanity-api/sanity-client";
import {
  getPageModulaire,
  PAGE_MODULAIRE_QUERY,
} from "@/app/sanity-api/sanity-queries";
import { PageModulaire } from "@/app/types/schema";

import { Metadata, NextPage } from "next";
import { draftMode } from "next/headers";
import React from "react";

type Params = Promise<{ slug: string }>;

type PageProps = {
  params: Params;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPageModulaire(slug);
  return {
    title: `${data?.seo?.metaTitle || data?.title || ""}`,
    description: data?.seo?.metaDescription,
    openGraph: {
      images: data?.seo?.metaImage?.asset.url || website.image,
    },
  };
}

const TemplatePageModulaire: NextPage<PageProps> = async ({ params }) => {
  // const ProjectPage = async function Page({ params }: PageProps) {
  // const ProjectPage: ({ params }: PageProps) => Promise<JSX.Element> = async ({
  //   params,
  // }) => {
  const { isEnabled } = await draftMode();
  const { slug } = await params;
  let data: PageModulaire;
  if (isEnabled) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      PAGE_MODULAIRE_QUERY,
      params
    );
  } else {
    data = (await getPageModulaire(slug)) as PageModulaire;
  }

  if (!data) return <div>please edit page</div>;
  return (
    <div
      className='template template--page-modulaire'
      data-template='page-modulaire'>
      <ContentModulaire input={data} />
    </div>
  );
};

export default TemplatePageModulaire;
