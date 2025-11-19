---
title: porto
---

<script setup>
import PackageMetadata from '../../../components/PackageMetadata.vue'
import packageJson from '../../../../packages/connectors/package.json'

const packageName = 'wagmi'
const connectorsPackageName = 'wagmi/connectors'
const connectorDependencyVersion = packageJson.peerDependencies['porto']
</script>

<!-- @include: @shared/connectors/porto.md -->
