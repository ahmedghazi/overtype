import {defineArrayMember, defineField, defineType} from 'sanity'
import slug from '../fields/slug'
import sku from '../fields/sku'
import {RiFontSize2} from 'react-icons/ri'
import modulesList from '../objects/modules/modulesList'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  // icon: HiOutlineShoppingBag,
  icon: RiFontSize2,
  validation: (Rule) =>
    Rule.custom((fields) => {
      return fields && fields.seo ? true : 'SEO needed'
    }),
  preview: {
    select: {
      title: 'seo.metaTitle',
      subtitle: 'seo.metaDescription',
      media: 'seo.metaImage',
    },
  },
  groups: [
    {
      default: true,
      name: 'editorial',
      title: 'Editorial',
    },
    {
      name: 'shop',
      title: 'Shop',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'misc',
      title: 'Misc',
    },
  ],
  // initialValue: {
  //   noticeInternal:
  //     'ex licence web, desktop, Base price defined here, company size will increment base price, bundle or single style will give the final price',
  // },
  fields: [
    defineField({
      name: 'seo',
      type: 'seo',
      group: 'seo',
    }),

    defineField({
      name: 'supTitle',
      title: 'Sup Title',
      type: 'string',
      group: 'editorial',
    }),

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'editorial',
    }),

    slug,

    defineField({
      name: 'subTitle',
      title: 'Sub Title',
      type: 'string',
      group: 'editorial',
    }),

    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'reference',
      to: {type: 'tag'},
      group: 'editorial',
    }),
    defineField({
      name: 'background',
      title: 'Background',
      type: 'color',
      description: 'used on list pages',
      group: 'editorial',
    }),
    defineField({
      name: 'foreground',
      title: 'Foreground',
      type: 'color',
      description: 'used on list pages',
      group: 'editorial',
    }),

    defineField({
      name: 'hero',
      type: 'figure',
      group: 'editorial',
    }),
    defineField({
      name: 'text',
      type: 'localeBlockContent',
      group: 'editorial',
    }),
    defineField({
      name: 'images',
      type: 'array',
      of: [{type: 'mosaicItem'}],
      group: 'editorial',
    }),

    defineField({
      name: 'blurb',
      title: 'Blurb',
      type: 'string',
      description: 'short description for the cart',
      group: 'shop',
    }),

    defineField({
      name: 'metadata',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      group: 'shop',
    }),

    defineField({
      name: 'bundles',
      title: 'Bundles',
      type: 'array',
      of: [
        {
          type: 'productBundle',
        },
      ],
      group: 'shop',
    }),
    defineField({
      name: 'defaultTypeface',
      title: 'Default Typeface',
      type: 'reference',
      to: [{type: 'typeface'}],
      description:
        'used for shop, also used to display typeface in frontend, product card, related',
      group: 'shop',
    }),
    defineField({
      name: 'singles',
      title: 'singles',
      description: 'used for shop, also used to display typeface in frontend',
      type: 'array',
      of: [
        {
          type: 'productSingle',
        },
      ],
      group: 'shop',
    }),

    defineField({
      name: 'related',
      title: 'Related Products',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'product'}],
        },
      ],
      group: 'editorial',
    }),

    defineField({
      name: 'customCSS',
      title: 'Custom css',
      type: 'text',
      rows: 10,
      group: 'misc',
    }),
  ],
})
