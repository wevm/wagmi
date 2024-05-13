# generate

Generates code based on configuration, using `contracts` and `plugins`.

## Usage

```bash
wagmi generate 
```

## Options

### -c, --config \<path\>

`string`

Path to config file.

```bash
wagmi generate --config wagmi.config.ts
```

### -r, --root \<path\>

`string`

Root path to resolve config from.

```bash
wagmi generate --root path/to/root
```

### -w, --watch

`boolean`

Watch for changes (for plugins that support watch mode).

```bash
wagmi generate --watch
```

### -h, --help

Displays help message.

```bash
wagmi generate --help
```