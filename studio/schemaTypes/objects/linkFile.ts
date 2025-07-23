import {FiDownload} from 'react-icons/fi'
import {defineField} from 'sanity'

export default defineField({
  title: 'Link File',
  name: 'linkFile',
  type: 'object',
  icon: FiDownload,
  preview: {
    select: {
      label: `label`,
    },
    prepare(selection) {
      const {label} = selection
      return {
        title: label,
      }
    },
  },
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
    }),
    defineField({
      name: 'file',
      title: 'File',
      type: 'file',
    }),
  ],
})
