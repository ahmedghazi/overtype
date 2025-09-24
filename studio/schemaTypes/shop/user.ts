import {defineField} from 'sanity'

export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'orders',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'order'}]}],
    }),
    defineField({
      name: 'trials',
      type: 'array',
      of: [{type: 'reference', to : [{type: 'product'}]}],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
    },
  },
}
