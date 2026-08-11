---
title: tempoWallet
---

<script setup>
import PackageMetadata from '../../components/PackageMetadata.vue'
import packageJson from '../../../packages/connectors/package.json'

const packageName = 'wagmi'
const connectorsPackageName = 'wagmi/tempo'
const connectorDependencyVersion = packageJson.peerDependencies['accounts']
</script>

<!-- @include: @shared/connectors/tempoWallet.md -->
