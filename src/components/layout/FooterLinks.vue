<script setup>
import { computed } from 'vue';
import { LINKS } from '../../config/links.js';
import { locale, useI18n } from '../../i18n/index.js';

/**
 * The row of addresses at the foot of the page.
 *
 * The generated FAQ pages carry the same row, built by a script rather than by
 * this component, so the two look like one site. Keep the order in step.
 */

const { t } = useI18n();

// The FAQ is a pair of built documents rather than a route, so the link is a
// real navigation and has to follow both the deployment base and the language
// the reader is already in.
const faq = computed(
  () => `${import.meta.env.BASE_URL}${locale.value === 'en' ? '' : `${locale.value}/`}faq/`,
);
</script>

<template>
  <nav class="links" :aria-label="t('footer.label')">
    <a :href="faq">{{ t('footer.faq') }}</a>
    <a :href="LINKS.repo" target="_blank" rel="noopener noreferrer">{{ t('footer.source') }}</a>
    <a :href="LINKS.licence" target="_blank" rel="license noopener noreferrer">{{
      t('footer.licence')
    }}</a>
    <a class="contribute" :href="LINKS.newIssue" target="_blank" rel="noopener noreferrer">{{
      t('footer.contribute')
    }}</a>
  </nav>
</template>

<style scoped>
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.8125rem;
}

.links a {
  color: var(--text-dim);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: color 0.15s, border-color 0.15s;
}

.links a:hover {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

/* `.links a` outranks a lone class, so the accent never took: the one link
   meant to stand out read like the three beside it. */
.links a.contribute {
  color: var(--accent);
}
</style>
