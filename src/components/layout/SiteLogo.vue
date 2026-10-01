<script setup>
import { useId } from 'vue';

/**
 * Four-pointed star, in the interface's own colours: the accent blue the
 * controls use, fading into the pink the price is written in.
 *
 * Deliberately a plain geometric star rather than anything resembling the
 * game's own iconography — thatgamecompany's fan-content rules allow original
 * work but not a recreation of their assets.
 *
 * The gradient id must be unique per instance: the mark appears in the header
 * and again in the footer, and a shared id would leave the second one reaching
 * for a definition it does not own.
 */
const gradient = useId();
</script>

<template>
  <svg class="logo" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient :id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#7dd3fc" />
        <stop offset="55%" stop-color="#38bdf8" />
        <stop offset="100%" stop-color="#fb7185" />
      </linearGradient>
    </defs>
    <polygon points="100,10 121.2,78.8 190,100 121.2,121.2 100,190 78.8,121.2 10,100 78.8,78.8" :fill="`url(#${gradient})`" />
  </svg>
</template>

<style scoped>
.logo {
  width: 1.6rem;
  height: 1.6rem;
  flex: none;
}
</style>
