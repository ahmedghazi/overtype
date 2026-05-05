import {defineArrayMember, defineField, defineType} from 'sanity'
import {FaLink} from 'react-icons/fa'

export default defineType({
  name: 'linkExpire',
  title: 'Link Expire',
  type: 'document',
  icon: FaLink,
  fields: [
    defineField({
      name: 'token',
      title: 'Token',
      type: 'string',
    }),
    defineField({
      name: 'zips',
      title: 'Zips',
      type: 'array',
      of: [defineArrayMember({type: 'linkExternal'})],
    }),
    defineField({
      name: 'maxDownloads',
      title: 'Max Downloads',
      type: 'number',
      initialValue: 1,
    }),
    defineField({
      name: 'downloads',
      title: 'Downloads',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'orderId',
      title: 'Order ID',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'token',
      subtitle: 'downloads',
    },
    prepare({title, subtitle}) {
      return {
        title: title ?? 'No token',
        subtitle: `Downloads: ${subtitle ?? 0}`,
      }
    },
  },
})
