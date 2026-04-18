---
title: tempoWallet
---

<script setup>
import PackageMetadata from '../../../components/PackageMetadata.vue'
import packageJson from '../../../../packages/connectors/package.json'

const packageName = '@wagmi/solid'
const connectorsPackageName = '@wagmi/solid/connectors'
const connectorDependencyVersion = packageJson.peerDependencies['accounts']
</script>

<!-- @include: @shared/connectors/tempoWallet.md -->
