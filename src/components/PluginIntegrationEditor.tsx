import { KnowledgeModelIntegrationEditorComponentProps } from '@ds-wizard/plugin-sdk'

import { PluginIntegrationSettingsData } from '@/data/plugin-integration-settings-data'
import { SettingsData } from '@/data/settings-data'
import { UserSettingsData } from '@/data/user-settings-data'

export default function PluginIntegrationEditor(
    _props: KnowledgeModelIntegrationEditorComponentProps<
        SettingsData,
        UserSettingsData,
        PluginIntegrationSettingsData
    >,
) {
    return <div className="form-group">There is nothing to configure here at this point...</div>
}
