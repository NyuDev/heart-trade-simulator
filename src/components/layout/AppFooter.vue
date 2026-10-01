<script setup>
import SiteLogo from './SiteLogo.vue';
import LicenceNotice from './LicenceNotice.vue';
import { LINKS } from '../../config/links.js';
import { useI18n } from '../../i18n/index.js';

const { t } = useI18n();

// Read once at load rather than pinned in a dictionary, so the notice does not
// quietly claim the wrong year every January.
const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div class="row">
      <p class="identity">
        <SiteLogo class="mark" />
        <span>{{ t('footer.copyright', { year }) }}</span>
      </p>

      <nav class="links" :aria-label="t('footer.label')">
        <a :href="LINKS.repo" target="_blank" rel="noopener noreferrer">{{ t('footer.source') }}</a>
        <a :href="LINKS.licence" target="_blank" rel="license noopener noreferrer">{{
          t('footer.licence')
        }}</a>
        <a class="contribute" :href="LINKS.newIssue" target="_blank" rel="noopener noreferrer">{{
          t('footer.contribute')
        }}</a>
      </nav>
    </div>

    <LicenceNotice />

    <p class="notice">{{ t('footer.notAffiliated') }}</p>
    <p class="notice">{{ t('footer.ownRisk') }}</p>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--line);
}

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.mark {
  width: 1.05rem;
  height: 1.05rem;
}

.identity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  color: var(--text-dim);
  font-size: 0.8125rem;
}

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

.contribute {
  color: var(--accent) !important;
}

.notice {
  max-width: 48rem;
  margin: 1rem 0 0;
  color: var(--text-faint);
  font-size: 0.75rem;
  line-height: 1.6;
}
</style>
