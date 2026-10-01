<script setup>
import { onMounted, ref } from 'vue';

defineProps({
  title: { type: String, default: '' },
  paragraphs: { type: Array, required: true },
});

/** Matches the gap in the stylesheet below. */
const GAP = 8;

const root = ref(null);
const above = ref(false);

/**
 * Which side of its trigger the bubble opens on.
 *
 * Opening downwards from something near the bottom of the page used to push
 * the scrollable area well past the footer, leaving a screen of nothing under
 * the site. It now measures itself and flips up when it would not fit, which
 * is also the only way to get this right without a constant for "how tall is a
 * hint" that every translation would quietly invalidate.
 *
 * onMounted runs after the element is in the document and before the browser
 * paints, so the measurement costs a layout and never a visible jump.
 */
onMounted(() => {
  const element = root.value;
  const anchor = element?.parentElement?.getBoundingClientRect();
  if (!element || !anchor || typeof window === 'undefined') return;

  // The narrow layout pins the bubble to the bottom of the screen instead, so
  // there is no side to choose.
  if (getComputedStyle(element).position === 'fixed') return;

  const box = element.getBoundingClientRect();
  const overflowsBelow = anchor.bottom + GAP + box.height > window.innerHeight;
  const fitsAbove = anchor.top - GAP - box.height > 0;

  above.value = overflowsBelow && fitsAbove;
});
</script>

<template>
  <span ref="root" class="bubble" :class="{ above }" role="tooltip">
    <strong v-if="title" class="title">{{ title }}</strong>
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

.bubble.above {
  top: auto;
  bottom: calc(100% + 0.5rem);
}

.title {
  color: var(--text);
  font-size: 0.8rem;
}

/*
 * On a narrow screen the bubble spans the width and sits at the foot of the
 * window. Anchoring it to the trigger is what the wide layout is for; here
 * there is rarely room on either side of one, and a fixed element resolves a
 * percentage against the viewport rather than its trigger, which used to put
 * this just past the bottom edge and out of sight.
 */
@media (max-width: 40rem) {
  .bubble,
  .bubble.above {
    position: fixed;
    top: auto;
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
    width: auto;
    max-width: none;
    transform: none;
  }
}
</style>
