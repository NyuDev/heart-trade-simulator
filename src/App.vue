<script setup>
import AppHeader from './components/layout/AppHeader.vue';
import QuoteForm from './components/form/QuoteForm.vue';
import QuotePanel from './components/quote/QuotePanel.vue';
import { createQuoteForm } from './state/quoteForm.js';
import { useLimits } from './composables/useLimits.js';
import { useQuote } from './composables/useQuote.js';

const form = createQuoteForm();
const { limits } = useLimits();
const { quote, error, pending, retryInSeconds } = useQuote(form);
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
