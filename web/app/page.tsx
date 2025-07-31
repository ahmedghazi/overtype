import { draftMode } from "next/headers";
import { Metadata } from "next";
import website from "./config/website";
import { getHome, HOME_QUERY } from "./sanity-api/sanity-queries";
import { PageModulaire } from "./types/schema";
import { getClient } from "./sanity-api/sanity-client";
import { notFound } from "next/navigation";
import ContentModulaire from "./components/ContentModulaire";
import ContentLanding from "./components/ContentLanding";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHome();
  return {
    title: `${data?.seo?.metaTitle || data?.title?.en || ""}`,
    description: data?.seo?.metaDescription,
    openGraph: {
      images: data?.seo?.metaImage?.asset.url || website.image,
    },
  };
}

const HomePage = async function Page() {
  const { isEnabled } = await draftMode();

  let data: PageModulaire;
  if (isEnabled) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      HOME_QUERY
    );
  } else {
    data = (await getHome()) as PageModulaire;
  }

  if (!data) return notFound();
  return (
    <div
      className='template template--landing'
      data-template='landing'
      data-slug={"/"}>
      <ContentLanding />
    </div>
    // <div
    //   className='template template--home'
    //   data-template='home'
    //   data-slug={"/"}>
    //   <div className='h-4xl md:h-lg'></div>
    //   <ContentModulaire input={data} />
    // </div>
  );
};

export default HomePage;
