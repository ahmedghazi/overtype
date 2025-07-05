import {defineField} from 'sanity'
import {FiAlignLeft} from 'react-icons/fi'

export default defineField({
  name: 'textUI',
  title: 'Text UI',
  type: 'object',
  icon: FiAlignLeft,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Module title (displayed only in the admin)',
    }),
    defineField({
      name: 'fullWidth',
      type: 'boolean',
      description: 'Full width (pleine largeur, default = centré)',
    }),
    defineField({
      name: 'text',
      type: 'localeBlockContent',
      title: 'Text',
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
        subtitle: 'Text UI',
      }
    },
  },
})
