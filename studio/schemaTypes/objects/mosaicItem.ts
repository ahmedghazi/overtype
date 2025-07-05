import {defineField} from 'sanity'
import {CiGrid31} from 'react-icons/ci'

export default defineField({
  name: 'mosaicItem',
  title: 'Mosaic Item',
  type: 'object',
  icon: CiGrid31,
  initialValue: {
    colSize: 1,
  },
  fields: [
    defineField({
      name: 'image',
      title: 'figure',
      type: 'figure',
    }),
    defineField({
      name: 'colSize',
      title: 'Column Size',
      type: 'number',
      description: '1 ou 2',
    }),
  ],
  preview: {
    select: {
      title: 'items.0.key',
      media: 'image.image',
    },
  },
})
