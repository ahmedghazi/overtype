import {defineField} from 'sanity'
import {FaQ} from 'react-icons/fa6'

export default defineField({
  name: 'faq',
  title: 'Faq',
  type: 'object',
  icon: FaQ,

  fields: [
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{type: 'keyVal'}],
    }),
  ],
  preview: {
    select: {
      title: 'items.0.ekey',
    },
  },
})
