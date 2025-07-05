import {defineField} from 'sanity'
import {ThListIcon} from '@sanity/icons'

export default defineField({
  name: 'fontsInUseUI',
  title: 'Fonts In Use UI',
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
          type: 'fontInUse',
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
        subtitle: 'Fonts In Use UI',
      }
    },
  },
})
