<script lang="ts">
import { useConfig } from '$lib/hooks/useConfig.svelte.js'

const config = $derived.by(useConfig())
</script>

<pre>{JSON.stringify(config, null, 2)}</pre>