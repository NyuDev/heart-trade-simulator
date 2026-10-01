<script setup>
import { computed } from 'vue';
import { beta } from '../../state/siteConfig.js';
import { useI18n } from '../../i18n/index.js';

const { locale, t } = useI18n();

// The owner's wording when they wrote one for this language, the interface's
// own otherwise. Switching language re-reads without re-fetching the file.
const label = computed(
  () => beta.value.label?.[locale.value] ?? beta.value.label?.en ?? t('app.beta'),
);
</script>

<template>
  <span v-if="beta.show" class="badge">{{ label }}</span>
</template>

<style scoped>
.badge {
  padding: 0.15rem 0.45rem;
  border: 1px solid var(--accent);
  border-radius: 999px;
  color: var(--accent);
  font: 600 0.625rem/1.4 var(--font-sans);
  letter-spacing: 0.06em;
  text-transform: lowercase;
  white-space: nowrap;
}
</style>
