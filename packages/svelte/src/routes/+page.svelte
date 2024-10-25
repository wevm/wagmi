<script lang="ts">
import { useBlockNumber } from '$lib/hooks/useBlockNumber.svelte.js'
import { useConfig } from '$lib/hooks/useConfig.svelte.js'

const config = $derived.by(useConfig())
const blockNumber = $derived.by(useBlockNumber())

const replacer = (key, value) =>
  typeof value === 'bigint' ? value.toString() : value
</script>

<pre>{JSON.stringify(config, null, 2)}</pre>

<pre>{JSON.stringify(blockNumber, replacer, 2)}</pre>
