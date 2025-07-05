// import supportedLanguages from "../locale/supportedLanguages";
import {defineField} from 'sanity'
import {baseLanguage} from '../locale/supportedLanguages'
import linkIntternalTypes from '../misc/linkIntternalTypes'

export default defineField({
  title: 'Link Internal',
  name: 'linkInternal',
  type: 'object',
  preview: {
    select: {
      label: `label.${baseLanguage}`,
    },
    prepare(selection) {
      const {label} = selection
      return {
        title: label,
        // subtitle: "test",
      }
    },
  },
  fields: [
    defineField({
      name: 'label',
      type: 'localeString',
    }),
    defineField({
      name: 'link',
      type: 'reference',
      weak: true,
      to: linkIntternalTypes,
    }),
    defineField({
      name: 'withSubmenu',
      type: 'boolean',
    }),
    defineField({
      name: 'subMenu',
      type: 'array',
      of: [
        {
          type: 'linkInternal',
        },
        {
          type: 'linkExternal',
        },
      ],
      hidden: ({document, parent, value}) => {
        console.log(parent)
        return !parent?.withSubmenu
      },
    }),
  ],
})
