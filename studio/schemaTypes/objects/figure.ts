import {FiImage} from 'react-icons/fi'
import {baseLanguage} from '../locale/supportedLanguages'
import {defineField} from 'sanity'

export default defineField({
  name: 'figure',
  title: 'Figure',
  type: 'object',
  icon: FiImage,
  preview: {
    select: {
      media: 'image',
      title: `image.alt`,
      size: 'size',
    },
    prepare(selection) {
      const {media, title, size} = selection
      return {
        title: title + ' ' + size,
        media: media,
        subtitle: 'Figure',
      }
    },
  },
  initialValue: {
    size: 'w-2/2',
  },
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      description: 'jpg, 1400px de large, 72dpi',
      options: {
        hotspot: true,
      },
      fields: [
        // {name: 'title', title: 'Title', type: 'string'},
        {name: 'alt', title: 'Alt Description', type: 'string'},
        {name: 'credit', title: 'Credit', type: 'string'},
        // {name: 'attribution', title: 'Attribution', type: 'string'}
      ],
    }),
    // defineField({
    //   name: 'caption',
    //   title: 'Caption',
    //   type: 'string',
    // }),
    defineField({
      name: 'size',
      type: 'string',
      title: 'Taille',
      description: 'largeur dans la grille',
      options: {
        list: [
          {title: '2 colonnes', value: 'w-2/2'},
          {title: '1 colonne', value: 'w-1/2'},
        ],
      },
    }),
  ],
})
