import {defineField} from 'sanity'
import {CiShop} from 'react-icons/ci'

export default defineField({
  name: 'productsUI',
  title: 'Products UI',
  type: 'object',
  icon: CiShop,
  // initialValue: {
  //   layout: 'mosaic',
  // },
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),

    defineField({
      name: 'withCta',
      type: 'boolean',
    }),
    defineField({
      name: 'withToggle',
      type: 'boolean',
      description: 'List Grid Toggle',
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'product'}],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: title,
        subtitle: 'Products UI',
      }
    },
  },
})
