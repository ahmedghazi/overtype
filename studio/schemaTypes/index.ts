import home from './singletons/home'
import pageModulaire from './documents/pageModulaire'
import project from './documents/project'
import tag from './documents/tag'
import infos from './singletons/infos'
import settings from './singletons/settings'

import localeString from './locale/localeString'
import localeBlockContent from './locale/localeBlockContent'
import localeText from './locale/localeText'

import blockContent from './objects/blockContent'

import linkExternal from './objects/linkExternal'
import linkInternal from './objects/linkInternal'
import linkFile from './objects/linkFile'
import linkGroup from './objects/linkGroup'
import seo from './objects/seo'
import keyVal from './objects/keyVal'
import keyValString from './objects/keyValString'
import keyValGroup from './objects/keyValGroup'
import video from './objects/video'
import figure from './objects/figure'
import mosaicItem from './objects/mosaicItem'
import fontInUse from './objects/fontInUse'
import accordion from './objects/accordion'
import faq from './objects/faq'

import imagesUI from './objects/modules/imagesUI'
import productsUI from './objects/modules/productsUI'
import textUI from './objects/modules/textUI'
import sliderStoriesUI from './objects/modules/sliderStoriesUI'
import projectsUI from './objects/modules/projectsUI'
import fontsInUseUI from './objects/modules/fontsInUseUI'
import trialsUI from './objects/modules/trialsUI'
import faqUI from './objects/modules/faqUI'

import product from './shop/product'
import productBundle from './shop/productBundle'
import productSingle from './shop/productSingle'
import typeface from './shop/typeface'
import typefaceFile from './shop/typefaceFile'
import order from './shop/order'
import linkExpire from './shop/linkExpire'
import user from './shop/user'
import licenseType from './shop/licenseType'
import licenseSize from './shop/licenseSize'
import orderItem from './shop/orderItem'

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
  orderItem,
  linkExpire,
  user,
  licenseType,
  licenseSize,

  localeString,
  localeBlockContent,
  localeText,

  blockContent,
  linkExternal,
  linkInternal,
  linkGroup,
  linkFile,
  seo,
  keyVal,
  keyValString,
  keyValGroup,
  video,
  figure,
  mosaicItem,
  fontInUse,
  accordion,
  faq,

  imagesUI,
  productsUI,
  textUI,
  sliderStoriesUI,
  projectsUI,
  fontsInUseUI,
  trialsUI,
  faqUI,
]
export default schemaTypes
