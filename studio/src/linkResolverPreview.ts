import {defineLocations, PresentationPluginOptions} from 'sanity/presentation'
// import pageModulaire from '../schemaTypes/documents/pageModulaire'

export const linkResolverPreview: PresentationPluginOptions['resolve'] = {
  locations: {
    // Add locations for documents of type 'post'

    pageModulaire: defineLocations({
      // Select one or more fields
      select: {
        title: 'title.en',
        slug: 'slug.current',
        homePage: 'homePage',
      },
      // Those fields are available in the resolve callback function
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: doc?.homePage ? '/' : `/${doc?.slug}`,
          },
          // {title: 'Home', href: `/`},
        ],
      }),
    }),
    product: defineLocations({
      // Select one or more fields
      select: {
        title: 'title.en',
        slug: 'slug.current',
      },
      // Those fields are available in the resolve callback function
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/product/${doc?.slug}`,
          },
        ],
      }),
    }),
  },
}
