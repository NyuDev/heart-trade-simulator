<script setup>
import { computed } from 'vue';
import FieldRow from '../form/FieldRow.vue';
import { useI18n } from '../../i18n/index.js';

const vouches = defineModel({ type: Number, required: true });
const props = defineProps({ limits: { type: Object, required: true } });

const { t } = useI18n();

const values = computed(() =>
  Array.from(
    { length: props.limits.max - props.limits.min + 1 },
    (unused, index) => props.limits.min + index,
  ),
);
</script>

<template>
  <FieldRow :label="t('fields.vouches.label')" hint-key="fields.vouches.hint">
    <div class="control-group" role="group" :aria-label="t('fields.vouches.groupLabel')">
      <button
        v-for="value in values"
        :key="value"
        type="button"
        class="control-chip"
        :aria-pressed="vouches === value"
        @click="vouches = value"
      >
        {{ value === limits.max ? `${value} +` : value }}
      </button>
    </div>
  </FieldRow>
</template>
