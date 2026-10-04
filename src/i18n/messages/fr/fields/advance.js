export default {
  label: 'Jours d’envoi de cœurs avant paiement',
  badge: '{n} j',
  hint: {
    title: 'Jours d’envoi de cœurs avant paiement',
    body: [
      'Nombre de jours pendant lesquels le joueur t’envoie des cœurs AVANT que tu ne dépenses un centime. L’usage est l’inverse : d’abord tu achètes, ensuite les cœurs arrivent.',
      'C’est ta principale protection : chaque jour envoyé avant ton paiement réduit la somme que tu perdrais si le joueur disparaissait, donc tu peux lui faire un meilleur prix en échange.',
      'Le simulateur ramène automatiquement cette valeur à la durée réelle de l’échange : on ne peut pas en recevoir 20 sur un échange qui n’en dure que 6.',
    ],
  },
  capped: 'Ramené à {n} : l’échange n’en dure pas davantage.',
  oneMoreDay: 'Un jour de plus : {value}.',
  oneMoreDayNothing: 'Un jour de plus ne change quasiment plus rien.',
};
