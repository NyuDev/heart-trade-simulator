<script setup>
import { computed } from 'vue';
import { LINKS } from '../../config/links.js';
import { copyrightYears } from '../../config/copyright.js';
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
const YEAR = copyrightYears();
const WORK = 'Price & Risk Simulator';
const CREATOR = 'NyuDev';
const LICENCE = 'CC BY-NC-ND 4.0';
const DEED = LINKS.deed;

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
      <span v-else-if="part === '{licence}'" class="deed">
        <a :href="DEED" rel="license noopener noreferrer" target="_blank">{{ LICENCE }}</a>
        <img
          v-for="badge in BADGES"
          :key="badge"
          class="badge"
          :src="badgeSrc(badge)"
          alt=""
          width="16"
          height="16"
        />
      </span>
      <span v-else>{{ part }}</span>
    </template>
  </p>
</template>

<style scoped>
/* The licence name and its badges move as one: the sentence is longer in
   French than in English, and when it took a second line the badges were left
   behind on their own. Both languages end on {licence}, so this is also where
   the badges belong. */
.deed {
  white-space: nowrap;
}

/* Ordinary inline flow, not flex. As a flex container every text fragment,
   every link and every badge was its own item, so a sentence one line too long
   pushed all four badges onto a line of their own — which is what happens in
   French and not in English. Inline, they wrap with the words. */
.licence {
  margin: 0;
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
  vertical-align: -0.15em;
  /* The badges are black line art meant for light pages. */
  filter: invert(1) opacity(0.55);
}
</style>
