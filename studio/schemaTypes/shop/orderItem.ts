import {defineField} from 'sanity'

export default defineField({
  title: 'Order Item ',
  name: 'orderItem',
  type: 'object',

  preview: {
    select: {
      title: 'fullTitle',
      subtitle: 'sku',
    },
  },
  fields: [
    defineField({
      title: 'Product Type',
      name: 'productType',
      type: 'string',
    }),
    defineField({
      title: 'productTypeRef',
      name: 'productTypeRef',
      type: 'string',
      hidden: true,
    }),
    defineField({
      title: 'productId',
      name: 'productId',
      type: 'string',
      hidden: true,
    }),
    defineField({
      title: 'productTitle',
      name: 'productTitle',
      type: 'string',
    }),
    defineField({
      title: 'fullTitle',
      name: 'fullTitle',
      type: 'string',
    }),
    defineField({
      title: 'description',
      name: 'description',
      type: 'string',
    }),
    defineField({
      title: 'SKU',
      name: 'sku',
      type: 'string',
    }),
    defineField({
      title: 'Price',
      name: 'price',
      type: 'number',
    }),
    defineField({
      title: 'Discount',
      name: 'discount',
      type: 'number',
    }),
    defineField({
      title: 'applyDiscount',
      name: 'applyDiscount',
      type: 'boolean',
    }),
    defineField({
      title: 'Final Price',
      name: 'finalPrice',
      type: 'number',
    }),
    defineField({
      title: 'isLogo',
      name: 'isLogo',
      type: 'string',
    }),
    defineField({
      title: 'license',
      name: 'license',
      type: 'string',
    }),
    defineField({
      title: 'licenseInfos',
      name: 'licenseInfos',
      type: 'string',
    }),
    defineField({
      title: 'relatedTypefaceSku',
      name: 'relatedTypefaceSku',
      type: 'string',
    }),
    defineField({
      title: 'background',
      name: 'background',
      type: 'string',
      hidden: true,
    }),
    defineField({
      title: 'foreground',
      name: 'foreground',
      type: 'string',
      hidden: true,
    }),
  ],
})
