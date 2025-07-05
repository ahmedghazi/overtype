import {defineField} from 'sanity'
import {TbLicense} from 'react-icons/tb'
import {baseLanguage} from '../locale/supportedLanguages'

export default defineField({
  title: 'License Type',
  name: 'licenseType',
  type: 'object',
  icon: TbLicense,
  preview: {
    select: {
      title: `label.${baseLanguage}`,
      subtitle: 'priceMultiplier',
    },
  },
  fields: [
    defineField({
      title: 'Label',
      name: 'label',
      type: 'localeString',
      description: 'Displayed on front end',
    }),
    defineField({
      title: 'Price Multiplier',
      name: 'priceMultiplier',
      type: 'number',
      description: 'will multiply bundle or single price',
    }),
    defineField({
      title: 'Infos',
      name: 'infos',
      type: 'localeString',
      description: 'Displayed on front end',
    }),
  ],
})
