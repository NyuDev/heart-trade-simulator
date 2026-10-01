<script setup>
import { computed } from 'vue';
import { LINKS } from '../../config/links.js';
import { useI18n } from '../../i18n/index.js';

/**
 * The attribution notice Creative Commons asks a licensed work to carry,
 * generated with their own chooser and rendered here.
 *
 * The sentence comes from the dictionaries with three tokens in it, which are
 * then replaced by real elements. Translating a string that already contained
 * the markup would mean trusting a dictionary with HTML; this way the links
 * are built in code and only the words around them are translated.
 *
 * The badges are served from this site rather than from Creative Commons'
 * mirror, so reading the footer does not announce the visit to a third party.
 */

const { t } = useI18n();

const BADGES = ['cc', 'by', 'nc', 'nd'];
const YEAR = 2026;
const WORK = 'Price & Risk Simulator';
const CREATOR = 'NyuDev';
const LICENCE = 'CC BY-NC-ND 4.0';
const DEED = 'https://creativecommons.org/licenses/by-nc-nd/4.0/';

const base = import.meta.env.BASE_URL;
const badgeSrc = (name) => `${base}cc/${name}.svg`;

/** The sentence cut into text and the three things that are links. */
const parts = computed(() =>
  t('footer.licenceNotice', { year: YEAR })
    .split(/(\{work\}|\{creator\}|\{licence\})/)
    .filter(Boolean),
);
</script>

<template>
  <p class="notice licence">
    <template v-for="(part, index) in parts" :key="index">
      <a v-if="part === '{work}'" :href="LINKS.site" rel="cc:attributionURL">{{ WORK }}</a>
      <a v-else-if="part === '{creator}'" :href="LINKS.profile" rel="cc:attributionURL">{{
        CREATOR
      }}</a>
      <a
        v-else-if="part === '{licence}'"
        :href="DEED"
        rel="license noopener noreferrer"
        target="_blank"
        >{{ LICENCE }}</a
      >
      <span v-else>{{ part }}</span>
    </template>
    <img
      v-for="badge in BADGES"
      :key="badge"
      class="badge"
      :src="badgeSrc(badge)"
      alt=""
      width="16"
      height="16"
    />
  </p>
</template>

<style scoped>
.licence {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.15rem;
}

.licence a {
  color: var(--text-dim);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.licence a:hover {
  color: var(--accent);
}

.badge {
  width: 1em;
  height: 1em;
  margin-left: 0.2em;
  /* The badges are black line art meant for light pages. */
  filter: invert(1) opacity(0.55);
}
</style>
