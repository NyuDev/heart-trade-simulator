<script setup>
import { computed } from 'vue';
import { useI18n } from '../../i18n/index.js';

const props = defineProps({ quote: { type: Object, required: true } });

const { t } = useI18n();

/**
 * Notes about the quote, from the most specific to the most general.
 *
 * The forced minimum wins over the bounds: once it applies, talking about a
 * floor or a ceiling would no longer make sense.
 */
const notes = computed(() => {
  const { advance, hints } = props.quote;
  const lines = [];

  if (advance.capped) {
    lines.push(t('quote.cappedNote', { requested: advance.requested, applied: advance.applied }));
  }

  if (hints.roundingOverride) lines.push(t('quote.roundingNote'));
  else if (hints.atFloor) lines.push(t('quote.atFloorNote'));
  else if (hints.atCeiling) lines.push(t('quote.atCeilingNote'));

  return lines;
});
</script>

<template>
  <p v-for="(note, index) in notes" :key="index" class="note">{{ note }}</p>
</template>

<style scoped>
.note {
  margin: 0;
  color: var(--text-faint);
  font-size: 0.75rem;
  line-height: 1.55;
}
</style>
