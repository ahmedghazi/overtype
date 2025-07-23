import {defineField} from 'sanity'
import {TfiLayoutAccordionSeparated} from 'react-icons/tfi'

export default defineField({
  name: 'accordion',
  title: 'Accordion',
  type: 'object',
  icon: TfiLayoutAccordionSeparated,

  fields: [
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{type: 'keyVal'}],
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {
          type: 'linkInternal',
        },
        {
          type: 'linkExternal',
        },
        {
          type: 'linkFile',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'items.0.key',
    },
  },
})
