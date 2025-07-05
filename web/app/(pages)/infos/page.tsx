// import ContentInfos from "@/app/components/ContentInfos";
import ContentInfos from "@/app/components/ContentInfos";
import website from "@/app/config/website";
import { getInfos, infosQuery } from "@/app/sanity-api/sanity-queries";
import { getClient } from "@/app/sanity-api/sanity.client";
import { Infos } from "@/app/types/schema";
// import { Infos, Page } from "@/app/types/schema";
// import { getClient } from "@/app/utils/sanity-client";
// import { getInfos, infosQuery } from "@/app/utils/sanity-queries";
// import { _localizeField } from "@/app/utils/utils";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getInfos();
  return {
    title: `${data?.seo?.metaTitle || data?.title?.fr || ""}`,
    description: data?.seo?.metaDescription,
    openGraph: {
      images: data?.seo?.metaImage?.asset.url || website.image,
    },
  };
}

const InfosPage = async function Page() {
  const { isEnabled } = await draftMode();
  let data: Infos;
  if (isEnabled) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      infosQuery
    );
  } else {
    data = (await getInfos()) as Infos;
  }

  if (!data) return <div>please edit page</div>;
  return (
    <div className='template template--infos' data-template='infos'>
      <div className=''>
        <ContentInfos input={data} />

        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </div>
    </div>
  );
};

export default InfosPage;
