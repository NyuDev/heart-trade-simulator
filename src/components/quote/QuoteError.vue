<script setup>
import { computed } from 'vue';
import { useI18n } from '../../i18n/index.js';

const props = defineProps({
  error: { type: Object, default: null },
  retryInSeconds: { type: Number, default: 0 },
});

const { t } = useI18n();

/** The server returns codes; this is where they become a sentence. */
const CODE_MESSAGES = {
  invalid_input: 'errors.invalid',
  network_error: 'errors.network',
  not_configured: 'errors.notConfigured',
};

const text = computed(() => {
  if (!props.error) return null;
  if (props.error.isRateLimited) {
    return t('errors.rateLimited', { n: props.retryInSeconds });
  }
  return t(CODE_MESSAGES[props.error.code] ?? 'errors.unknown');
});
</script>

<template>
  <p v-if="text" class="error" role="alert">{{ text }}</p>
</template>

<style scoped>
.error {
  margin: 0;
  padding: 0.6rem 0.7rem;
  border: 1px solid rgb(251 191 36 / 30%);
  border-radius: var(--radius);
  background: var(--warn-soft);
  color: var(--warn);
  font-size: 0.78rem;
  line-height: 1.5;
}
</style>
