import { PluginMetadata } from '@ds-wizard/plugin-sdk/types'

import { version } from '../package.json'

export const pluginMetadata: PluginMetadata = {
    uuid: '6f4ead79-b460-4c07-a98c-40d18dc1f484',
    name: 'Public License Selector Plugin',
    description: 'Selecting a public license via integration questions.',
    version,
}
