<script setup>
import { computed, ref, watch } from 'vue';
import QuoteForm from './form/QuoteForm.vue';
import QuotePanel from './quote/QuotePanel.vue';
import { createQuoteForm } from '../state/quoteForm.js';
import { bakedQuote } from '../state/defaultQuote.js';
import { useLimits } from '../composables/useLimits.js';
import { useQuote } from '../composables/useQuote.js';
import { useShareableUrl } from '../composables/useShareableUrl.js';

/** The form and its answer. Read once at creation; nothing here remounts. */
const props = defineProps({ shared: { type: Object, default: null } });

const form = createQuoteForm(props.shared?.form);

// What to show before anything is asked of the server: the result a shared
// link carries, or the reply baked in for the untouched form. Either way the
// first paint is a real price and costs no request.
const opening = props.shared ? props.shared.quote : bakedQuote();

const { quote, error, pending, snapshot, retryInSeconds } = useQuote(form, {
  initialQuote: opening,
});

// Flips the first time the visitor changes something. Until then the server
// hears nothing, and the address bar stays exactly as they found it.
const interacted = ref(false);
watch(form, () => (interacted.value = true), { deep: true });

// Nothing was baked and no link carried a result: a request is going out
// anyway, so the bounds may as well come with it.
const { limits } = useLimits(computed(() => interacted.value || !opening));

// A visitor who only reads the page leaves with the address they arrived on.
// A link they opened already holds a code, so that one stays in step.
const { shareUrl, termsUrl } = useShareableUrl(
  snapshot,
  computed(() => interacted.value || Boolean(props.shared)),
);
</script>

<template>
  <div class="layout">
    <QuoteForm :form="form" :limits="limits" :quote="quote" />

    <QuotePanel
      :form="form"
      :quote="quote"
      :error="error"
      :pending="pending"
      :retry-in-seconds="retryInSeconds"
      :share-url="shareUrl"
      :terms-url="termsUrl"
    />
  </div>
</template>

<style scoped>
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
