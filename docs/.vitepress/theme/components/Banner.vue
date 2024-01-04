// TODO: Dismissable, a11y, etc.
// https://github.com/faker-js/faker/pull/1487

<template>
  <div class="banner" flex font-medium items-center justify-center text-center text-sm>
    wagmi is in the Gitcoin Grants Beta Round. Click here to support development. Thank you 🙏
  </div>
</template>

<style>
html {
  --vp-layout-top-height: 30px;
}
</style>

<style scoped>
.banner {
  background: var(--vp-c-brand-darker);
  height: var(--vp-layout-top-height);
  position: sticky;
  top: 0;
  z-index: var(--vp-z-index-layout-top);
}

html:not(.dark) .banner {
  background: var(--vp-c-brand-lightest);
}
</style>