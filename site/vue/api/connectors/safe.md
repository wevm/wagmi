---
title: safe
---

<script setup>
import PackageMetadata from '../../../components/PackageMetadata.vue'
import packageJson from '../../../../packages/connectors/package.json'

const packageName = '@wagmi/vue'
const connectorsPackageName = '@wagmi/vue/connectors'
const connectorDependencyVersions = [
  packageJson.peerDependencies['@safe-global/safe-apps-provider'],
  packageJson.peerDependencies['@safe-global/safe-apps-sdk'],
]
</script>

<!-- @include: @shared/connectors/safe.md -->
