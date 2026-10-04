<script setup>
import { computed, ref } from 'vue';
import LinkIcon from './LinkIcon.vue';
import { useI18n } from '../../i18n/index.js';
import { useCopyToClipboard } from '../../composables/useCopyToClipboard.js';

/**
 * The two ways of handing a quote over, and one line explaining whichever is
 * under the pointer.
 *
 * The explanation was a bubble anchored to each button, which opened straight
 * onto the other one: at a usual width it covered it completely. A line below
 * the pair cannot overlap anything, and the slot keeps its height whether or
 * not it holds anything, so hovering never shifts the panel.
 *
 * One clipboard between the two buttons on purpose — only one of them can have
 * been pressed, and the confirmation belongs to that press.
 */

const props = defineProps({
  terms: { type: String, required: true },
  summary: { type: String, required: true },
  termsUrl: { type: String, default: '' },
  shareUrl: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
});

const { t } = useI18n();
const { copied, failed, copy } = useCopyToClipboard();

const hint = ref('');

/** Which button was last pressed, so the confirmation names what it copied. */
const sent = ref('');

const actions = computed(() => [
  {
    key: 'result',
    label: t('quote.shareResult'),
    note: t('quote.shareResultNote'),
    text: props.terms,
    url: props.termsUrl,
  },
  {
    key: 'form',
    label: t('quote.shareForm'),
    note: t('quote.shareFormNote'),
    text: props.summary,
    url: props.shareUrl,
    quiet: true,
  },
]);

/** What was copied outranks what is merely being pointed at. */
const message = computed(() => {
  if (copied.value) return t(sent.value === 'link' ? 'quote.linkCopied' : 'quote.shareCopied');
  if (failed.value) return t('quote.shareFailed');
  return hint.value;
});

/** The sentence and the link together, which is what a conversation needs. */
function send(action) {
  sent.value = 'both';
  copy(action.url ? `${action.text}\n${action.url}` : action.text);
}

/** Just the address, for pasting where the words would be in the way. */
function sendLink(action) {
  sent.value = 'link';
  copy(action.url);
}
</script>

<template>
  <div class="actions">
    <div v-for="action in actions" :key="action.key" class="pair">
      <button
        type="button"
        class="share"
        :class="{ quiet: action.quiet }"
        :disabled="props.disabled || !action.url"
        @click="send(action)"
        @mouseenter="hint = action.note"
        @mouseleave="hint = ''"
        @focus="hint = action.note"
        @blur="hint = ''"
      >
        {{ action.label }}
      </button>

      <button
        type="button"
        class="share only-link"
        :class="{ quiet: action.quiet }"
        :disabled="props.disabled || !action.url"
        :aria-label="`${action.label} — ${t('quote.linkOnly')}`"
        :title="t('quote.linkOnly')"
        @click="sendLink(action)"
        @mouseenter="hint = t('quote.linkOnlyNote')"
        @mouseleave="hint = ''"
        @focus="hint = t('quote.linkOnlyNote')"
        @blur="hint = ''"
      >
        <LinkIcon />
      </button>
    </div>

    <p class="line" :class="{ said: copied || failed }" role="status">{{ message }}</p>
  </div>
</template>

<style scoped>
.actions {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

/* One control with a seam, not two. The halves meet, each keeps the outer
   corners of the rounding and gives up the inner ones, and a hairline marks
   where one ends. */
.pair {
  display: flex;
}

.share {
  position: relative;
  flex: 1 1 auto;
  min-width: 0;
  /* One height for both variants: the outlined one carries a border, so left
     to its content it stood two pixels taller than the filled one — and that
     difference is what the square beside it has to match. */
  min-height: 2.375rem;
  padding: 0.65rem 1rem;
  border: none;
  border-radius: var(--radius) 0 0 var(--radius);
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

/* Square, by giving the side the same value as the row height above. An
   aspect-ratio would have been tidier, but it derives width from height only
   when the height is definite, and here the height comes from the row. */
.only-link {
  display: grid;
  flex: none;
  place-items: center;
  width: 2.375rem;
  padding: 0;
  border-radius: 0 var(--radius) var(--radius) 0;
}

/* The seam. The filled half has no border to meet, so it is drawn inside;
   the outlined pair would show two, so one is pulled over the other. */
.only-link:not(.quiet) {
  box-shadow: inset 1px 0 0 rgb(255 255 255 / 28%);
}

.only-link.quiet {
  margin-left: -1px;
}

/* Whichever half is pointed at paints over the other. The halves overlap by a
   pixel so the seam is one line and not two, and without this the later
   element in the source won that pixel every time — so hovering the wide half
   lit three sides of its outline and left the fourth grey. */
.share:hover:not(:disabled),
.share:focus-visible {
  z-index: 1;
}

/* Reserved whether or not it has anything to say, so the panel never jumps. */
.line {
  min-height: 2.1em;
  margin: 0;
  color: var(--text-faint);
  font-size: 0.72rem;
  line-height: 1.35;
  text-align: center;
}

.said {
  color: var(--up);
}
</style>
