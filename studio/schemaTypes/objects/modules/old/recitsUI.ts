import {RiTeamLine} from 'react-icons/ri'

export default {
  name: 'moduleRecits',
  title: 'Récits',
  type: 'object',
  icon: RiTeamLine,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Titre',
    },
    {
      name: 'items',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'recit'}]}],
    },
  ],
}
