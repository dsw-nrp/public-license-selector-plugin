import { Button, ButtonVariant } from '@ds-wizard/plugin-sdk/ui/Button'
import $ from 'jquery'
import { ReactNode, useEffect, useRef } from 'react'

import {
    ensureLicenseSelectorStyles,
    LicenseDefinition,
    LicenseSelectorOptions,
} from '@/licenseSelector'

export type LicenseSelectorModalProps = {
    /** Called with the chosen license when the user confirms a selection. */
    onLicenseSelected: (license: LicenseDefinition) => void
    /** Content of the trigger button (defaults to "Select a license"). */
    children?: ReactNode
    /** Look of the trigger button (defaults to the design system's secondary button). */
    variant?: ButtonVariant
    /** Font Awesome classes of an icon before the trigger button's label. */
    icon?: string
    /** Extra options forwarded to the underlying jQuery license selector. */
    options?: Omit<LicenseSelectorOptions, 'onLicenseSelected' | 'appendTo'>
}

/** The part of the jQuery plugin's instance (stored in the element's data) used here. */
type LicenseSelectorInstance = {
    modal: { show: () => void }
}

/**
 * Trigger button that opens the @ufal/license-selector modal.
 *
 * The underlying library renders its own full-screen modal overlay and calls
 * back with the selected license. We mount it on a hidden host element attached
 * directly to `document.body` so the fixed overlay is positioned against the
 * viewport (unaffected by any transformed ancestor) and is cleaned up together
 * with this component.
 *
 * The jQuery plugin is initialised on a detached anchor element rather than on
 * the trigger button, so the button can be the SDK's design-system `Button`.
 * The plugin would bind a click handler on that anchor; we open the modal
 * directly through the plugin instance instead.
 */
export default function LicenseSelectorModal({
    onLicenseSelected,
    children,
    variant = 'secondary',
    icon = 'fa-scale-balanced',
    options,
}: LicenseSelectorModalProps) {
    const instanceRef = useRef<LicenseSelectorInstance | null>(null)

    // Keep the latest callback in a ref: the jQuery plugin captures its options
    // once at init, so this avoids calling a stale closure on later renders.
    const onLicenseSelectedRef = useRef(onLicenseSelected)
    const optionsRef = useRef(options)
    useEffect(() => {
        onLicenseSelectedRef.current = onLicenseSelected
        optionsRef.current = options
    })

    useEffect(() => {
        ensureLicenseSelectorStyles()

        const host = document.createElement('div')
        document.body.appendChild(host)

        const $anchor = $('<span/>')
        $anchor.licenseSelector({
            ...optionsRef.current,
            appendTo: host,
            onLicenseSelected: (license) => onLicenseSelectedRef.current(license),
        })
        instanceRef.current = $anchor.data('license-selector') as LicenseSelectorInstance

        return () => {
            instanceRef.current = null
            $anchor.off('click').removeData('license-selector')
            host.remove()
        }
    }, [])

    return (
        <Button variant={variant} icon={icon} onClick={() => instanceRef.current?.modal.show()}>
            {children ?? 'Select a license'}
        </Button>
    )
}
