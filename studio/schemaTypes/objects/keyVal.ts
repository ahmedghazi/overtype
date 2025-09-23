// import {FiImage} from 'react-icons/fi'
import {defineField} from 'sanity'

export default defineField({
  name: 'keyVal',
  title: 'Clef Valeur (avec text)',
  type: 'object',
  fields: [
    defineField({
      name: 'key',
      type: 'string',
      title: 'Clef',
    }),
    defineField({
      name: 'val',
      type: 'localeBlockContent',
      title: 'Valeur',
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
        subtitle: 'Clef Valeur (avec text)',
      }
    },
  },
})
