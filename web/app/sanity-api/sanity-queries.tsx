import { groq } from "next-sanity";
import { sanityFetch } from "./sanity.client";
import {
  Home,
  Infos,
  PageModulaire,
  Product,
  Project,
  Settings,
} from "../types/schema";
import {
  blockContent,
  figure,
  inUseCard,
  modules,
  productCard,
  projectCard,
  seo,
} from "./fragments";
// import { revalidatePath } from "next/cache";

/*****************************************************************************************************
 * SETTINGS
 */
export const settingsQuery = groq`*[_type == "settings"][0]{
  ...,

  navPrimary[]{
    ...,
    _type == 'linkInternal' => {
      ...,
      link->{
        _type,
        slug,
      },
      subMenu[]{
        ...,
        _type == 'linkInternal' => {
          ...,
          link->{
            _type,
            slug,
          },
        }
      }
    },

  },
  navSecondary[]{
    ...,
    items[]{
      ...,
      _type == 'linkInternal' => {
        ...,
        link->{
          _type,
          slug,
        },
      },
    }
  },
  shopPage->{
    _type,
    slug
  },
  messageDialogBuy{
    ${blockContent}
  },
  messagemCookie{
    ${blockContent}
  },
  message404{
    ${blockContent}
  },
  textOptin{
    ${blockContent}
  }
}`;

export async function getSettings(): Promise<Settings> {
  return sanityFetch({
    query: settingsQuery,
    tags: ["settings"],
  });
  // return client.fetch(

  // );
}

/*****************************************************************************************************
 * Home
 */

export const HOME_QUERY = groq`*[_type == "pageModulaire" && homePage == true][0]{
  ...,
  seo{
    ${seo}
  },
  modules[]{
    ${modules}
  },

}`;

export async function getHome(): Promise<PageModulaire> {
  return sanityFetch({
    query: HOME_QUERY,
    tags: ["home"],
  });
}

/*****************************************************************************************************
 * INFOS
 */
export const INFOS_QUERY = groq`*[_type == "infos"][0]{
  ...,
  seo{
    ${seo}
  },
  // modules[]{
  //   ${modules}
  // }
}`;

export async function getInfos(): Promise<Infos> {
  return sanityFetch({
    query: INFOS_QUERY,
    tags: ["infos"],
  });
}

/*****************************************************************************************************
 * PAGE MODULAIRE
 */
export const PAGE_MODULAIRE_QUERY = groq`*[_type == "pageModulaire" && slug.current == $slug][0]{
  ...,
  seo{
    ${seo}
  },
  hero{
    ...,
    ${figure}
  },
  modules[]{
    ${modules}
  }
}`;

export async function getPageModulaire(slug: string): Promise<PageModulaire> {
  return sanityFetch({
    query: PAGE_MODULAIRE_QUERY,
    tags: ["pageModulaire"],
    qParams: { slug: slug },
  });
  // return cachedClient(pageModulaireQuery, { slug: slug });
}

/*****************************************************************************************************
 * PRODUCT
 */
export const PRODUCT_QUERY = groq`*[_type == "product" && slug.current == $slug][0]{
  ...,
  seo{
    ${seo}
  },
  hero[]{
    ...,
    ${figure}
  },
  bundles[]{
    ...,
  },
  singles[]{
    // ...,
    _key,
    sku,
    title,
    price,
    discount,
    isDefault,
    // typeface->,
    typeface->{
      title,
      slug,
      typefaceFile{
        base64
      },
      icon{
        asset->{
          url
        }
      }
    },
    relatedTypeface->{
      slug
    }
  },
  text{
    ${blockContent}
  },
  images[]{
    ...,
    mosaicItem->{
      ${figure}
    }
  },
  inUse[]{
    ${inUseCard}
  },
  related[]->{
    ${productCard}
  }
}`;

export async function getProduct(slug: string): Promise<Product> {
  return sanityFetch({
    query: PRODUCT_QUERY,
    tags: ["product"],
    qParams: { slug: slug },
  });
}

/*****************************************************************************************************
 * PROJECT
 */
export const PROJECT_QUERY = groq`*[_type == "project" && slug.current == $slug][0]{
  ...,
  seo{
    ${seo}
  },
  hero{
    ...,
    ${figure}
  },
  modules[]{
    ${modules}
  },
  nextProject->{
    _type,
    slug
  },
  related[]->{
    ${projectCard}
  }
}`;

export async function getProject(slug: string): Promise<Project> {
  return sanityFetch({
    query: PROJECT_QUERY,
    tags: ["project"],
    qParams: { slug: slug },
  });
}
