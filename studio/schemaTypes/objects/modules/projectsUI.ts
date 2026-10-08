import {defineField} from 'sanity'
import {ThListIcon} from '@sanity/icons/ThList'

export default defineField({
  name: 'projectsUI',
  title: 'Projets UI',
  type: 'object',
  icon: ThListIcon,

  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Custom works',
    }),
    defineField({
      name: 'cta',
      type: 'linkInternal',
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'project'}],
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
        subtitle: 'Projets UI',
      }
    },
  },
})
