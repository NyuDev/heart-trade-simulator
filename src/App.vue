<script setup>
import AppHeader from './components/layout/AppHeader.vue';
import SponsorSlot from './components/layout/SponsorSlot.vue';
import AppFooter from './components/layout/AppFooter.vue';
import Simulator from './components/Simulator.vue';
import SharedTerms from './components/shared/SharedTerms.vue';
import { decodeState } from './share/decode.js';
import { cleanLocation, readFragment } from './share/hash.js';

// Read once, before anything is mounted, so a shared link decides what the
// page is rather than changing it a moment after it draws.
const shared = decodeState(readFragment());

// Two kinds of link open two different pages. A terms-only link carries a
// trade and not the settings behind it, so there is no form it could fill.
const terms = shared?.kind === 'result' ? shared : null;

const here = cleanLocation();
const siteUrl = here ? `${here.origin}${here.path}` : '';
</script>

<template>
  <div class="page">
    <AppHeader :intro="!terms" />

    <SharedTerms v-if="terms" :form="terms.form" :quote="terms.quote" :site-url="siteUrl" />
    <Simulator v-else :shared="shared" />

    <SponsorSlot />
    <AppFooter />
  </div>
</template>

<style scoped>
.page {
  max-width: 64rem;
  margin: 0 auto;
  padding: 2rem 1rem 3rem;
}
</style>
