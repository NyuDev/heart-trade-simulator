<script setup>
/**
 * A chain link, drawn here rather than pulled from an icon set.
 *
 * The project inlines the few marks it uses — the logo, the flags — and has no
 * icon dependency. One pictogram does not pay for a package, a build step and
 * a font or sprite to load, and an inlined path cannot arrive late or fail to
 * arrive at all.
 *
 * Decorative: the button around it carries the name.
 */
</script>

<template>
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <g
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M9.5 14.5a4 4 0 0 0 5.66 0l3-3a4 4 0 1 0-5.66-5.66l-1 1" />
      <path d="M14.5 9.5a4 4 0 0 0-5.66 0l-3 3a4 4 0 1 0 5.66 5.66l1-1" />
    </g>
  </svg>
</template>

<style scoped>
svg {
  width: 1.05rem;
  height: 1.05rem;
}
</style>
