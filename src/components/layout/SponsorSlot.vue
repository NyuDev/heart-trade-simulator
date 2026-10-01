<script setup>
import { computed } from 'vue';
import { sponsor } from '../../state/siteConfig.js';
import { useI18n } from '../../i18n/index.js';

const { locale, t } = useI18n();

const pick = (field) => field?.[locale.value] ?? field?.en ?? null;

const headline = computed(() => pick(sponsor.value.headline));
const body = computed(() => pick(sponsor.value.body));
</script>

<template>
  <aside v-if="sponsor.show" class="slot">
    <!-- From the dictionaries, never from the settings file: whoever buys the
         space cannot edit away the word that says it was bought. -->
    <p class="tag">{{ t('sponsor.tag') }}</p>

    <!-- Two branches rather than a bound href that may be null: there is no
         code path here that renders an anchor with an unchecked address. -->
    <a
      v-if="sponsor.link"
      class="body"
      :href="sponsor.link"
      target="_blank"
      rel="noopener noreferrer nofollow sponsored"
    >
      <span v-if="headline" class="headline">{{ headline }}</span>
      <span v-if="body" class="line">{{ body }}</span>
    </a>
    <div v-else class="body">
      <span v-if="headline" class="headline">{{ headline }}</span>
      <span v-if="body" class="line">{{ body }}</span>
      <a v-if="sponsor.email" class="contact" :href="`mailto:${sponsor.email}`">{{
        t('sponsor.contact')
      }}</a>
    </div>
  </aside>
</template>

<style scoped>
.slot {
  margin-top: 2rem;
  padding: 1rem 1.25rem;
  border: 1px dashed var(--line-strong);
  border-radius: var(--radius);
  background: var(--surface);
}

.tag {
  margin: 0 0 0.4rem;
  color: var(--text-faint);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.body {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  color: inherit;
  text-decoration: none;
}

a.body:hover .headline {
  color: var(--accent);
}

.headline {
  color: var(--text);
  font-size: 0.9375rem;
  font-weight: 600;
  transition: color 0.15s;
}

.line {
  color: var(--text-dim);
  font-size: 0.8125rem;
  line-height: 1.55;
}

.contact {
  margin-top: 0.3rem;
  color: var(--accent);
  font-size: 0.8125rem;
  text-decoration: none;
  align-self: flex-start;
}

.contact:hover {
  text-decoration: underline;
}
</style>
