<script setup>
import FieldRow from '../form/FieldRow.vue';
import { useI18n } from '../../i18n/index.js';

const profile = defineModel({ type: String, required: true });

const { t } = useI18n();

const CODES = ['unknown', 'regular', 'loyal'];
</script>

<template>
  <FieldRow :label="t('fields.profile.label')" hint-key="fields.profile.hint" for-id="profile">
    <select id="profile" v-model="profile" class="control-select">
      <option v-for="code in CODES" :key="code" :value="code">
        {{ t(`fields.profile.options.${code}`) }}
      </option>
    </select>
  </FieldRow>
</template>
