import { PluginBuilder } from '@ds-wizard/plugin-sdk/core'
import { Plugin } from '@ds-wizard/plugin-sdk/types'

import PluginIntegrationSelection from '@/components/PluginIntegrationSelection'
import { PluginIntegrationSettingsDataCodec } from '@/data/plugin-integration-settings-data'

import PluginIntegrationEditor from './components/PluginIntegrationEditor'
import { SettingsDataCodec } from './data/settings-data'
import { UserSettingsDataCodec } from './data/user-settings-data'
import { pluginMetadata } from './metadata'


export default function (_settingsInput: unknown, _userSettingsInput: unknown): Plugin {
    // This plugin has no settings or user settings to initialize.
    const plugin: Plugin = PluginBuilder.create(
        pluginMetadata,
        SettingsDataCodec,
        UserSettingsDataCodec,
    )
        .addKnowledgeModelIntegration(
            'Public License Selector Integration',
            'public-license-selector-integration',
            PluginIntegrationSettingsDataCodec, // data codec for the plugin integration settings
            'x-public-license-selector-integration-editor', // name of the web component for the KM editor
            PluginIntegrationEditor, // React component with KM editor component functionality
            'x-public-license-selector-integration-selection', // name of the web component for the questionnaire
            PluginIntegrationSelection, // React component with Questionnaire component functionality
            true, // (optional) if true plugin should handle rendering of the reply, otherwise the default Markdown is used
        )
        .createPlugin()

    return plugin
}
