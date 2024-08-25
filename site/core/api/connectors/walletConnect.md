import { walletConnect } from '@wagmi/connectors'

const connector = walletConnect({
  projectId: '3fcc6bba6f1de962d911bb5b5c3dba68',
  qrModalOptions: { 
    themeMode: 'dark', 
  }, 
})<script setup>
const packageName = '@wagmi/core'
const connectorsPackageName = '@wagmi/connectors'
</script>

<!-- @include: @shared/connectors/walletConnect.md -->
