<script setup>
import InfoHint from './InfoHint.vue';

defineProps({
  label: { type: String, required: true },
  hintKey: { type: String, required: true },
  forId: { type: String, default: undefined },
});
</script>

<template>
  <div class="field">
    <div class="head">
      <component :is="forId ? 'label' : 'span'" :for="forId" class="label">
        {{ label }}
      </component>
      <InfoHint :hint-key="hintKey" />
      <span class="spacer" />
      <span v-if="$slots.badge" class="badge"><slot name="badge" /></span>
    </div>

    <slot />

    <p v-if="$slots.note" class="note"><slot name="note" /></p>
  </div>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.head {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.label {
  color: var(--text);
  font-size: 0.875rem;
  font-weight: 500;
}

.spacer {
  flex: 1;
}

.badge {
  flex-shrink: 0;
  color: var(--accent);
  font: 600 0.85rem/1 var(--font-mono);
}

.note {
  margin: 0;
  color: var(--text-faint);
  font-size: 0.75rem;
  line-height: 1.5;
}
</style>
