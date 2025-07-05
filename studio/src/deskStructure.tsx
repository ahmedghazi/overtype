// import {BiDockTop, BiDockBottom} from 'react-icons/bi'
// import {ControlsIcon} from '@sanity/icons'
import {ListItemBuilder, StructureResolver} from 'sanity/desk'

// If you add document types to desk structure manually, you can add them to this function to prevent duplicates in the root pane
const hiddenDocTypes = (listItem: ListItemBuilder) => {
  const id = listItem.getId()

  if (!id) {
    return false
  }

  return ![
    'home',
    'landing',
    'media.tag',
    'pageModulaire',
    'tag',
    'project',
    'settings',
    'infos',
    'product',
    'typeface',
    'order',
  ].includes(id)
}

export const structure = (S) =>
  S.list()
    .title('Base')
    .items([
      S.listItem()
        .title('Réglages (header, footer, ...)')
        .schemaType('settings')
        .child(
          S.editor()
            .title('Réglages (header, footer, ...)')
            .schemaType('settings')
            .documentId('settings'),
        ),
      S.divider(),

      // S.listItem()
      //   .title('Accueil')
      //   .schemaType('home')
      //   .child(S.editor().title('Home').schemaType('home').documentId('home')),

      S.listItem()
        .title('Infos')
        .schemaType('infos')
        .child(S.editor().title('infos').schemaType('infos').documentId('infos')),

      S.divider(),

      S.listItem()
        .title('Pages')
        .schemaType('pageModulaire')
        .child(S.documentTypeList('pageModulaire')),

      S.divider(),

      S.listItem().title('Products').schemaType('product').child(S.documentTypeList('product')),
      S.listItem()
        .title('Typefaces (Aa Regular, Aa Italic,...)')
        .schemaType('typeface')
        .child(S.documentTypeList('typeface')),
      S.listItem().title('Tags').schemaType('tag').child(S.documentTypeList('tag')),
      S.divider(),
      S.listItem().title('Orders').schemaType('order').child(S.documentTypeList('order')),

      // We also need to remove the new singletons from the main list
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
