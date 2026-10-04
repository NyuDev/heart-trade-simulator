<script setup>
import { computed } from 'vue';
import { useI18n } from '../../i18n/index.js';
import { coarseDuration, heartsPerEuro, n, unit } from '../../format/index.js';

/**
 * The price, and what it costs to repay.
 *
 * The delivery used to be one sentence running a rough duration, an exact day
 * count, a pace and a weekly rhythm together behind an em dash. Four facts in
 * a row read as none. The one a reader wants first stands on its own line, and
 * the rest sit under it as separate values.
 */

const props = defineProps({
  quote: { type: Object, default: null },
  caption: { type: String, default: '' },
  /** The sum the quote was worked out for, so the rate can be shown beside it. */
  amount: { type: Number, default: 0 },
});

const { t } = useI18n();

const rate = computed(() => heartsPerEuro(props.quote, props.amount));

const delivery = computed(() => {
  const quote = props.quote;
  if (!quote || quote.hearts <= 0) return { lead: t('quote.empty'), parts: [] };

  const { calendarDays, mode, playDaysPerWeek, ratePerPlayDay, sharedSpaces } = quote.delivery;
  const shared = sharedSpaces ? [t('quote.sharedShort')] : [];

  if (mode === 'single') {
    return { lead: t('quote.single', { hearts: unit('hearts', quote.hearts) }), parts: shared };
  }

  return {
    lead: t('quote.about', { value: coarseDuration(calendarDays) }),
    parts: [
      unit('days', calendarDays),
      t('quote.pace', { rate: unit('hearts', ratePerPlayDay) }),
      t('quote.week', { n: playDaysPerWeek }),
      ...shared,
    ],
  };
});
</script>

<template>
  <div>
    <p class="caption">{{ props.caption || t('quote.caption') }}</p>
    <p class="price">
      <span class="value">{{ quote ? n(quote.hearts) : t('quote.empty') }}</span>
      <span class="unit">{{ t('quote.unit') }}</span>
      <span v-if="rate" class="rate">{{ rate }}</span>
    </p>
    <p class="lead">{{ delivery.lead }}</p>
    <ul v-if="delivery.parts.length" class="meta">
      <li v-for="part in delivery.parts" :key="part">{{ part }}</li>
    </ul>
  </div>
</template>

<style scoped>
.caption {
  margin: 0;
  color: var(--text-faint);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.price {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.value {
  color: var(--price);
  font-size: 2.25rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  line-height: 1.1;
}

.unit {
  color: var(--text-dim);
  font-size: 1.125rem;
}

/* With the unit rather than under the price: it is a reading of the same
   number, not a second fact. */
.rate {
  color: var(--text-faint);
  font-size: 0.8125rem;
  font-variant-numeric: tabular-nums;
}

.lead {
  margin-top: 0.4rem;
  color: var(--text);
  font-size: 0.9375rem;
  line-height: 1.4;
}

/* The exact figures behind the rough one, each its own value rather than a
   clause in a sentence. */
.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem 0.55rem;
  margin: 0.3rem 0 0;
  padding: 0;
  color: var(--text-dim);
  font-size: 0.8125rem;
  list-style: none;
}

.meta li + li {
  display: flex;
  gap: 0.55rem;
}

.meta li + li::before {
  color: var(--text-faint);
  content: '·';
}
</style>
