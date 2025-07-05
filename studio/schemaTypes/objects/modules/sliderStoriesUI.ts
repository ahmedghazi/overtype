import {defineField} from 'sanity'
import {TbCarouselHorizontal} from 'react-icons/tb'

export default defineField({
  name: 'sliderStoriesUI',
  title: 'Slider Stories UI',
  type: 'object',
  icon: TbCarouselHorizontal,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Module title (displayed only in the admin)',
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [{type: 'figure'}],
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
        subtitle: 'Slider Stories UI',
      }
    },
  },
})
