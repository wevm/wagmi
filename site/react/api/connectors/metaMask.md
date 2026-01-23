---
title: metaMask
---

<script setup>
import PackageMetadata from '../../../components/PackageMetadata.vue'
import packageJson from '../../../../packages/connectors/package.json'

const docsPath = 'react'
const packageName = 'wagmi'
const connectorsPackageName = 'wagmi/connectors'
const connectorDependencyVersion = packageJson.peerDependencies['@metamask/sdk']
</script>

<!-- @include: @shared/connectors/metaMask.md -->
