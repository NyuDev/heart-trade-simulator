<script setup>
import { computed } from 'vue';
import SiteLogo from './SiteLogo.vue';
import BetaBadge from './BetaBadge.vue';
import LanguageSelector from './LanguageSelector.vue';
import { useI18n } from '../../i18n/index.js';

/** The intro explains the form, so a page without one does not show it. */
const props = defineProps({ intro: { type: Boolean, default: true } });

const { t } = useI18n();

// The intro mentions the help marker, so the text is split around the
// {icon} token to insert a real one, without injecting translated HTML.
const introParts = computed(() => t('app.intro').split('{icon}'));
</script>

<template>
  <header class="header">
    <div class="title-row">
      <div class="identity">
        <SiteLogo />
        <h1>{{ t('app.title') }}</h1>
        <BetaBadge />
      </div>
      <LanguageSelector />
    </div>
    <p v-if="props.intro">
      {{ introParts[0] }}<span v-if="introParts.length > 1" class="mark">i</span
      >{{ introParts[1] }}
    </p>

    <p v-if="props.intro" class="shield">{{ t('app.shield') }}</p>
  </header>
</template>

<style scoped>
.header {
  margin-bottom: 2rem;
}

.title-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

/* Takes the width that is left rather than the width it wants, so the
   language control stays beside the title on a phone instead of wrapping to a
   line of its own under it. The title wraps inside this box instead. */
.identity {
  display: flex;
  /* Basis zero, not auto: flex decides where to break the line from the items'
     content sizes, before any shrinking, so an auto basis sent the language
     control to a line of its own on a phone. The title wraps instead, which is
     why it is the title that carries min-width rather than this box. */
  flex: 1 1 0;
  align-items: center;
  gap: 0.6rem;
  min-width: 0;
}

h1 {
  min-width: 0;
  color: #fff;
  font-size: clamp(1.5rem, 4vw, 1.875rem);
  font-weight: 600;
  letter-spacing: -0.01em;
}

p {
  max-width: 44rem;
  margin-top: 0.6rem;
  font-size: 0.875rem;
  line-height: 1.6;
}

/* What the tool is for, set apart from the sentence that explains the form.
   A rule down the side rather than a filled panel: it should read as an aside
   the eye can take or leave, not as a warning the page is shouting. */
.shield {
  margin-top: 0.9rem;
  padding-left: 0.85rem;
  border-left: 2px solid var(--line-strong);
  color: var(--text-dim);
  font-size: 0.8125rem;
}

.mark {
  display: inline-grid;
  place-items: center;
  width: 1.05rem;
  height: 1.05rem;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  color: var(--accent);
  font: italic 600 0.68rem/1 var(--font-serif);
  vertical-align: middle;
}
</style>
