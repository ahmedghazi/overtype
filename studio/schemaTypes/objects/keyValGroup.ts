import {defineField} from 'sanity'
// import { BsInfoSquare } from 'react-icons/bs'

export default defineField({
  name: 'keyValGroup',
  title: 'Clef Valeur (Group)',
  type: 'object',
  // icon: BsInfoSquare,
  fields: [
    defineField({
      name: 'key',
      type: 'string',
      title: 'Clef',
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [{type: 'keyValString'}],
    }),
  ],
  preview: {
    select: {
      title: 'key',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title,
        subtitle: 'Clef Valeur (Group)',
      }
    },
  },
})
