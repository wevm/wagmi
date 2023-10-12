# init

Creates configuration file. If TypeScript is detected, the config file will use TypeScript and be named `wagmi.config.ts`. Otherwise, the config file will use JavaScript and be named `wagmi.config.js`.

## Usage

```bash
wagmi init 
```

## Options

### -c, --config \<path\>

`string`

Path to config file.

```bash
wagmi init --config wagmi.config.ts
```

### -r, --root \<path\>

`string`

Root path to resolve config from.

```bash
wagmi init --root path/to/root
```

### -h, --help

Displays help message.

```bash
wagmi init --help
```

