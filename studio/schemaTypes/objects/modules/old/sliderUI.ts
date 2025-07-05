import {defineField} from 'sanity'
import {BiCarousel} from 'react-icons/bi'

export default defineField({
  name: 'module.slider',
  title: 'Slider',
  type: 'object',
  icon: BiCarousel,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'images',
      type: 'array',
      of: [
        {
          type: 'image',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
    },
    prepare(selection) {
      const {title, media} = selection
      return {
        title: title,
        subtitle: 'Slider',
        media: media,
      }
    },
  },
})
