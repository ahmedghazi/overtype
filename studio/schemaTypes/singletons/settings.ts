import {CogIcon} from '@sanity/icons'
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Réglages (header, footer, ...)',
  type: 'document',
  icon: CogIcon,
  groups: [
    // {
    //   default: true,
    //   name: 'navigation',
    //   title: 'Navigation',
    // },
    {
      default: true,
      name: 'seo',
      title: 'Default SEO',
    },
    {
      name: 'header',
      title: 'Header',
    },
    {
      name: 'footer',
      title: 'Footer',
    },
    {
      name: 'shop',
      title: 'Shop',
    },
    {
      name: 'misc',
      title: 'Misc',
    },
    {
      name: 'design',
      title: 'Design',
    },
  ],
  fields: [
    // defineField({
    //   name: 'seo',
    //   title: 'Defauly SEO',
    //   type: 'seo',
    //   group: 'seo',
    // }),
    defineField({
      name: 'siteName',
      title: 'Nom du site',
      type: 'string',
      group: 'header',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      description: "Visible en page d'accueil header",
      group: 'header',
    }),

    defineField({
      name: 'navPrimary',
      title: 'Naviguation Primary',
      type: 'array',
      of: [
        {
          type: 'linkInternal',
        },
        {
          type: 'linkExternal',
        },
      ],
      group: 'header',
    }),
    defineField({
      name: 'navSecondary',
      title: 'Naviguation Secondary',
      type: 'array',
      of: [
        {
          type: 'linkGroup',
        },
      ],
      group: 'footer',
    }),
    defineField({
      name: 'footerCta',
      title: 'Footer CTA',
      type: 'localeBlockContent',
      group: 'footer',
    }),

    defineField({
      name: 'shopPage',
      description: 'Shop page (view all)',
      type: 'reference',
      to: [{type: 'pageModulaire'}],
      group: 'shop',
    }),
    defineField({
      name: 'licenses',
      description: 'Global Licenses calculation',
      type: 'array',
      of: [{type: 'licenseType'}],
      group: 'shop',
    }),

    defineField({
      name: 'message404',
      title: 'Message 404',
      type: 'blockContent',
      group: 'misc',
    }),

    defineField({
      name: 'customCss',
      type: 'text',
      group: 'design',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Réglages (header, footer, ...)',
      }
    },
  },
})
