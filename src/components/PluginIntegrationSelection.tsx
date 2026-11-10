import { createIntegrationReply, IntegrationReply } from '@ds-wizard/plugin-sdk/data'
import { KnowledgeModelIntegrationQuestionnaireComponentProps } from '@ds-wizard/plugin-sdk/elements'
import { Card } from '@ds-wizard/plugin-sdk/ui/Card'
import { Inline, Stack } from '@ds-wizard/plugin-sdk/ui/Layout'
import { Link } from '@ds-wizard/plugin-sdk/ui/Link'
import { Tag, TagList } from '@ds-wizard/plugin-sdk/ui/Tag'
import { Body, Subtitle } from '@ds-wizard/plugin-sdk/ui/Text'

import LicenseSelectorModal from '@/components/LicenseSelectorModal'
import { PluginIntegrationSettingsData } from '@/data/plugin-integration-settings-data'
import { SettingsData } from '@/data/settings-data'
import { UserSettingsData } from '@/data/user-settings-data'
import { LicenseDefinition } from '@/licenseSelector'

export default function PluginIntegrationSelection({
    integrationReply,
    onReplyChange,
}: KnowledgeModelIntegrationQuestionnaireComponentProps<
    SettingsData,
    UserSettingsData,
    PluginIntegrationSettingsData
>) {
    const handleLicenseSelected = (license: LicenseDefinition) => {
        // Store the human-readable name (as Markdown, used by the default
        // renderer and document generation) and keep the full license
        // definition as the raw value so we can render it richly here.
        const value = license.url ? `[${license.name}](${license.url})` : license.name
        const reply: IntegrationReply = createIntegrationReply(value, license)
        onReplyChange(reply)
    }

    const selectedLicense = getSelectedLicense(integrationReply)

    if (selectedLicense) {
        return <LicenseReply license={selectedLicense} />
    }

    return (
        <Inline>
            <LicenseSelectorModal onLicenseSelected={handleLicenseSelected}>
                Select a public license
            </LicenseSelectorModal>
        </Inline>
    )
}

function LicenseReply({ license }: { license: LicenseDefinition }) {
    return (
        <Card>
            <Stack>
                <Subtitle>
                    {license.url ? (
                        <Link href={license.url} external>
                            {license.name}
                        </Link>
                    ) : (
                        license.name
                    )}
                </Subtitle>
                {license.description && <Body>{license.description}</Body>}
                {license.categories && license.categories.length > 0 && (
                    <TagList>
                        {license.categories.map((category) => (
                            <Tag key={category} label={category} />
                        ))}
                    </TagList>
                )}
            </Stack>
        </Card>
    )
}

/**
 * Extract the license definition stored as the raw value of the integration
 * reply, if present and shaped like a license.
 */
function getSelectedLicense(reply: IntegrationReply | null): LicenseDefinition | null {
    if (reply === null || reply.value.type !== 'IntegrationType') {
        return null
    }

    const raw = reply.value.raw
    if (raw && typeof raw === 'object' && 'name' in raw) {
        return raw as LicenseDefinition
    }

    return null
}
