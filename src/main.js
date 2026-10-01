import { createApp } from 'vue';
import App from './App.vue';
import { initLocale } from './i18n/index.js';
import { loadSiteConfig } from './state/siteConfig.js';
import './styles/index.css';

// Before mounting, so the first render already comes out in the right
// language, with no flash of English for a French-speaking visitor.
initLocale();

createApp(App).mount('#app');

// After mounting, deliberately: the hand-edited settings decide whether a
// badge appears, and nothing should wait on a network request for that.
loadSiteConfig(import.meta.env.BASE_URL);
