---
title: walletConnect
---

<script setup>
import PackageMetadata from '../../../components/PackageMetadata.vue'
import packageJson from '../../../../packages/connectors/package.json'

const packageName = '@wagmi/vue'
const connectorsPackageName = '@wagmi/vue/connectors'
const connectorDependencyVersion = packageJson.peerDependencies['@walletconnect/ethereum-provider']
</script>

<!-- @include: @shared/connectors/walletConnect.md -->
