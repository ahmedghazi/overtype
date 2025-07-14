import {defineField} from 'sanity'
import {CiShop} from 'react-icons/ci'

export default defineField({
  name: 'trialsUI',
  title: 'Trials UI',
  type: 'object',
  icon: CiShop,
  // initialValue: {
  //   layout: 'mosaic',
  // },
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Internal',
    }),

    defineField({
      name: 'text',
      type: 'localeBlockContent',
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
    defineField({
      name: 'textOptin',
      type: 'localeBlockContent',
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
        subtitle: 'Trials UI',
      }
    },
  },
})
