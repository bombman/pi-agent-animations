# pi-agent-animations

Cute animated widgets and tiny ambient animations for the [pi coding agent](https://pi.dev/) TUI.

This package starts with a tiny walking cat, and is designed to grow into a collection of small animations for pi agent.

## Animations

### Walking Cat

A tiny cat walks left and right below the pi editor.

```text
ᓚᘏᗢ        →
        ᗢᘏᓗ ←
```

Commands:

```text
/cat       # toggle on/off
/cat on    # turn on
/cat off   # turn off
```

## Install

### From GitHub

Install globally with pi:

```bash
pi install git:github.com/bombman/pi-agent-animations
```

Or test without installing:

```bash
pi -e git:github.com/bombman/pi-agent-animations
```

Then reload pi:

```text
/reload
```

### Local development

Clone or use this folder locally:

```bash
pi install /path/to/pi-agent-animations
```

Or run temporarily:

```bash
pi -e /path/to/pi-agent-animations
```

## Package structure

```text
pi-agent-animations/
├── extensions/
│   └── cat-animation.ts
├── package.json
└── README.md
```

`package.json` includes a `pi` manifest so pi can auto-load everything in `extensions/`.

## Roadmap

Ideas for future animations:

- 🐈 more cat styles
- 🐕 walking dog
- 🐇 jumping rabbit
- 🚀 rocket launch
- 🌧️ rain / snow
- 🌙 moon and stars
- 🐟 swimming fish
- custom user-selectable animation command

## Development

Add new animations under:

```text
extensions/
```

Each animation should be a normal pi extension exporting a default function:

```ts
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  // register widgets, commands, events, etc.
}
```

## License

MIT
