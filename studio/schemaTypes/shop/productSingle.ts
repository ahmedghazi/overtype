import {defineField} from 'sanity'
import {BsFonts} from 'react-icons/bs'

export default defineField({
  title: 'Single',
  name: 'productSingle',
  type: 'object',
  icon: BsFonts,

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
          return `single-${doc.title}-${context.parent.title}`
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
      name: 'isDefault',
      type: 'boolean',
      description: 'use as default preview in homepage or elsewhere',
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
      title: 'Typeface',
      name: 'typeface',
      type: 'reference',
      description: 'Used in typefaces, product page, trials, buy area',
      to: [
        {
          type: 'typeface',
        },
      ],
    }),
    defineField({
      title: 'relatedTypeface',
      name: 'relatedTypeface',
      description:
        'Used to look for the regular version of the italic, to apply the discount if regular is selected',
      type: 'reference',
      to: [
        {
          type: 'typeface',
        },
      ],
    }),

    defineField({
      title: 'Zip File',
      name: 'zip',
      type: 'file',
      description: 'Digital good client will receive',
    }),

    defineField({
      title: 'Zip File Trials',
      name: 'zipTrials',
      type: 'file',
      description: 'Digital good client will receive',
    }),
  ],
})
