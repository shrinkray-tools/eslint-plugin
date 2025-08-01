# @shrinkray-tools/eslint-plugin

ESLint rules for performance-first development, built to catch common frontend slowdowns before they reach production.

Part of the [ShrinkRay Tools](https://github.com/shrinkray-tools) suite, open source tools to help you keep web performance fast by default.

## What It Does

This plugin adds performance-focused ESLint rules to catch:

- Oversized imports (like `moment`, `aws-sdk`, or full `lodash`)
- Future: render-blocking patterns, large inline styles, client-only hydration

## Installation

```bash
npm install --save-dev @shrinkray-tools/eslint-plugin
```

---

## Usage

Add it to your ESLint config:

### Manual Rule Setup

```json
{
  "plugins": ["@shrinkray-tools"],
  "rules": {
    "@shrinkray-tools/no-large-imports": "warn"
  }
}
```

### Recommended Config

Use the built-in `recommended` preset to enable safe default rules:

```json
{
  "extends": ["plugin:@shrinkray-tools/recommended"]
}
```

---

## Rules

### `no-large-imports`

Warns when known large libraries are imported directly. Helps teams avoid bundle bloat by catching heavy or legacy dependencies early.

#### Warned Libraries

| Library     | Approx Size |
|-------------|--------------|
| `moment`    | ~300 KB      |
| `lodash`    | ~200 KB      |
| `date-fns`  | ~180 KB      |
| `chart.js`  | ~300 KB      |
| `aws-sdk`   | ~500 KB      |
| `three`     | ~450 KB      |

> These are rough estimates of uncompressed ESM/UMD import costs and may vary by usage.

---

## Coming Soon

- `no-hydration-only-components`
- `no-render-blocking-fonts`
- `warn-large-inline-style`

---

## Local Development

If you're working on this plugin locally:

```bash
npm install
npm run test
```

To test the plugin inside another repo locally:

```bash
npm link
cd your-project
npm link @shrinkray-tools/eslint-plugin
```

---

## Related Projects

- [ShrinkRay Analyzer](https://github.com/shrinkray-tools/shrinkray-analyzer) – script and resource analysis via headless browser
- [ShrinkRay CLI](https://github.com/shrinkray-tools/shrinkray-cli) – coming soon

---

## License

MIT License © [Den Odell](https://github.com/denodell)
