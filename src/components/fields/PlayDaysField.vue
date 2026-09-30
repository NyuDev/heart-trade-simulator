<script setup>
import FieldRow from '../form/FieldRow.vue';
import { useI18n } from '../../i18n/index.js';
import { unit } from '../../format/index.js';

const playDays = defineModel({ type: Number, required: true });

defineProps({
  limits: { type: Object, required: true },
  smoothed: { type: Number, default: null },
});

const { t } = useI18n();
</script>

<template>
  <FieldRow :label="t('fields.playDays.label')" hint-key="fields.playDays.hint" for-id="play-days">
    <template #badge>{{ t('fields.playDays.badge', { n: playDays }) }}</template>

    <input
      id="play-days"
      class="control-range"
      type="range"
      :min="limits.min"
      :max="limits.max"
      step="1"
      :value="playDays"
      :aria-label="t('fields.playDays.label')"
      @input="playDays = Number($event.target.value)"
    />
    <div class="control-scale">
      <span>{{ t('fields.playDays.badge', { n: limits.min }) }}</span>
      <span>{{ t('fields.playDays.badge', { n: limits.max }) }}</span>
    </div>

    <template v-if="smoothed !== null" #note>
      {{ t('fields.playDays.note', { value: unit('hearts', smoothed) }) }}
    </template>
  </FieldRow>
</template>
