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
      title: 'Accrodion Items',
      type: 'array',
      of: [{type: 'keyVal'}, {type: 'keyValGroup'}],
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
      label: `items.0.key`,
    },
    prepare(selection) {
      const {label} = selection
      return {
        title: label,
        subtitle: 'Accordion',
      }
    },
  },
})
