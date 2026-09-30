<script setup>
import { useI18n } from '../../i18n/index.js';
import { useCopyToClipboard } from '../../composables/useCopyToClipboard.js';

const props = defineProps({ url: { type: String, default: '' } });

const { t } = useI18n();
const { copied, copy } = useCopyToClipboard();
</script>

<template>
  <div>
    <button type="button" class="share" :disabled="!props.url" @click="copy(props.url)">
      {{ t('quote.share') }}
    </button>
    <p v-if="copied" class="copied" role="status">{{ t('quote.shareCopied') }}</p>
  </div>
</template>

<style scoped>
/* Secondary to the summary button: same footprint, quieter surface, so the
   pair reads as two ways to hand the quote over rather than a choice to make. */
.share {
  width: 100%;
  padding: 0.65rem 1rem;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: transparent;
  color: var(--text-dim);
  font: 600 0.875rem/1 var(--font-sans);
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s, opacity 0.15s;
}

.share:hover:not(:disabled) {
  border-color: var(--accent);
  color: var(--accent);
}

.share:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.copied {
  margin: 0.5rem 0 0;
  color: var(--up);
  font-size: 0.75rem;
  text-align: center;
  line-height: 1.45;
}
</style>
