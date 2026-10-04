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
  title: 'Questions fréquentes · Simulateur de Prix & de Risques',
  heading: 'Questions fréquentes',
  description:
    'Comment le simulateur chiffre un échange Sky payé en argent réel : d’où vient le point de calage de 10 € pour environ 70 cœurs, pourquoi le taux de la boutique ne s’applique pas, et ce qui fait monter ou descendre le prix.',
  intro:
    'Ce site calcule combien de cœurs demander pour un échange Sky payé en argent réel. Voici ce qu’il fait, ce qu’il ne fait pas, et sur quoi le prix repose.',
  tocLabel: 'Sommaire',
  nativeName: 'Français',
  languageLabel: 'Changer de langue',
  backLabel: 'Revenir au simulateur',
  sections: [echange, prix, taux, risques, partage, site],
};
