import echange from './echange.js';
import prix from './prix.js';
import taux from './taux.js';
import risques from './risques.js';
import partage from './partage.js';
import site from './site.js';

export default {
  code: 'fr',
  locale: 'fr-FR',
  openGraphLocale: 'fr_FR',
  path: 'fr/faq/',
  title: 'Combien de cœurs pour un échange Sky · Questions fréquentes',
  heading: 'Questions fréquentes',
  description:
    'Combien de cœurs demander pour un échange Sky payé en argent réel : d’où vient le calage du Season Pass à 10 € pour environ 70 cœurs, et ce qui le déplace.',
  intro:
    'Ce site calcule combien de cœurs demander pour un échange Sky payé en argent réel. Voici ce qu’il fait, ce qu’il ne fait pas, et sur quoi le prix repose.',
  tocLabel: 'Sommaire',
  appName: 'Simulateur de Prix & de Risques',
  imageAlt: 'Sky heart trade calculator — how many hearts to ask for a trade paid in real money',
  nativeName: 'Français',
  languageLabel: 'Changer de langue',
  backLabel: 'Revenir au simulateur',
  sections: [echange, prix, taux, risques, partage, site],
};
