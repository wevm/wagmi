---
title: gemini
---

<script setup>
import PackageMetadata from '../../../components/PackageMetadata.vue'
import packageJson from '../../../../packages/connectors/package.json'

const packageName = '@wagmi/vue'
const connectorsPackageName = '@wagmi/connectors'
const connectorDependencyVersion = packageJson.peerDependencies['@gemini-wallet/core']
</script>

<!-- @include: @shared/connectors/gemini.md -->
