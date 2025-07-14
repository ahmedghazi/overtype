import {defineField} from 'sanity'
import {ThListIcon} from '@sanity/icons'

export default defineField({
  name: 'faqUI',
  title: 'Faq UI',
  type: 'object',
  icon: ThListIcon,

  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Custom works',
    }),

    defineField({
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'keyVal',
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
        subtitle: 'Faq UI',
      }
    },
  },
})
