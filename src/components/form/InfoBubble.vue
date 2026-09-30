<script setup>
defineProps({
  title: { type: String, required: true },
  paragraphs: { type: Array, required: true },
});
</script>

<template>
  <span class="bubble" role="tooltip">
    <strong class="title">{{ title }}</strong>
    <span v-for="(paragraph, index) in paragraphs" :key="index">{{ paragraph }}</span>
  </span>
</template>

<style scoped>
.bubble {
  position: absolute;
  z-index: 20;
  top: calc(100% + 0.5rem);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  width: max(16rem, 22vw);
  max-width: min(22rem, 78vw);
  padding: 0.7rem 0.8rem;
  border: 1px solid var(--line-strong);
  border-radius: 0.6rem;
  background: var(--surface-raised);
  box-shadow: 0 12px 28px rgb(0 0 0 / 55%);
  color: var(--text-dim);
  font-size: 0.78rem;
  line-height: 1.5;
  text-align: left;
  white-space: normal;
}

.title {
  color: var(--text);
  font-size: 0.8rem;
}

/* On mobile the bubble spans the screen width instead of overflowing. */
@media (max-width: 40rem) {
  .bubble {
    position: fixed;
    left: 1rem;
    right: 1rem;
    width: auto;
    max-width: none;
    transform: none;
  }
}
</style>
