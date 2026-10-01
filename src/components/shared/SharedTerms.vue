<script setup>
import { computed } from 'vue';
import PriceHeadline from '../quote/PriceHeadline.vue';
import { useI18n } from '../../i18n/index.js';
import { formatDuration, n, unit } from '../../format/index.js';

/**
 * What a terms-only link opens on.
 *
 * Deliberately not the simulator. A link of this kind carries the trade and
 * not the appraisal behind it, so showing a form would mean either filling it
 * with settings nobody chose or showing a price that does not follow from what
 * is on screen. This states the terms and offers a fresh start instead.
 */

const props = defineProps({
  form: { type: Object, required: true },
  quote: { type: Object, required: true },
  siteUrl: { type: String, default: '' },
});

const { t } = useI18n();

const rows = computed(() => {
  const { delivery, hearts } = props.quote;

  const out = [
    { key: 'paid', label: t('shared.paid'), value: `${n(props.form.amountEur)} €` },
    { key: 'hearts', label: t('shared.hearts'), value: unit('hearts', hearts) },
  ];

  if (delivery.mode === 'single') {
    out.push({ key: 'pace', label: t('shared.pace'), value: t('shared.paceSingle') });
    return out;
  }

  out.push({
    key: 'duration',
    label: t('shared.duration'),
    value: formatDuration(delivery.calendarDays),
  });
  // Just the pace: the duration has a row of its own directly above.
  out.push({
    key: 'pace',
    label: t('shared.pace'),
    value: t('shared.paceValue', {
      rate: unit('hearts', delivery.ratePerPlayDay),
      playDays: delivery.playDaysPerWeek,
    }),
  });

  return out;
});
</script>

<template>
  <section class="terms">
    <p class="intro">{{ t('shared.intro') }}</p>

    <PriceHeadline :quote="props.quote" :caption="t('shared.title')" />

    <h2 class="caption">{{ t('shared.termsTitle') }}</h2>
    <dl class="rows">
      <template v-for="row in rows" :key="row.key">
        <dt>{{ row.label }}</dt>
        <dd>{{ row.value }}</dd>
      </template>
      <template v-if="props.form.sharedSpaces">
        <dt>&nbsp;</dt>
        <dd>{{ t('shared.sharedSpaces') }}</dd>
      </template>
    </dl>

    <p class="caution">{{ t('shared.caution') }}</p>

    <a v-if="props.siteUrl" class="cta" :href="props.siteUrl">{{ t('shared.openCta') }}</a>

    <p class="privacy">{{ t('shared.privacy') }}</p>
  </section>
</template>

<style scoped>
.terms {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 34rem;
  margin: 0 auto;
  padding: 1.75rem;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: var(--surface);
}

.intro {
  margin: 0;
  color: var(--text-dim);
  font-size: 0.9rem;
  line-height: 1.5;
}

.caption {
  margin: 0;
  color: var(--text-faint);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.rows {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem 1.25rem;
  margin: 0;
}

.rows dt {
  color: var(--text-faint);
  font-size: 0.8rem;
}

.rows dd {
  margin: 0;
  color: var(--text);
  font-size: 0.9rem;
  font-weight: 600;
  text-align: right;
}

.caution {
  margin: 0;
  padding: 0.85rem 1rem;
  border-left: 2px solid var(--down, #fb7185);
  border-radius: 0 var(--radius) var(--radius) 0;
  background: color-mix(in srgb, var(--surface) 70%, transparent);
  color: var(--text-dim);
  font-size: 0.8rem;
  line-height: 1.5;
}

.cta {
  padding: 0.7rem 1rem;
  border-radius: var(--radius);
  background: var(--accent-strong);
  color: #fff;
  font: 600 0.875rem/1 var(--font-sans);
  text-align: center;
  text-decoration: none;
}

.cta:hover {
  background: var(--accent);
  color: #05202e;
}

.privacy {
  margin: 0;
  color: var(--text-faint);
  font-size: 0.72rem;
  text-align: center;
}
</style>
