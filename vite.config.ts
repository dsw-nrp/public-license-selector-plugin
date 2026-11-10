import { fileURLToPath } from 'node:url'

import { emitManifestPlugin } from '@ds-wizard/plugin-sdk/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import { pluginMetadata } from './src/metadata.ts'

// The @ufal/license-selector ESM bundle does `import * as $ from 'jquery'` (and
// the same for lodash) and then calls `$(...)`. Vite/Rolldown resolve a
// namespace import to a non-callable namespace object, which crashes at load.
// Rewrite those two imports to default imports, which the bundler makes callable.
const rewriteInterop = (code: string) =>
    code
        .replace('import*as e from"jquery"', 'import e from"jquery"')
        .replace('import*as t from"lodash"', 'import t from"lodash"')

const isLicenseSelectorEsm = (id: string) =>
    id.includes('@ufal/license-selector') && id.includes('license-selector.esm.js')

// Applies the rewrite both in the build and in the dev dependency pre-bundler
// (Rolldown), which does not run the Vite plugin pipeline on optimized
// dependencies and so gets this plugin through `optimizeDeps.rolldownOptions`.
const fixLicenseSelectorJqueryInterop = () => ({
    name: 'fix-license-selector-jquery-interop',
    enforce: 'pre' as const,
    transform(code: string, id: string) {
        if (!isLicenseSelectorEsm(id)) {
            return null
        }
        // The rewrite only swaps two import statements on the bundle's single
        // line, so an empty sourcemap is fine (and avoids a bundler warning).
        return { code: rewriteInterop(code), map: { mappings: '' } }
    },
})

// The @ufal/license-selector stylesheet ships legacy IE6/7 `*prop`/`_prop`
// hacks. They are invalid CSS, so the CSS minifier warns on each one.
// Strip those declarations from the raw stylesheet before Vite's CSS pipeline
// runs — they do nothing in modern browsers.
const stripIeCssHacks = () => ({
    name: 'strip-ie-css-hacks',
    enforce: 'pre' as const,
    transform(code: string, id: string) {
        if (!id.includes('license-selector.css')) {
            return null
        }
        const cleaned = code.replace(/^[ \t]*[*_][\w-]+[ \t]*:[^;\n{}]*;[ \t]*$/gm, '')
        return cleaned === code ? null : { code: cleaned, map: { mappings: '' } }
    },
})

export default defineConfig(({ mode }) => {
    const isProd = mode === 'production'

    return {
        plugins: [stripIeCssHacks(), fixLicenseSelectorJqueryInterop(), react()],

        optimizeDeps: {
            rolldownOptions: {
                plugins: [fixLicenseSelectorJqueryInterop()],
            },
        },

        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },

        preview: {
            cors: true,
        },

        // Ensure the bundle works in a plain browser host (no Node "process")
        define: {
            'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
            'process.env': JSON.stringify({}),
            process: JSON.stringify({ env: {} }),
        },

        build: {
            lib: {
                entry: {
                    plugin: 'src/plugin.ts',
                },
                formats: ['es'],
                fileName: (_, name) => `${name}.js`,
            },

            // Dev: readable + sourcemaps
            // Prod: aggressive minify + hidden sourcemaps
            sourcemap: isProd ? 'hidden' : true,
            minify: isProd ? 'terser' : 'oxc',

            // Only applies when minify === 'terser'
            terserOptions: isProd
                ? {
                      compress: {
                          passes: 2,
                          drop_console: true,
                          drop_debugger: true,
                      },
                      format: {
                          comments: false,
                      },
                      mangle: true,
                  }
                : undefined,

            emptyOutDir: true,

            // Inline every asset (e.g. the license-selector icon fonts referenced
            // from its CSS) as a data URI so the plugin stays a single file.
            assetsInlineLimit: () => true,

            // Single-file bundle (handy for plugin loaders)
            rolldownOptions: {
                output: {
                    codeSplitting: false,
                },
                plugins: [emitManifestPlugin(pluginMetadata)],
            },
        },
    }
})
