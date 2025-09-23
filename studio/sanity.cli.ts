import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'ltdaocfm',
    dataset: 'production',
  },
  studioHost: 'backoffice--overtype',

  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
  deployment: {
    appId: 'erf4cy1u27kei1391pu2xjuu',
  },
})
