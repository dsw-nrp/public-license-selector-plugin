# public-license-selector-plugin

_DSW plugin integrating [Public License Selector](https://github.com/ufal/public-license-selector) for integration questions._

Plugin UUID: `6f4ead79-b460-4c07-a98c-40d18dc1f484`

## How to Install

See the [Plugins](https://guide.ds-wizard.org/en/latest/more/self-hosted-dsw/configuration/plugins.html) page in the DSW Guide for instructions on how to install the plugin.

## Development

- `npm run build` = type-checks, lints and creates a production build of the plugin in `dist`
- `npm run dev` = watches for changes and serves the plugin on port 4173, to point the wizard at

The plugin needs Node.js 22.12 or newer.

`lodash` is intentionally kept on 3.x: `@ufal/license-selector` calls lodash 3 functions (`contains`, `any`, `all`, `where`) that were removed in lodash 4.

## Changelog

### 0.3.0

- Updated to DSW Plugin SDK 0.12.0 (requires Wizard 5.0 or newer)
- The plugin is drawn with the wizard's design system (SDK UI components) instead of Bootstrap classes, so it follows the wizard's theme including dark mode
- Updated dependencies (Vite 8, ESLint 10, TypeScript 6, React 19.3)

### 0.2.0

- Updated to DSW Plugin SDK 0.11.0 (requires Wizard 4.35 or newer)
- Updated dependencies

### 0.1.0

Initial version with public license selector.

## License

This project is licensed under the MIT License - see the
[LICENSE](LICENSE) file for more details.

## Acknowledgements

|     |     |
| --- | --- |
| ![EU and MŠMT](https://dmp.eosc.cz/static/eu-msmt.svg) | This work is supported by the project National Repository Platform for Research Data no. [CZ.02.01.01/00/23_014/0008787](https://www.eosc.cz/en/projects/national-repository-platform-for-research-data-os-i-nrp/national-repository-platform). |
