export declare type SanityReference<T> = T & {
  _ref: string;
};

export declare type SanityKeyedReference<T> = T & {
  _key: string;
  _ref: string;
};

import type {
  // SanityReference,
  // SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
  // SanityReference,
  // SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Home
 *
 *
 */
export interface Home extends SanityDocument {
  _type: "home";

  /**
   * seo — `seo`
   *
   *
   */
  seo?: Seo;

  /**
   * Titre — `localeString`
   *
   *
   */
  title?: LocaleString;

  /**
   * Slug — `slug`
   *
   * URL basée sur le titre (sans espace ni caractère autre que a-z-0-9
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Présentation courte — `localeBlockContent`
   *
   *
   */
  presentation?: LocaleBlockContent;

  /**
   * Projets à la une — `array`
   *
   *
   */
  featuredProjects?: Array<SanityKeyedReference<Project>>;
}

/**
 * Infos
 *
 *
 */
export interface Infos extends SanityDocument {
  _type: "infos";

  /**
   * seo — `seo`
   *
   *
   */
  seo?: Seo;

  /**
   * Title — `localeString`
   *
   *
   */
  title?: LocaleString;

  /**
   * Slug — `slug`
   *
   * URL based on the title (no space, or char other than a-z-0-9
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Chapo — `localeBlockContent`
   *
   *
   */
  chapo?: LocaleBlockContent;

  /**
   * Texte — `localeBlockContent`
   *
   *
   */
  text?: LocaleBlockContent;
}

/**
 * Réglages (header, footer, ...)
 *
 *
 */
export interface Settings extends SanityDocument {
  _type: "settings";

  /**
   * Nom du site — `string`
   *
   *
   */
  siteName?: string;

  /**
   * Description — `blockContent`
   *
   * Visible en page d'accueil header
   */
  description?: BlockContent;

  /**
   * Naviguation Primary — `array`
   *
   *
   */
  navPrimary?: Array<SanityKeyed<LinkInternal> | SanityKeyed<LinkExternal>>;

  /**
   * Naviguation Secondary — `array`
   *
   *
   */
  navSecondary?: Array<SanityKeyed<LinkGroup>>;

  /**
   * Footer CTA — `localeBlockContent`
   *
   *
   */
  footerCta?: LocaleBlockContent;

  /**
   * shopPage — `reference`
   *
   * Shop page (view all)
   */
  shopPage?: SanityReference<PageModulaire>;

  /**
   * licenses — `array`
   *
   * Global Licenses calculation
   */
  licenses?: Array<SanityKeyed<LicenseType>>;

  /**
   * Message 404 — `blockContent`
   *
   *
   */
  message404?: BlockContent;

  /**
   * customCss — `text`
   *
   *
   */
  customCss?: string;
}

/**
 * Page Modulaire
 *
 *
 */
export interface PageModulaire extends SanityDocument {
  _type: "pageModulaire";

  /**
   * seo — `seo`
   *
   *
   */
  seo?: Seo;

  /**
   * homePage — `boolean`
   *
   *
   */
  homePage?: boolean;

  /**
   * Titre — `localeString`
   *
   * Le nom de la page
   */
  title?: LocaleString;

  /**
   * Titre XL — `boolean`
   *
   * ex sur FAQ
   */
  titleXL?: boolean;

  /**
   * Soustitre — `localeString`
   *
   *
   */
  subTitle?: LocaleString;

  /**
   * Slug — `slug`
   *
   * URL basée sur le titre (sans espace ni caractère autre que a-z-0-9
   */
  slug?: { _type: "slug"; current: string };

  /**
   * hero — `figure`
   *
   *
   */
  hero?: Figure;

  /**
   * Modules — `array`
   *
   * Zone de contenu Modulaire (images, textes, embed)
   */
  modules?: Array<
    | SanityKeyed<TextUI>
    | SanityKeyed<ImagesUI>
    | SanityKeyed<ProductsUI>
    | SanityKeyed<SliderStoriesUI>
    | SanityKeyed<ProjectsUI>
    | SanityKeyed<FontsInUseUI>
  >;
}

/**
 * Project
 *
 *
 */
export interface Project extends SanityDocument {
  _type: "project";

  /**
   * seo — `seo`
   *
   *
   */
  seo?: Seo;

  /**
   * Titre — `localeString`
   *
   *
   */
  title?: LocaleString;

  /**
   * Slug — `slug`
   *
   * URL basée sur le titre (sans espace ni caractère autre que a-z-0-9
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Soustitre — `string`
   *
   *
   */
  subTitle?: string;

  /**
   * Année — `string`
   *
   *
   */
  year?: string;

  /**
   * Tags — `array`
   *
   *
   */
  tags?: Array<SanityKeyedReference<Tag>>;

  /**
   * Image clef — `image`
   *
   * Visible on liste pages, project cards (largeur 1400px)
   */
  imageCover?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Chapo — `localeBlockContent`
   *
   *
   */
  chapo?: LocaleBlockContent;

  /**
   * fiche technique — `array`
   *
   *
   */
  metas?: Array<SanityKeyed<KeyVal>>;

  /**
   * Texte — `localeBlockContent`
   *
   *
   */
  text?: LocaleBlockContent;

  /**
   * Modules — `array`
   *
   * Zone de contenu Modulaire (images, textes, embed)
   */
  modules?: Array<
    | SanityKeyed<TextUI>
    | SanityKeyed<ImagesUI>
    | SanityKeyed<ProductsUI>
    | SanityKeyed<SliderStoriesUI>
    | SanityKeyed<ProjectsUI>
    | SanityKeyed<FontsInUseUI>
  >;
}

/**
 * Tag
 *
 *
 */
export interface Tag extends SanityDocument {
  _type: "tag";

  /**
   * Title — `localeString`
   *
   *
   */
  title?: LocaleString;

  /**
   * Slug — `slug`
   *
   * URL basée sur le titre (sans espace ni caractère autre que a-z-0-9
   */
  slug?: { _type: "slug"; current: string };
}

/**
 * Product
 *
 *
 */
export interface Product extends SanityDocument {
  _type: "product";

  /**
   * seo — `seo`
   *
   *
   */
  seo?: Seo;

  /**
   * Sup Title — `string`
   *
   *
   */
  supTitle?: string;

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   * Click on generate, Semantic URL based on title (no space no char other than a-z-0-9
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Sub Title — `string`
   *
   *
   */
  subTitle?: string;

  /**
   * Tag — `reference`
   *
   *
   */
  tag?: SanityReference<Tag>;

  /**
   * Background — `color`
   *
   * used on list pages
   */
  background?: Color;

  /**
   * Foreground — `color`
   *
   * used on list pages
   */
  foreground?: Color;

  /**
   * hero — `figure`
   *
   *
   */
  hero?: Figure;

  /**
   * text — `localeBlockContent`
   *
   *
   */
  text?: LocaleBlockContent;

  /**
   * images — `array`
   *
   *
   */
  images?: Array<SanityKeyed<MosaicItem>>;

  /**
   * metadata — `array`
   *
   *
   */
  metadata?: Array<SanityKeyed<string>>;

  /**
   * Bundles — `array`
   *
   *
   */
  bundles?: Array<SanityKeyed<ProductBundle>>;

  /**
   * Default Typeface — `reference`
   *
   * used for shop, also used to display typeface in frontend, product card, related
   */
  defaultTypeface?: SanityReference<Typeface>;

  /**
   * singles — `array`
   *
   * used for shop, also used to display typeface in frontend
   */
  singles?: Array<SanityKeyed<ProductSingle>>;

  /**
   * Blurb — `string`
   *
   * short description for the cart
   */
  blurb?: string;

  /**
   * Related Products — `array`
   *
   *
   */
  related?: Array<SanityKeyedReference<Product>>;

  /**
   * Custom css — `text`
   *
   *
   */
  customCSS?: string;
}

/**
 * Typeface
 *
 *
 */
export interface Typeface extends SanityDocument {
  _type: "typeface";

  /**
   * Title — `string`
   *
   * Title + Style: Neue Haas Regular
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   * Click on generate, Semantic URL based on title (no space no char other than a-z-0-9
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Style — `string`
   *
   * Tell the website what is the style of the typeface, used in the typefaces menu, in the typeface page introduction, in bundles
   */
  style?:
    | "hairline"
    | "hairlineItalic"
    | "thin"
    | "thinItalic"
    | "extraLight"
    | "extraLightItalic"
    | "light"
    | "lightItalic"
    | "book"
    | "bookItalic"
    | "regular"
    | "regularItalic"
    | "medium"
    | "mediumItalic"
    | "semiBold"
    | "semiBoldItalic"
    | "bold"
    | "boldItalic"
    | "extraBold"
    | "extraBoldItalic"
    | "black"
    | "blackItalic"
    | "ultraBlack"
    | "ultraBlackItalic"
    | "superBlack"
    | "superBlackItalic";

  /**
   * File — `typefaceFile`
   *
   * Upload otf, the click Generate base64. For the front end (to prevent people from stealing it)
   */
  typefaceFile?: TypefaceFile;

  /**
   * stylisticSets — `array`
   *
   *
   */
  stylisticSets?: Array<SanityKeyed<KeyValString>>;

  /**
   * scriptsSupporter — `array`
   *
   *
   */
  scriptsSupporter?: Array<SanityKeyed<string>>;
}

/**
 * Order
 *
 *
 */
export interface Order extends SanityDocument {
  _type: "order";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Invoice Number — `string`
   *
   *
   */
  invoiceNumber?: string;

  /**
   * dateTime — `date`
   *
   *
   */
  creationDate?: string;

  /**
   * email — `string`
   *
   *
   */
  email?: string;

  /**
   * attachments — `array`
   *
   *
   */
  attachments?: Array<SanityKeyed<LinkExternal>>;

  /**
   * json — `text`
   *
   *
   */
  json?: string;
}

export type ProductBundle = {
  _type: "productBundle";
  /**
   * SKU — `slug`
   *
   * id unique permettanr de retrouver le produit après l'achat
   */
  sku?: { _type: "sku"; current: string };

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Description — `string`
   *
   *
   */
  description?: string;

  /**
   * Price — `number`
   *
   *
   */
  price?: number;

  /**
   * Discount — `number`
   *
   * % => save Xx%
   */
  discount?: number;

  /**
   * Typefaces — `array`
   *
   * Used in buy area (seems deprecated, will keep it for now)
   */
  typefaces?: Array<SanityKeyedReference<Typeface>>;

  /**
   * Zip Files — `file`
   *
   * Digital good client will receive
   */
  zip?: { _type: "file"; asset: SanityReference<any> };

  /**
   * Zip File Trials — `file`
   *
   * Digital good client will receive. (seems deprecated, will keep it for now)
   */
  zipTrials?: { _type: "file"; asset: SanityReference<any> };
};

export type ProductSingle = {
  _type: "productSingle";
  /**
   * SKU — `slug`
   *
   * id unique permettanr de retrouver le produit après l'achat
   */
  sku?: { _type: "sku"; current: string };

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * isDefault — `boolean`
   *
   * use as default preview in homepage or elsewhere
   */
  isDefault?: boolean;

  /**
   * Description — `string`
   *
   *
   */
  description?: string;

  /**
   * Price — `number`
   *
   *
   */
  price?: number;

  /**
   * Discount — `number`
   *
   * % => save Xx%
   */
  discount?: number;

  /**
   * Typeface — `reference`
   *
   * Used in typefaces, product page, trials, buy area
   */
  typeface?: SanityReference<Typeface>;

  /**
   * relatedTypeface — `reference`
   *
   * Used to look for the regular version of the italic, to apply the discount if regular is selected
   */
  relatedTypeface?: SanityReference<Typeface>;

  /**
   * Zip File — `file`
   *
   * Digital good client will receive
   */
  zip?: { _type: "file"; asset: SanityReference<any> };

  /**
   * Zip File Trials — `file`
   *
   * Digital good client will receive
   */
  zipTrials?: { _type: "file"; asset: SanityReference<any> };
};

export type TypefaceFile = {
  _type: "typefaceFile";
  asset: SanityReference<any>;
  /**
   * base64 — `string`
   *
   * IMPORTANT FOR THE FRONTEND
   */
  base64?: string;
};

export type LicenseType = {
  _type: "licenseType";
  /**
   * Label — `localeString`
   *
   * Displayed on front end
   */
  label?: LocaleString;

  /**
   * Price Multiplier — `number`
   *
   * will multiply bundle or single price
   */
  priceMultiplier?: number;

  /**
   * Infos — `localeString`
   *
   * Displayed on front end
   */
  infos?: LocaleString;
};

export type LicenseSize = {
  _type: "licenseSize";
  /**
   * Title — `localeString`
   *
   * Displayed on front end
   */
  title?: LocaleString;

  /**
   * Infos — `localeString`
   *
   * Displayed on front end
   */
  infos?: LocaleString;

  /**
   * licenseType — `array`
   *
   *
   */
  licenseType?: Array<SanityKeyed<LicenseType>>;
};

export type LocaleString = {
  _type: "localeString";
  /**
   * English — `string`
   *
   *
   */
  en?: string;
};

export type LocaleBlockContent = {
  _type: "localeBlockContent";
  /**
   * English — `blockContent`
   *
   *
   */
  en?: BlockContent;
};

export type BlockContent = Array<
  | SanityKeyed<SanityBlock>
  | SanityKeyed<{
      _type: "image";
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    }>
  | SanityKeyed<Accordion>
>;

export type LinkExternal = {
  _type: "linkExternal";
  /**
   * Label — `string`
   *
   *
   */
  label?: string;

  /**
   * Link — `string`
   *
   *
   */
  link?: string;
};

export type LinkInternal = {
  _type: "linkInternal";
  /**
   * label — `localeString`
   *
   *
   */
  label?: LocaleString;

  /**
   * link — `reference`
   *
   *
   */
  link?: SanityReference<PageModulaire | Product | Project>;

  /**
   * withSubmenu — `boolean`
   *
   *
   */
  withSubmenu?: boolean;

  /**
   * subMenu — `array`
   *
   *
   */
  subMenu?: Array<SanityKeyed<LinkInternal> | SanityKeyed<LinkExternal>>;
};

export type LinkGroup = {
  _type: "linkGroup";
  /**
   * Title — `localeString`
   *
   *
   */
  title?: LocaleString;

  /**
   * Items — `array`
   *
   *
   */
  items?: Array<SanityKeyed<LinkInternal> | SanityKeyed<LinkExternal>>;
};

export type Seo = {
  _type: "seo";
  /**
   * Meta title — `string`
   *
   *
   */
  metaTitle?: string;

  /**
   * Meta description — `string`
   *
   *
   */
  metaDescription?: string;

  /**
   * Meta image — `image`
   *
   *
   */
  metaImage?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
};

export type KeyVal = {
  _type: "keyVal";
  /**
   * Clef — `string`
   *
   *
   */
  key?: string;

  /**
   * Valeur — `localeBlockContent`
   *
   *
   */
  val?: LocaleBlockContent;
};

export type KeyValString = {
  _type: "keyValString";
  /**
   * key — `string`
   *
   *
   */
  key?: string;

  /**
   * Value — `string`
   *
   *
   */
  val?: string;
};

export type Video = {
  _type: "video";
  /**
   * url — `url`
   *
   *
   */
  url?: string;

  /**
   * placeholder — `image`
   *
   *
   */
  placeholder?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
};

export type Figure = {
  _type: "figure";
  /**
   * Image — `image`
   *
   * jpg, 1400px de large, 72dpi
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;

    /**
     * Alt Description — `string`
     *
     *
     */
    alt?: string;

    /**
     * Credit — `string`
     *
     *
     */
    credit?: string;
  };

  /**
   * Caption — `string`
   *
   *
   */
  caption?: string;
};

export type MosaicItem = {
  _type: "mosaicItem";
  /**
   * figure — `figure`
   *
   *
   */
  image?: Figure;

  /**
   * Column Size — `number`
   *
   * 1 ou 2
   */
  colSize?: number;
};

export type FontInUse = {
  _type: "fontInUse";
  /**
   * Title — `localeString`
   *
   *
   */
  title?: LocaleString;

  /**
   * Source — `string`
   *
   * who used it
   */
  source?: string;

  /**
   * Image — `figure`
   *
   *
   */
  image?: Figure;

  /**
   * product — `reference`
   *
   *
   */
  product?: SanityReference<Product>;
};

export type Accordion = {
  _type: "accordion";
  /**
   * Items — `array`
   *
   *
   */
  items?: Array<SanityKeyed<KeyVal>>;
};

export type ImagesUI = {
  _type: "imagesUI";
  /**
   * title — `string`
   *
   * Module title (displayed only in the admin)
   */
  title?: string;

  /**
   * items — `array`
   *
   *
   */
  items?: Array<SanityKeyed<Figure>>;
};

export type ProductsUI = {
  _type: "productsUI";
  /**
   * title — `string`
   *
   *
   */
  title?: string;

  /**
   * withCta — `boolean`
   *
   *
   */
  withCta?: boolean;

  /**
   * withToggle — `boolean`
   *
   * List Grid Toggle
   */
  withToggle?: boolean;

  /**
   * items — `array`
   *
   *
   */
  items?: Array<SanityKeyedReference<Product>>;
};

export type TextUI = {
  _type: "textUI";
  /**
   * title — `string`
   *
   * Module title (displayed only in the admin)
   */
  title?: string;

  /**
   * fullWidth — `boolean`
   *
   * Full width (pleine largeur, default = centré)
   */
  fullWidth?: boolean;

  /**
   * Text — `localeBlockContent`
   *
   *
   */
  text?: LocaleBlockContent;
};

export type SliderStoriesUI = {
  _type: "sliderStoriesUI";
  /**
   * title — `string`
   *
   * Module title (displayed only in the admin)
   */
  title?: string;

  /**
   * items — `array`
   *
   *
   */
  items?: Array<SanityKeyed<Figure>>;
};

export type ProjectsUI = {
  _type: "projectsUI";
  /**
   * title — `string`
   *
   * Custom works
   */
  title?: string;

  /**
   * items — `array`
   *
   *
   */
  items?: Array<SanityKeyedReference<Project>>;
};

export type FontsInUseUI = {
  _type: "fontsInUseUI";
  /**
   * title — `string`
   *
   * Custom works
   */
  title?: string;

  /**
   * items — `array`
   *
   *
   */
  items?: Array<SanityKeyed<FontInUse>>;
};

export type Documents =
  | Home
  | Infos
  | Settings
  | PageModulaire
  | Project
  | Tag
  | Product
  | Typeface
  | Order;

/**
 * This interface is a stub. It was referenced in your sanity schema but
 * the definition was not actually found. Future versions of
 * sanity-codegen will let you type this explicity.
 */
type Color = any;
