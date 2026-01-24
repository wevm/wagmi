<script setup>
import PackageMetadata from '../../../components/PackageMetadata.vue'
import packageJson from '../../../../packages/connectors/package.json'

const packageName = 'wagmi'
const connectorsPackageName = 'wagmi/connectors'
const connectorDependencyVersion = packageJson.peerDependencies['@coinbase/wallet-sdk']
</script>

<!-- @include: @shared/connectors/coinbaseWallet.md -->
