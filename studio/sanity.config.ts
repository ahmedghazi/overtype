import {defineConfig, isDev} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {media} from 'sanity-plugin-media'
import {presentationTool} from 'sanity/presentation'
import {getStartedPlugin} from './plugins/sanity-plugin-tutorial'
import {structure} from './src/deskStructure'
import {linkResolverPreview} from './src/linkResolverPreview'
import {colorInput} from '@sanity/color-input'

const devOnlyPlugins = [getStartedPlugin()]

const remoteURL = 'https://overtype-foundry.vercel.app'
const localURL = 'http://localhost:3000'
const previewURL = window.location.hostname === 'localhost' ? localURL : remoteURL

export default defineConfig({
  name: 'default',
  title: 'Overtype',

  projectId: 'ltdaocfm',
  dataset: 'production',

  // plugins: [structureTool(), visionTool()],
  plugins: [
    structureTool({structure}),
    visionTool(),
    ...(isDev ? devOnlyPlugins : []),
    media(),
    colorInput(),
    presentationTool({
      resolve: linkResolverPreview,
      previewUrl: {
        origin: previewURL,
        previewMode: {
          enable: '/api/preview',
          disable: '/api/exit-preview',
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
