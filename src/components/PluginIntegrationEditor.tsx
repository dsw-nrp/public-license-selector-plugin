import { KnowledgeModelIntegrationEditorComponentProps } from '@ds-wizard/plugin-sdk/elements'
import { Stack } from '@ds-wizard/plugin-sdk/ui/Layout'
import { Muted } from '@ds-wizard/plugin-sdk/ui/Text'

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
    return (
        <Stack>
            <Muted>There is nothing to configure here at this point.</Muted>
        </Stack>
    )
}
