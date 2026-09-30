<script setup>
import { computed } from 'vue';
import FieldRow from '../form/FieldRow.vue';
import { useI18n } from '../../i18n/index.js';

const amount = defineModel({ type: Number, required: true });
const props = defineProps({ limits: { type: Object, required: true } });

const { t } = useI18n();

// The slider upper bound follows what is typed, so an amount beyond the
// nominal range is not wiped out by the first drag.
const sliderMax = computed(() => Math.max(200, Math.ceil(amount.value || 0)));

function onNumber(event) {
  const value = Number.parseFloat(event.target.value);
  amount.value = Number.isFinite(value) ? Math.min(Math.max(value, 0), props.limits.max) : 0;
}
</script>

<template>
  <FieldRow :label="t('fields.amount.label')" hint-key="fields.amount.hint" for-id="amount">
    <div class="control-wrap">
      <input
        id="amount"
        class="control-number amount"
        type="number"
        inputmode="decimal"
        :min="limits.min"
        :max="limits.max"
        step="0.5"
        :value="amount"
        @input="onNumber"
      />
      <span class="control-suffix">€</span>
    </div>
    <input
      class="control-range"
      type="range"
      min="0"
      :max="sliderMax"
      step="1"
      :value="amount"
      :aria-label="t('fields.amount.sliderLabel')"
      @input="amount = Number($event.target.value)"
    />
  </FieldRow>
</template>

<style scoped>
.amount {
  padding-right: 2.25rem;
  font-size: 1.125rem;
}
</style>
