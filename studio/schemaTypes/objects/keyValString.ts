// import {FiImage} from 'react-icons/fi'
import {defineField} from 'sanity'

export default defineField({
  name: 'keyValString',
  title: 'Clef Valeur (Simple)',
  type: 'object',
  fields: [
    defineField({
      name: 'key',
      type: 'string',
      title: 'key',
    }),
    defineField({
      name: 'val',
      type: 'string',
      title: 'Valeur',
    }),
  ],
  preview: {
    select: {
      title: 'key',
      subtitle: 'val',
    },
  },
})
