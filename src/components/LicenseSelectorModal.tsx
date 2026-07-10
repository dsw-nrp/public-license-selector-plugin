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
    /** Class for the trigger button (defaults to a Bootstrap secondary button). */
    className?: string
    /** Extra options forwarded to the underlying jQuery license selector. */
    options?: Omit<LicenseSelectorOptions, 'onLicenseSelected' | 'appendTo'>
}

/**
 * Trigger button that opens the @ufal/license-selector modal.
 *
 * The underlying library renders its own full-screen modal overlay and calls
 * back with the selected license. We mount it on a hidden host element attached
 * directly to `document.body` so the fixed overlay is positioned against the
 * viewport (unaffected by any transformed ancestor) and is cleaned up together
 * with this component.
 */
export default function LicenseSelectorModal({
    onLicenseSelected,
    children,
    className,
    options,
}: LicenseSelectorModalProps) {
    const buttonRef = useRef<HTMLButtonElement>(null)

    // Keep the latest callback in a ref: the jQuery plugin captures its options
    // once at init, so this avoids calling a stale closure on later renders.
    const onLicenseSelectedRef = useRef(onLicenseSelected)
    onLicenseSelectedRef.current = onLicenseSelected

    const optionsRef = useRef(options)
    optionsRef.current = options

    useEffect(() => {
        ensureLicenseSelectorStyles()

        const button = buttonRef.current
        if (!button) {
            return
        }

        const host = document.createElement('div')
        document.body.appendChild(host)

        const $button = $(button)
        $button.licenseSelector({
            ...optionsRef.current,
            appendTo: host,
            onLicenseSelected: (license) => onLicenseSelectedRef.current(license),
        })

        return () => {
            $button.off('click').removeData('license-selector')
            host.remove()
        }
    }, [])

    return (
        <button ref={buttonRef} type="button" className={className ?? 'btn btn-secondary'}>
            {children ?? 'Select a license'}
        </button>
    )
}
