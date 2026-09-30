<script setup>
import { computed, useId } from 'vue';
import InfoBubble from './InfoBubble.vue';
import { useI18n } from '../../i18n/index.js';
import { useDisclosure } from '../../composables/useDisclosure.js';

const props = defineProps({
  /** Root of the translation key, for instance `fields.amount.hint`. */
  hintKey: { type: String, required: true },
});

const { t } = useI18n();
const { isOpen, open, close, toggle } = useDisclosure();

const id = useId();
const title = computed(() => t(`${props.hintKey}.title`));
const paragraphs = computed(() => t(`${props.hintKey}.body`));
</script>

<template>
  <span class="info" @mouseenter="open" @mouseleave="close">
    <button
      type="button"
      class="trigger"
      :aria-expanded="isOpen"
      :aria-describedby="isOpen ? id : undefined"
      :aria-label="title"
      @click="toggle"
      @focus="open"
      @blur="close"
      @keydown.esc="close"
    >
      i
    </button>

    <Transition name="fade">
      <InfoBubble v-if="isOpen" :id="id" :title="title" :paragraphs="paragraphs" />
    </Transition>
  </span>
</template>

<style scoped>
.info {
  position: relative;
  display: inline-flex;
  vertical-align: middle;
}

.trigger {
  display: grid;
  place-items: center;
  width: 1.1rem;
  height: 1.1rem;
  padding: 0;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  background: transparent;
  color: var(--text-dim);
  font: italic 600 0.7rem/1 var(--font-serif);
  cursor: help;
  transition: color 0.15s, border-color 0.15s, background 0.15s;
}

.trigger:hover,
.trigger:focus-visible {
  color: var(--accent);
  border-color: var(--accent);
  background: var(--accent-soft);
  outline: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.12s ease, transform 0.12s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-0.2rem);
}

@media (max-width: 40rem) {
  .fade-enter-from,
  .fade-leave-to {
    transform: translateY(-0.2rem);
  }
}
</style>
