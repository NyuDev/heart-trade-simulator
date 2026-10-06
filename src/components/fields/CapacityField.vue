<script setup>
import { computed } from 'vue';
import FieldRow from '../form/FieldRow.vue';
import { useI18n } from '../../i18n/index.js';
import { formatHeartDelta } from '../../format/index.js';

const capacity = defineModel({ type: Number, required: true });

const props = defineProps({
  limits: { type: Object, required: true },
  doubleCapacity: { type: Number, default: null },
});

const { t } = useI18n();

const gain = computed(() => formatHeartDelta(props.doubleCapacity));

function onInput(event) {
  const value = Number.parseFloat(event.target.value);
  capacity.value = Number.isFinite(value)
    ? Math.min(Math.max(value, props.limits.min), props.limits.max)
    : props.limits.min;
}
</script>

<template>
  <FieldRow :label="t('fields.capacity.label')" hint-key="fields.capacity.hint" for-id="capacity">
    <div class="control-wrap">
      <input
        id="capacity"
        class="control-number capacity"
        type="number"
        inputmode="numeric"
        :min="limits.min"
        :max="limits.max"
        step="1"
        :value="capacity"
        @input="onInput"
      />
      <span class="control-suffix">{{ t('fields.capacity.unit') }}</span>
    </div>

    <template v-if="doubleCapacity !== null" #note>
      <span v-if="gain" class="gain">
        {{ t('fields.capacity.doubleCapacity', { value: gain }) }}
      </span>
      <span v-else>{{ t('fields.capacity.doubleCapacityNothing') }}</span>
    </template>
  </FieldRow>
</template>

<style scoped>
.capacity {
  font-size: 1.125rem;
}

.gain {
  color: var(--accent);
  font-weight: 500;
}

/* No room for the word on a phone; the label above already says it. */
@media (max-width: 32rem) {
  .control-suffix {
    display: none;
  }
}
</style>
