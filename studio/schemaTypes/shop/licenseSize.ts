import {defineField} from 'sanity'
import {TbLicense} from 'react-icons/tb'
import {baseLanguage} from '../locale/supportedLanguages'

export default defineField({
  title: 'License Size',
  name: 'licenseSize',
  type: 'object',
  icon: TbLicense,
  preview: {
    select: {
      title: `title.${baseLanguage}`,
    },
  },
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'localeString',
      description: 'Displayed on front end',
    }),
    defineField({
      title: 'Infos',
      name: 'infos',
      type: 'localeString',
      description: 'Displayed on front end',
    }),

    defineField({
      name: 'licenseType',
      type: 'array',
      of: [{type: 'licenseType'}],
    }),
  ],
})
