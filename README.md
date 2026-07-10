# DSW Plugin Template

Template repository to create DSW plugins.

## Get Started

1. Fill in the [project metadata](src/metadata.ts).
1. Define [settings](src/data/settings-data.ts) and [user settings](src/data/user-settings-data.ts) data using [zod](https://zod.dev).
    - If you don't want to have any settings, you can delete these files and use `PluginBuilder.createWithNoSettings` instead.
    - If you want just one, you can delete the other and create a null codec instead using `makeNullCodec()`.
1. Start implementing your plugin by defining the components in the [components](src/components) folder and adding them to the PluginBuilder in [plugin.ts](src/plugin.ts). See [@ds-wizard/plugin-sdk](https://github.com/ds-wizard/dsw-plugin-sdk) for more details.

## Useful Commands

- `npm run build` = creates a production build of the plugin
- `npm run dev` = watch for file changes and run the dev server (you can change the port in package.json)
- `npm run typecheck` = check for type errors
- `npm run lint` = run linter
- `npm run format` = format the code (however, it is more convenient to set up formatter directly in VS Code, see below)

### Formatter in VS Code

Create `.vscode/settings.json` for easier code editing:

```json
{
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## Readme and License

Update the rest of the readme and delete the template instructions. Update the license in [LICENSE](LICENSE) and [package.json](package.json).

---

# Plugin Name

_Plugin description._

Plugin UUID: `<UUID>`

## How to Install

See the [Plugins](https://guide.ds-wizard.org/en/latest/more/self-hosted-dsw/configuration/plugins.html) page in the DSW Guide for instructions on how to install the plugin.

## Changelog

### 0.1.0

Initial version...

## License

This project is licensed under the MIT License - see the
[LICENSE](LICENSE) file for more details.
