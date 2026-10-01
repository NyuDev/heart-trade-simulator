<script setup>
import { computed, nextTick, ref } from 'vue';
import FlagIcon from './FlagIcon.vue';
import { useI18n } from '../../i18n/index.js';
import { useDisclosure } from '../../composables/useDisclosure.js';
import { useDismiss } from '../../composables/useDismiss.js';

const { locale, languages, t, setLocale } = useI18n();

const container = ref(null);
const trigger = ref(null);
const { isOpen, close, toggle } = useDisclosure();

useDismiss(isOpen, container, dismiss);

const current = computed(
  () => languages.find((language) => language.code === locale.value) ?? languages[0],
);

/** However it was closed, focus goes back to the trigger. */
function dismiss() {
  close();
  nextTick(() => trigger.value?.focus());
}

// `manual: true` remembers the choice, which then wins over automatic
// detection: someone who deliberately switches is not sent back to their
// system language on the next reload.
function choose(code) {
  setLocale(code, { manual: true });
  dismiss();
}
</script>

<template>
  <div ref="container" class="dropdown">
    <button
      ref="trigger"
      type="button"
      class="dropdown-trigger"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
      :aria-label="`${t('language.tooltip')} — ${current.name}`"
      @click="toggle"
    >
      <FlagIcon :code="current.code" />
      <span>{{ current.code.toUpperCase() }}</span>
      <svg class="dropdown-chevron" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
        <path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" stroke-width="1.5"
          stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <ul v-if="isOpen" class="dropdown-list" role="listbox" :aria-label="t('language.label')">
      <li v-for="language in languages" :key="language.code" role="none">
        <button
          type="button"
          class="dropdown-option"
          role="option"
          :aria-selected="language.code === locale"
          @click="choose(language.code)"
        >
          <FlagIcon :code="language.code" />
          <span class="name">{{ language.name }}</span>
          <svg v-if="language.code === locale" class="tick" viewBox="0 0 12 12"
            aria-hidden="true" focusable="false">
            <path d="m2.5 6.5 2.5 2.5 4.5-5.5" fill="none" stroke="currentColor"
              stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.name {
  flex: 1;
}

.tick {
  width: 0.8rem;
  height: 0.8rem;
  flex: none;
}
</style>
