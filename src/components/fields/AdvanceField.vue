<script setup>
import { computed } from 'vue';
import FieldRow from '../form/FieldRow.vue';
import { useI18n } from '../../i18n/index.js';
import { formatHeartDelta, unit } from '../../format/index.js';

const advance = defineModel({ type: Number, required: true });

const props = defineProps({
  limits: { type: Object, required: true },
  applied: { type: Number, default: null },
  capped: { type: Boolean, default: false },
  oneMoreDay: { type: Number, default: null },
});

const { t } = useI18n();

const gain = computed(() => formatHeartDelta(props.oneMoreDay));
</script>

<template>
  <FieldRow :label="t('fields.advance.label')" hint-key="fields.advance.hint" for-id="advance">
    <template #badge>{{ t('fields.advance.badge', { n: advance }) }}</template>

    <input
      id="advance"
      class="control-range"
      type="range"
      :min="limits.min"
      :max="limits.max"
      step="1"
      :value="advance"
      :aria-label="t('fields.advance.label')"
      @input="advance = Number($event.target.value)"
    />
    <div class="control-scale">
      <span>{{ t('fields.advance.badge', { n: limits.min }) }}</span>
      <span>{{ t('fields.advance.badge', { n: limits.max }) }}</span>
    </div>

    <template #note>
      <span v-if="capped" class="capped">
        {{ t('fields.advance.capped', { n: unit('days', applied) }) }}
      </span>
      <span v-else-if="oneMoreDay !== null && gain" class="gain">
        {{ t('fields.advance.oneMoreDay', { value: gain }) }}
      </span>
      <span v-else-if="oneMoreDay !== null">{{ t('fields.advance.oneMoreDayNothing') }}</span>
    </template>
  </FieldRow>
</template>

<style scoped>
.capped {
  color: var(--warn);
  font-weight: 500;
}

.gain {
  color: var(--accent);
  font-weight: 500;
}
</style>
