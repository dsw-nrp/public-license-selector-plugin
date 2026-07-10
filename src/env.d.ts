/// <reference types="vite/client" />

// The .esm.js subpath ships no types of its own; it only registers the jQuery
// plugin as a side effect. The typed API (LicenseDefinition and the
// `$.fn.licenseSelector` augmentation) comes from the package root types
// imported in licenseSelector.ts.
declare module '@ufal/license-selector/dist/license-selector.esm.js'
