import {defineArrayMember, defineField, defineType, useFormValue} from 'sanity'
import {FaReceipt} from 'react-icons/fa'
import React from 'react'

const OrderIdInput = () => {
  const id = useFormValue(['_id']) as string
  return React.createElement(
    'div',
    {
      style: {
        padding: '8px 12px',
        background: '#f1f3f5',
        borderRadius: 4,
        fontFamily: 'monospace',
        fontSize: 13,
        color: '#555',
        userSelect: 'all',
      },
    },
    id,
  )
}

const StatusIcon = ({status}: {status: string}) =>
  React.createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 24 24',
      width: 16,
      height: 16,
      fill: status === 'completed' ? '#22c55e' : '#f97316',
    },
    React.createElement('circle', {cx: 12, cy: 12, r: 10}),
  )

export default defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  icon: FaReceipt,

  preview: {
    select: {
      title: 'title',
      status: 'status',
      user: 'user.email',
    },
    prepare({title, status, user}) {
      return {
        title,
        subtitle: `${status} - ${user}`,
        media: React.createElement(StatusIcon, {status}),
      }
    },
  },
  fields: [
    defineField({
      name: 'orderId',
      title: 'Order ID',
      type: 'string',
      readOnly: true,
      components: {input: OrderIdInput},
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Transaction ID from paddle',
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
      description: '',
      // description: 'Invoice number for the order (Transaction ID)',
      type: 'string',
      hidden: true,
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
