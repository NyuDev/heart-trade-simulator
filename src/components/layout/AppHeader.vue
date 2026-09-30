<script setup>
import { computed } from 'vue';
import LanguageSelector from './LanguageSelector.vue';
import { useI18n } from '../../i18n/index.js';

const { t } = useI18n();

// The intro mentions the help marker, so the text is split around the
// {icon} token to insert a real one, without injecting translated HTML.
const introParts = computed(() => t('app.intro').split('{icon}'));
</script>

<template>
  <header class="header">
    <div class="title-row">
      <h1>{{ t('app.title') }}</h1>
      <LanguageSelector />
    </div>
    <p>
      {{ introParts[0] }}<span v-if="introParts.length > 1" class="mark">i</span
      >{{ introParts[1] }}
    </p>
  </header>
</template>

<style scoped>
.header {
  margin-bottom: 2rem;
}

.title-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

h1 {
  color: #fff;
  font-size: clamp(1.5rem, 4vw, 1.875rem);
  font-weight: 600;
  letter-spacing: -0.01em;
}

p {
  max-width: 44rem;
  margin-top: 0.6rem;
  font-size: 0.875rem;
  line-height: 1.6;
}

.mark {
  display: inline-grid;
  place-items: center;
  width: 1.05rem;
  height: 1.05rem;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  color: var(--accent);
  font: italic 600 0.68rem/1 var(--font-serif);
  vertical-align: middle;
}
</style>
