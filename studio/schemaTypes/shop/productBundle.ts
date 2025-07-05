import {defineField} from 'sanity'
import {FaLayerGroup, FaShapes} from 'react-icons/fa'

export default defineField({
  title: 'Bundle',
  name: 'productBundle',
  type: 'object',
  icon: FaLayerGroup,
  preview: {
    select: {
      title: 'title',
      price: 'price',
      priceDiscount: 'priceDiscount',
    },
    prepare({title, price, priceDiscount}) {
      const finalPrice = price - (price * priceDiscount) / 100
      const subTitle = priceDiscount
        ? `${price}€ - ${priceDiscount}% => ${finalPrice}€`
        : `${price}€`
      return {
        title: title,
        subtitle: subTitle,
      }
    },
  },
  fields: [
    defineField({
      title: 'SKU',
      name: 'sku',
      type: 'slug',
      description: "id unique permettanr de retrouver le produit après l'achat",
      options: {
        source: (doc, context) => {
          console.log(doc, context)
          return `bundle-${doc.title}-${context.parent.title}`
        },
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: 'Description',
      name: 'description',
      type: 'string',
    }),

    defineField({
      title: 'Price',
      name: 'price',
      type: 'number',
      description: '',
    }),
    defineField({
      title: 'Discount',
      name: 'discount',
      type: 'number',
      description: '% => save Xx%',
    }),

    defineField({
      hidden: true,
      title: 'Typefaces',
      name: 'typefaces',
      description: 'Used in buy area (seems deprecated, will keep it for now)',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'typeface',
            },
          ],
        },
      ],
    }),

    defineField({
      title: 'Zip Files',
      name: 'zip',
      type: 'file',
      description: 'Digital good client will receive',
    }),
    defineField({
      hidden: true,
      title: 'Zip File Trials',
      name: 'zipTrials',
      type: 'file',
      description: 'Digital good client will receive. (seems deprecated, will keep it for now)',
    }),
  ],
})
