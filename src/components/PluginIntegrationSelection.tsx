import {
    createIntegrationReply,
    IntegrationReply,
    KnowledgeModelIntegrationQuestionnaireComponentProps,
} from '@ds-wizard/plugin-sdk'

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

    return (
        <div className="questionnaireContent__value questionnaireContent__integrationQuestion">
            {selectedLicense ? (
                <LicenseReply license={selectedLicense} />
            ) : (
                <>
                    <LicenseSelectorModal onLicenseSelected={handleLicenseSelected}>
                        Select a public license
                    </LicenseSelectorModal>
                </>
            )}
        </div>
    )
}

// Inline styles so the reply stays legible regardless of the surrounding theme
// (the default Bootstrap badge classes render white-on-white here).
const selectedLicenseStyle = {
    padding: '12px 16px',
    marginBottom: '16px',
    border: '1px solid #dee2e6',
    borderRadius: '6px',
} as const

const categoryBadgeStyle = {
    display: 'inline-block',
    marginRight: '4px',
    padding: '2px 8px',
    borderRadius: '4px',
    backgroundColor: '#e9ecef',
    color: '#333',
    fontSize: '85%',
} as const

function LicenseReply({ license }: { license: LicenseDefinition }) {
    return (
        <div className="selected-license" style={selectedLicenseStyle}>
            <p>
                <strong>
                    {license.url ? (
                        <a href={license.url} target="_blank" rel="noopener noreferrer">
                            {license.name}
                        </a>
                    ) : (
                        license.name
                    )}
                </strong>
            </p>
            {license.description && <p>{license.description}</p>}
            {license.categories && license.categories.length > 0 && (
                <p style={{ marginBottom: 0 }}>
                    {license.categories.map((category) => (
                        <span key={category} style={categoryBadgeStyle}>
                            {category}
                        </span>
                    ))}
                </p>
            )}
        </div>
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
