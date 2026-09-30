<script setup>
import InfoHint from '../form/InfoHint.vue';
import { useI18n } from '../../i18n/index.js';

const enabled = defineModel({ type: Boolean, required: true });

defineProps({ extraHearts: { type: Number, default: null } });

const { t } = useI18n();
</script>

<template>
  <div class="shared">
    <label class="control-check">
      <input v-model="enabled" type="checkbox" />
      <span>
        <span class="title">
          {{ t('fields.sharedSpaces.label') }}
          <span class="muted">{{ t('fields.sharedSpaces.sublabel') }}</span>
          <InfoHint hint-key="fields.sharedSpaces.hint" />
        </span>
        <span class="sub">{{ t('fields.sharedSpaces.description') }}</span>
      </span>
    </label>

    <p v-if="enabled && extraHearts" class="warn">
      {{ t('fields.sharedSpaces.warning', { n: extraHearts }) }}
    </p>
  </div>
</template>

<style scoped>
.shared {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.title {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  color: var(--text);
  font-size: 0.875rem;
  font-weight: 500;
}

.muted {
  color: var(--text-faint);
  font-weight: 400;
}

.sub {
  display: block;
  margin-top: 0.2rem;
  color: var(--text-faint);
  font-size: 0.75rem;
  line-height: 1.5;
}

.warn {
  margin: 0;
  padding: 0.6rem 0.7rem;
  border: 1px solid rgb(251 191 36 / 30%);
  border-radius: var(--radius);
  background: var(--warn-soft);
  color: var(--warn);
  font-size: 0.75rem;
  line-height: 1.55;
}
</style>
