import home from './singletons/home'
import pageModulaire from './documents/pageModulaire'
import project from './documents/project'
import tag from './documents/tag'
import infos from './singletons/infos'
import settings from './singletons/settings'

import localeString from './locale/localeString'
import localeBlockContent from './locale/localeBlockContent'

import blockContent from './objects/blockContent'
import linkExternal from './objects/linkExternal'
import linkInternal from './objects/linkInternal'
import linkGroup from './objects/linkGroup'
import seo from './objects/seo'
import keyVal from './objects/keyVal'
import keyValString from './objects/keyValString'
import video from './objects/video'
import figure from './objects/figure'
import mosaicItem from './objects/mosaicItem'
import fontInUse from './objects/fontInUse'
import accordion from './objects/accordion'

import imagesUI from './objects/modules/imagesUI'
import productsUI from './objects/modules/productsUI'
import textUI from './objects/modules/textUI'
import sliderStoriesUI from './objects/modules/sliderStoriesUI'
import projectsUI from './objects/modules/projectsUI'
import fontsInUseUI from './objects/modules/fontsInUseUI'

import product from './shop/product'
import productBundle from './shop/productBundle'
import productSingle from './shop/productSingle'
import typeface from './shop/typeface'
import typefaceFile from './shop/typefaceFile'
import order from './shop/order'
import licenseType from './shop/licenseType'
import licenseSize from './shop/licenseSize'

export const schemaTypes = [
  home,

  infos,
  settings,
  pageModulaire,
  project,
  tag,
  product,
  productBundle,
  productSingle,
  typeface,
  typefaceFile,
  order,
  licenseType,
  licenseSize,

  localeString,
  localeBlockContent,

  blockContent,
  linkExternal,
  linkInternal,
  linkGroup,
  seo,
  keyVal,
  keyValString,
  video,
  figure,
  mosaicItem,
  fontInUse,
  accordion,

  imagesUI,
  productsUI,
  textUI,
  sliderStoriesUI,
  projectsUI,
  fontsInUseUI,
]
export default schemaTypes
