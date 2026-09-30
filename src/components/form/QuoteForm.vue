<script setup>
import AmountField from '../fields/AmountField.vue';
import AdvanceField from '../fields/AdvanceField.vue';
import ProfileField from '../fields/ProfileField.vue';
import VouchField from '../fields/VouchField.vue';
import CapacityField from '../fields/CapacityField.vue';
import PlayDaysField from '../fields/PlayDaysField.vue';
import SharedSpacesField from '../fields/SharedSpacesField.vue';

defineProps({
  form: { type: Object, required: true },
  limits: { type: Object, required: true },
  quote: { type: Object, default: null },
});
</script>

<template>
  <section class="form">
    <AmountField v-model="form.amountEur" :limits="limits.amount" />

    <hr class="rule" />

    <AdvanceField
      v-model="form.advanceDays"
      :limits="limits.advanceDays"
      :applied="quote?.advance.applied ?? null"
      :capped="quote?.advance.capped ?? false"
      :one-more-day="quote?.hints.oneMoreDayHearts ?? null"
    />

    <ProfileField v-model="form.profile" />

    <VouchField v-model="form.vouches" :limits="limits.vouches" />

    <CapacityField
      v-model="form.capacityPerPlayDay"
      :limits="limits.capacityPerPlayDay"
      :double-capacity="quote?.hints.doubleCapacityHearts ?? null"
    />

    <PlayDaysField
      v-model="form.playDaysPerWeek"
      :limits="limits.playDaysPerWeek"
      :smoothed="quote?.delivery.smoothedRatePerDay ?? null"
    />

    <SharedSpacesField
      v-model="form.sharedSpaces"
      :extra-hearts="quote?.hints.sharedExtraHearts ?? null"
    />
  </section>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  padding: 1.5rem;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: var(--surface);
}

.rule {
  height: 1px;
  margin: 0;
  border: none;
  background: var(--line);
}
</style>
