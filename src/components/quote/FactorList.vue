<script setup>
import FactorGauge from './FactorGauge.vue';
import { useI18n } from '../../i18n/index.js';

defineProps({ factors: { type: Array, required: true } });

const { t } = useI18n();

/**
 * Colour alone did not say which way a lever pushed.
 *
 * Green reads as good and red as bad, but here they mean up and down, and
 * whether up is good depends on which side of the trade you are on. The key
 * says what the colours mean rather than leaving it to be guessed.
 */
const KEY = ['up', 'down'];
</script>

<template>
  <div>
    <ul class="factors">
      <li v-for="factor in factors" :key="factor.key" class="factor">
        <span class="name">{{ t(`factors.${factor.key}`) }}</span>
        <FactorGauge :direction="factor.direction" :strength="factor.strength" />
      </li>
    </ul>

    <p class="key">
      <span v-for="direction in KEY" :key="direction" class="entry">
        <span class="pip" :class="direction" />
        {{ t(`factors.${direction}`) }}
      </span>
    </p>
  </div>
</template>

<style scoped>
.factors {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.factor {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.8125rem;
}

.name {
  color: var(--text-dim);
}

.key {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem 1rem;
  margin: 0.7rem 0 0;
  color: var(--text-dim);
  font-size: 0.75rem;
}

.entry {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.pip {
  width: 1.1rem;
  height: 0.3rem;
  border-radius: 999px;
}

.pip.up {
  background: var(--up);
}

.pip.down {
  background: var(--down);
}
</style>
