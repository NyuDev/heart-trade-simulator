<script setup>
import { computed } from 'vue';
import InfoBubble from '../form/InfoBubble.vue';
import { useI18n } from '../../i18n/index.js';
import { useCopyToClipboard } from '../../composables/useCopyToClipboard.js';
import { useDisclosure } from '../../composables/useDisclosure.js';

/**
 * One way of handing a quote over: a sentence someone can read, followed by
 * the link that reproduces it.
 *
 * Both go on the clipboard together. Pasting a bare link into a conversation
 * says nothing until the preview loads, and pasting a bare summary leaves the
 * other person no way to look at it themselves.
 *
 * What each button sends is worth knowing but not worth a paragraph sitting
 * under it for ever, so it waits on the button until someone looks at it.
 */

const props = defineProps({
  label: { type: String, required: true },
  note: { type: String, default: '' },
  summary: { type: String, required: true },
  url: { type: String, default: '' },
  quiet: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});

const { t } = useI18n();
const { copied, failed, copy } = useCopyToClipboard();
const { isOpen, open, close } = useDisclosure();

const payload = computed(() => (props.url ? `${props.summary}\n${props.url}` : props.summary));
</script>

<template>
  <div class="anchor" @mouseenter="open" @mouseleave="close">
    <button
      type="button"
      class="share"
      :class="{ quiet: props.quiet }"
      :disabled="props.disabled || !props.url"
      @click="copy(payload)"
      @focus="open"
      @blur="close"
    >
      {{ props.label }}
    </button>

    <Transition name="fade">
      <InfoBubble v-if="isOpen && props.note && !copied" :paragraphs="[props.note]" />
    </Transition>

    <p v-if="copied" class="said" role="status">{{ t('quote.shareCopied') }}</p>
    <p v-else-if="failed" class="said failed" role="status">{{ t('quote.shareFailed') }}</p>
  </div>
</template>

<style scoped>
.anchor {
  position: relative;
}

.share {
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

.share:hover:not(:disabled) {
  background: var(--accent);
  color: #05202e;
}

/* The second way of sharing is not a lesser one, but only one of the two can
   be the obvious thing to press. */
.quiet {
  border: 1px solid var(--line);
  background: transparent;
  color: var(--text-dim);
}

.quiet:hover:not(:disabled) {
  border-color: var(--accent);
  background: transparent;
  color: var(--accent);
}

.share:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.12s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.said {
  margin: 0.4rem 0 0;
  color: var(--up);
  font-size: 0.75rem;
  text-align: center;
}

.failed {
  color: var(--text-faint);
}
</style>
