<script setup>
import SiteLogo from './SiteLogo.vue';
import LicenceNotice from './LicenceNotice.vue';
import FooterLinks from './FooterLinks.vue';
import InfoHint from '../form/InfoHint.vue';
import { useI18n } from '../../i18n/index.js';

const { t } = useI18n();

// Read once at load rather than pinned in a dictionary, so the notice does not
// quietly claim the wrong year every January.
const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div class="row">
      <div class="prose">
        <LicenceNotice />

        <p class="notice">
          {{ t('footer.short') }}
          <InfoHint hint-key="footer.notice" />
        </p>
      </div>

      <div class="meta">
        <p class="identity">
          <SiteLogo class="mark" />
          <span>{{ t('footer.copyright', { year }) }}</span>
        </p>

        <FooterLinks />
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--line);
}

/* Two columns where there is room: the notices are capped for readability, so
   a single column left the whole bottom right of the page empty under the
   links. The identity and the links now run down that side instead. */
.row {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-between;
  gap: 1.25rem 2.5rem;
}

/* One column until the breakpoint, two after it. Sized in percent rather than
   in rem so the split happens where the alignment switches: a basis in rem let
   the columns separate around 826px while the right one stayed left-aligned
   until 992px, which is a band where the footer looked half-finished. */
.prose {
  flex: 1 1 100%;
  max-width: 48rem;
  min-width: 0;
}

/* The licence notice carries its own top margin, which pushed the left column
   a line lower than the right one. */
.prose > :first-child {
  margin-top: 0;
}

.meta {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

@media (min-width: 62rem) {
  .prose {
    flex: 1 1 26rem;
  }

  .meta {
    align-items: flex-end;
  }

  .links {
    justify-content: flex-end;
  }
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

/* The same size and colour as the column opposite: at 0.75rem and --text-faint
   the two sides of the footer read as different weights of text, and that
   colour at that size falls under the contrast body copy needs. */
.notice {
  margin: 1rem 0 0;
  color: var(--text-dim);
  font-size: 0.8125rem;
  line-height: 1.6;
}
</style>
