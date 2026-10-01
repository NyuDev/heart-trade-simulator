<script setup>
import { computed } from 'vue';
import { useI18n } from '../../i18n/index.js';
import { formatDuration, n, unit } from '../../format/index.js';

const props = defineProps({
  quote: { type: Object, default: null },
  caption: { type: String, default: '' },
});

const { t } = useI18n();

const deliveryText = computed(() => {
  const quote = props.quote;
  if (!quote || quote.hearts <= 0) return t('quote.empty');

  const shared = quote.delivery.sharedSpaces ? t('quote.sharedSuffix') : '';

  if (quote.delivery.mode === 'single') {
    return t('quote.single', { hearts: unit('hearts', quote.hearts), shared });
  }

  return t('quote.spread', {
    duration: formatDuration(quote.delivery.calendarDays),
    rate: unit('hearts', quote.delivery.ratePerPlayDay),
    playDays: quote.delivery.playDaysPerWeek,
    shared,
  });
});
</script>

<template>
  <div>
    <p class="caption">{{ props.caption || t('quote.caption') }}</p>
    <p class="price">
      <span class="value">{{ quote ? n(quote.hearts) : t('quote.empty') }}</span>
      <span class="unit">{{ t('quote.unit') }}</span>
    </p>
    <p class="delivery">{{ deliveryText }}</p>
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

.delivery {
  margin-top: 0.35rem;
  color: var(--text-dim);
  font-size: 0.875rem;
  line-height: 1.5;
}
</style>
