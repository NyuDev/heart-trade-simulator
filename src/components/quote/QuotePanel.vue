<script setup>
import { computed } from 'vue';
import PriceHeadline from './PriceHeadline.vue';
import CopySummaryButton from './CopySummaryButton.vue';
import ShareLinkButton from './ShareLinkButton.vue';
import QuoteError from './QuoteError.vue';
import QuoteNotes from './QuoteNotes.vue';
import FactorList from './FactorList.vue';
import { useI18n } from '../../i18n/index.js';
import { buildSummary } from '../../format/index.js';

const props = defineProps({
  form: { type: Object, required: true },
  quote: { type: Object, default: null },
  error: { type: Object, default: null },
  pending: { type: Boolean, default: false },
  retryInSeconds: { type: Number, default: 0 },
  shareUrl: { type: String, default: '' },
});

const { t } = useI18n();
const summary = computed(() => buildSummary(props.form, props.quote));
</script>

<template>
  <aside class="panel" :class="{ stale: pending }">
    <PriceHeadline :quote="quote" />

    <CopySummaryButton :summary="summary" :disabled="!quote" />

    <ShareLinkButton :url="shareUrl" />

    <QuoteError :error="error" :retry-in-seconds="retryInSeconds" />

    <template v-if="quote">
      <hr class="rule" />

      <section>
        <h2 class="caption">{{ t('quote.factorsTitle') }}</h2>
        <FactorList :factors="quote.factors" class="list" />
      </section>

      <QuoteNotes :quote="quote" />
    </template>
  </aside>
</template>

<style scoped>
.panel {
  position: sticky;
  top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: var(--surface);
  transition: opacity 0.2s;
}

/* The panel fades while recalculating instead of emptying the screen, so the
   previous value stays visible and nothing flickers. */
.stale {
  opacity: 0.55;
}

.caption {
  margin: 0;
  color: var(--text-faint);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.rule {
  height: 1px;
  margin: 0;
  border: none;
  background: var(--line);
}

.list {
  margin-top: 0.7rem;
}
</style>
