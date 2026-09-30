<script setup>
import FactorGauge from './FactorGauge.vue';
import { useI18n } from '../../i18n/index.js';

defineProps({ factors: { type: Array, required: true } });

const { t } = useI18n();
</script>

<template>
  <ul class="factors">
    <li v-for="factor in factors" :key="factor.key" class="factor">
      <span class="name">{{ t(`factors.${factor.key}`) }}</span>
      <FactorGauge :direction="factor.direction" :strength="factor.strength" />
    </li>
  </ul>
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
</style>
