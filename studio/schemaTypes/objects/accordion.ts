import {defineField} from 'sanity'
import {TfiLayoutAccordionSeparated} from 'react-icons/tfi'

export default defineField({
  name: 'accordion',
  title: 'Accordion',
  type: 'object',
  icon: TfiLayoutAccordionSeparated,

  fields: [
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{type: 'keyVal'}],
    }),
  ],
  preview: {
    select: {
      title: 'items.0.key',
    },
    // prepare(selection) {
    //   const {title, subtitle, media} = selection
    //   const block = (subtitle || []).find((block: any) => block._type === 'block')
    //   return {
    //     title: title || 'Untitled',
    //     media,
    //     subtitle: block
    //       ? block.children
    //           .filter((child: any) => child._type === 'span')
    //           .map((span: any) => span.text)
    //           .join('')
    //       : 'No description',
    //   }
    // },
  },
})
