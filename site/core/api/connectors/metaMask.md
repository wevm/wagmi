---
title: metaMask
---

<script setup>
import PackageMetadata from '../../../components/PackageMetadata.vue'
import packageJson from '../../../../packages/connectors/package.json'

const docsPath = 'core'
const packageName = '@wagmi/core'
const connectorsPackageName = '@wagmi/connectors'
const connectorDependencyVersion = packageJson.peerDependencies['@metamask/sdk']
</script>

<!-- @include: @shared/connectors/metaMask.md -->
