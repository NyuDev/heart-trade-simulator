<script setup>
import { ref, watch } from 'vue';
import AppHeader from './components/layout/AppHeader.vue';
import QuoteForm from './components/form/QuoteForm.vue';
import QuotePanel from './components/quote/QuotePanel.vue';
import { createQuoteForm } from './state/quoteForm.js';
import { decodeState } from './share/decode.js';
import { readFragment } from './share/hash.js';
import { useLimits } from './composables/useLimits.js';
import { useQuote } from './composables/useQuote.js';
import { useShareableUrl } from './composables/useShareableUrl.js';

// Read once, before anything is mounted, so a shared link decides the opening
// settings rather than overwriting them a moment later.
const shared = decodeState(readFragment());

const form = createQuoteForm(shared?.form);
const { quote, error, pending, snapshot, retryInSeconds } = useQuote(form, {
  initialQuote: shared?.quote ?? null,
});

// A link that arrived with its result attached owes the server nothing until
// the visitor moves something: the bounds can wait until then too.
const needsServer = ref(!shared?.quote);
watch(form, () => (needsServer.value = true), { deep: true });

const { limits } = useLimits(needsServer);

const { shareUrl } = useShareableUrl(snapshot);
</script>

<template>
  <div class="page">
    <AppHeader />

    <div class="layout">
      <QuoteForm :form="form" :limits="limits" :quote="quote" />

      <QuotePanel
        :form="form"
        :quote="quote"
        :error="error"
        :pending="pending"
        :retry-in-seconds="retryInSeconds"
        :share-url="shareUrl"
      />
    </div>
  </div>
</template>

<style scoped>
.page {
  max-width: 64rem;
  margin: 0 auto;
  padding: 2rem 1rem 3rem;
}

.layout {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
}

@media (min-width: 62rem) {
  .layout {
    grid-template-columns: 3fr 2fr;
    align-items: start;
  }
}
</style>
