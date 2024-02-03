# Solid wagmi

Solid signals for Ethereum

## Installation

```bash
pnpm add solid-wagmi viem @tanstack/solid-query
```

## Documentation

For documentation and guides, visit [wagmi.sh](https://wagmi.sh).

## TODOS

## Issues found:

1. in `utils/query` & `types/properties`:
- Wagmi's Omit breaks the types, so it was commented out.
- `'initialData'` throws a type error.

2. Error in createClient:
- I'm not able to make it a store since it can also be undefined
- Type error on subscription

3. createConnect:
- the return values from Tanstack are stores so they can not be destructured.