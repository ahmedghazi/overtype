import {TfiLayoutMediaOverlay} from 'react-icons/tfi'
import {defineField} from 'sanity'
import {baseLanguage} from '../locale/supportedLanguages'

export default defineField({
  name: 'fontInUse',
  title: 'Font In Use',
  type: 'object',
  icon: TfiLayoutMediaOverlay,
  preview: {
    select: {
      title: `title.${baseLanguage}`,
      media: 'image.image',
    },
    // prepare(selection) {
    //   const {media, title} = selection
    //   return {
    //     title: title,
    //     media: media,
    //     subtitle: 'Figure',
    //   }
    // },
  },
  fields: [
    defineField({
      name: 'title',
      type: 'localeString',
      title: 'Title',
    }),
    defineField({
      name: 'source',
      type: 'string',
      title: 'Source',
      description: 'who used it',
    }),
    defineField({
      name: 'image',
      type: 'figure',
      title: 'Image',
    }),
    defineField({
      name: 'product',
      type: 'reference',
      to: [{type: 'product'}],
      title: 'product',
    }),
  ],
})
