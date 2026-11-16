---
title: oneShotWallet
---

<script setup>
import PackageMetadata from '../../../components/PackageMetadata.vue'
import packageJson from '../../../../packages/connectors/package.json'

const packageName = '@wagmi/vue'
const connectorsPackageName = '@wagmi/vue/connectors'
const connectorDependencyVersion = packageJson.peerDependencies['@1shotapi/ows-provider']
</script>

<!-- @include: @shared/connectors/oneShotWallet.md -->
