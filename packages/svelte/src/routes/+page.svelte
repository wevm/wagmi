<script lang="ts">
import { useBlockNumber } from '$lib/hooks/useBlockNumber.svelte.js'
import { useConfig } from '$lib/hooks/useConfig.svelte.js'
import Connect from './_components/Connect.svelte'
import ReadContract from './_components/ReadContract.svelte'
</script>

<Connect />
<ReadContract />
