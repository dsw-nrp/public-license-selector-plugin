// Runtime glue for the @ufal/license-selector jQuery plugin.
//
// Importing the ESM bundle for its side effect registers the plugin on
// `$.fn.licenseSelector` (see the `fixLicenseSelectorJqueryInterop` plugin in
// vite.config.ts, which rewrites its jQuery/lodash imports so the bundler makes
// them callable). The stylesheet references icon-font files via relative
// `url(...)`; Vite inlines those as data URIs (see `build.assetsInlineLimit`) so
// the plugin stays a single self-contained bundle. We inject the CSS text into
// the document head once, on demand.

import './jquery-compat'
import '@ufal/license-selector/dist/license-selector.esm.js'

import cssText from '@ufal/license-selector/dist/license-selector.css?inline'

export type { LicenseDefinition, LicenseSelectorOptions } from '@ufal/license-selector'

const STYLE_ELEMENT_ID = 'ufal-license-selector-styles'

let stylesInjected = false

/** Inject the license-selector stylesheet into the document head exactly once. */
export function ensureLicenseSelectorStyles(): void {
    if (stylesInjected || typeof document === 'undefined') {
        return
    }

    if (!document.getElementById(STYLE_ELEMENT_ID)) {
        const style = document.createElement('style')
        style.id = STYLE_ELEMENT_ID
        style.textContent = cssText
        document.head.appendChild(style)
    }

    stylesInjected = true
}
