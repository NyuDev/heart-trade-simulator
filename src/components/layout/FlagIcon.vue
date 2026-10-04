<script setup>
import { computed, useId } from 'vue';
import { FLAGS } from './flags.js';

/**
 * A country flag, drawn rather than typed.
 *
 * The artwork lives beside this file, and the sizing in styles/controls, so
 * the generated FAQ pages can draw the same flags from a build script with no
 * Vue behind it.
 *
 * The mask needs an id unique to the instance: the same flag can appear twice
 * at once (the trigger and the open list), and duplicate ids would make the
 * second one clip against the first.
 */
const props = defineProps({ code: { type: String, required: true } });

const maskId = useId();
const paths = computed(() => FLAGS[props.code]);
</script>

<template>
  <svg v-if="paths" class="flag" viewBox="0 0 512 512" aria-hidden="true" focusable="false">
    <mask :id="maskId"><circle cx="256" cy="256" r="256" fill="#fff" /></mask>
    <g :mask="`url(#${maskId})`">
      <path v-for="(path, index) in paths" :key="index" :fill="path.fill" :d="path.d" />
    </g>
  </svg>
</template>
