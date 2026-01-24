---
title: metaMask
---

<script setup>
import PackageMetadata from '../../../components/PackageMetadata.vue'
import packageJson from '../../../../packages/connectors/package.json'

const docsPath = 'vue'
const packageName = '@wagmi/vue'
const connectorsPackageName = '@wagmi/vue/connectors'
const connectorDependencyVersion = packageJson.peerDependencies['@metamask/sdk']
</script>

<!-- @include: @shared/connectors/metaMask.md -->
