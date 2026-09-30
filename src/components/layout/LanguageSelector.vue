<script setup>
import { useI18n } from '../../i18n/index.js';

const { locale, languages, t, setLocale } = useI18n();

// `manual: true` remembers the choice, which then wins over automatic
// detection: someone who deliberately switches is not sent back to their
// system language on the next reload.
const choose = (code) => setLocale(code, { manual: true });
</script>

<template>
  <div class="selector" role="group" :aria-label="t('language.label')">
    <button
      v-for="language in languages"
      :key="language.code"
      type="button"
      class="option"
      :aria-pressed="locale === language.code"
      :title="`${t('language.tooltip')} — ${language.name}`"
      @click="choose(language.code)"
    >
      <span class="flag" aria-hidden="true">{{ language.flag }}</span>
      <span class="code">{{ language.code.toUpperCase() }}</span>
    </button>
  </div>
</template>

<style scoped>
.selector {
  display: inline-flex;
  gap: 0.25rem;
  padding: 0.2rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--surface-sunken);
}

.option {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.6rem;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: var(--text-faint);
  font: 600 0.75rem/1 var(--font-sans);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.option:hover {
  color: var(--text);
}

.option[aria-pressed='true'] {
  background: var(--accent-soft);
  color: var(--accent);
}

.flag {
  font-size: 0.9rem;
  line-height: 1;
}
</style>
