<script setup>
import { useI18n } from '../../i18n/index.js';
import { useCopyToClipboard } from '../../composables/useCopyToClipboard.js';

const props = defineProps({
  summary: { type: String, required: true },
  disabled: { type: Boolean, default: false },
});

const { t } = useI18n();
const { copied, failed, copy } = useCopyToClipboard();
</script>

<template>
  <div>
    <button type="button" class="copy" :disabled="disabled" @click="copy(props.summary)">
      {{ t('quote.copy') }}
    </button>
    <p v-if="copied" class="copied" role="status">{{ t('quote.copied') }}</p>
    <p v-else-if="failed" class="failed" role="status">{{ t('quote.copyFailed') }}</p>
  </div>
</template>

<style scoped>
.copy {
  width: 100%;
  padding: 0.65rem 1rem;
  border: none;
  border-radius: var(--radius);
  background: var(--accent-strong);
  color: #fff;
  font: 600 0.875rem/1 var(--font-sans);
  cursor: pointer;
  transition: background 0.15s, opacity 0.15s;
}

.copy:hover:not(:disabled) {
  background: var(--accent);
  color: #05202e;
}

.copy:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.copied,
.failed {
  margin: 0.5rem 0 0;
  color: var(--up);
  font-size: 0.75rem;
  text-align: center;
}

.failed {
  color: var(--text-faint);
}
</style>
