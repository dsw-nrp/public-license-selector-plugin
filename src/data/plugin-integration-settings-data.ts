import { makeJsonCodec } from '@ds-wizard/plugin-sdk/utils'
import { z } from 'zod'

export const PluginIntegrationSettingsDataSchema = z.object({
    valueIntegrationUuid: z.string().optional(),
})

export type PluginIntegrationSettingsData = z.infer<typeof PluginIntegrationSettingsDataSchema>

export const DefaultPluginIntegrationSettingsData: PluginIntegrationSettingsData = {
    valueIntegrationUuid: '',
}

export const PluginIntegrationSettingsDataCodec = makeJsonCodec(
    PluginIntegrationSettingsDataSchema,
    DefaultPluginIntegrationSettingsData,
)
