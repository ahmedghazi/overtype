import {defineArrayMember, defineField, defineType} from 'sanity'
import {FaReceipt} from 'react-icons/fa'

export default defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  // icon: HiOutlineShoppingBag,
  icon: FaReceipt,

  // initialValue: {
  //   noticeInternal:
  //     'ex licence web, desktop, Base price defined here, company size will increment base price, bundle or single style will give the final price',
  // },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'invoiceNumber',
      title: 'Invoice Number/Transaction ID',
      description: 'Invoice number for the order (Transaction ID)',
      type: 'string',
    }),
    defineField({
      name: 'checkoutID',
      title: 'Checkout ID',
      // description: 'Invoice number for the order (Transaction ID)',
      type: 'string',
    }),

    defineField({
      name: 'status',
      title: 'status',
      type: 'string',
    }),
    defineField({
      name: 'downloadDate',
      title: 'Download Date',
      type: 'datetime',
    }),

    defineField({
      name: 'creationDate',
      title: 'dateTime',
      type: 'datetime',
    }),
    defineField({
      name: 'totalAmount',
      title: 'totalAmount',
      type: 'number',
    }),
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      to: {type: 'user'},
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'orderItem'}],
        },
      ],
    }),
    defineField({
      name: 'attachments',
      title: 'attachments',
      type: 'array',
      of: [{type: 'linkExternal'}],
      hidden: true,
    }),
    defineField({
      name: 'transactionId',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'licenseFor',
      type: 'string',
    }),
    defineField({
      name: 'licenseForData',
      type: 'text',
    }),
    defineField({
      name: 'json',
      title: 'json',
      type: 'text',
    }),
  ],
})
