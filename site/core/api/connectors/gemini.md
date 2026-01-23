---
title: gemini
---

<script setup>
import PackageMetadata from '../../../components/PackageMetadata.vue'
import packageJson from '../../../../packages/connectors/package.json'

const docsPath = 'core'
const packageName = '@wagmi/core'
const connectorsPackageName = '@wagmi/connectors'
const connectorDependencyVersion = packageJson.peerDependencies['@gemini-wallet/core']
</script>

<!-- @include: @shared/connectors/gemini.md -->
