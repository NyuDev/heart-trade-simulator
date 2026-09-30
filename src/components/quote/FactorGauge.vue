<script setup>
import { useI18n } from '../../i18n/index.js';

defineProps({
  direction: { type: String, required: true },
  strength: { type: Number, required: true },
});

const { t } = useI18n();
const STEPS = 3;
</script>

<template>
  <span class="gauge" :class="direction" :aria-label="t(`factors.${direction}`)">
    <span v-for="step in STEPS" :key="step" class="pip" :class="{ filled: step <= strength }" />
  </span>
</template>

<style scoped>
.gauge {
  display: inline-flex;
  gap: 0.2rem;
}

.pip {
  width: 1.1rem;
  height: 0.3rem;
  border-radius: 999px;
  background: var(--line);
}

.gauge.up .pip.filled {
  background: var(--up);
}

.gauge.down .pip.filled {
  background: var(--down);
}
</style>
