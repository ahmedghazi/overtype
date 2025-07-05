import React from "react";
import website from "@/app/config/website";
import { getClient } from "@/app/sanity-api/sanity-client";
import { getProject, projectQuery } from "@/app/sanity-api/sanity-queries";
import { Project } from "@/app/types/schema";
import { Metadata, NextPage } from "next";
import { draftMode } from "next/headers";
import ContentProject from "@/app/components/ProjectContent";
import Projects from "@/app/components/ProjectsGrid";

type Params = Promise<{ slug: string }>;

type PageProps = {
  params: Params;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getProject(slug);
  return {
    title: `${data?.seo?.metaTitle || data?.title?.fr || ""}`,
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
  let data: Project;
  if (isEnabled) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      projectQuery,
      params
    );
  } else {
    data = (await getProject(slug)) as Project;
  }

  if (!data) return <div>please edit page</div>;
  return (
    <div className='template template--project' data-template='project'>
      <ContentProject input={data} />
      {data.relatedProjects && (
        <div className='mt-xxl'>
          <Projects items={data.relatedProjects} />
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
