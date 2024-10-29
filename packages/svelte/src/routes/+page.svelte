<script lang="ts">
import { useBlockNumber } from '$lib/hooks/useBlockNumber.svelte.js'
import { useConfig } from '$lib/hooks/useConfig.svelte.js'
import ReadContract from './_components/ReadContract.svelte'

const config = $derived.by(useConfig())
const blockNumber = $derived.by(useBlockNumber())

const replacer = (key, value) =>
  typeof value === 'bigint' ? value.toString() : value
</script>

<ReadContract />
