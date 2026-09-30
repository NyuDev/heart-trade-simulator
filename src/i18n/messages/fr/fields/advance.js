export default {
  label: 'Jours d’avance',
  badge: '{n} j',
  hint: {
    title: 'Jours d’avance',
    body: [
      'Nombre de jours pendant lesquels le joueur t’envoie des cœurs AVANT que tu ne paies de ta poche.',
      'C’est ta principale protection : chaque jour d’avance réduit la somme que tu perdrais si le joueur disparaissait, donc tu peux lui faire un meilleur prix en échange.',
      'Le simulateur ramène automatiquement cette valeur à la durée réelle de l’échange : on ne peut pas recevoir 20 jours d’avance sur un échange qui n’en dure que 6.',
    ],
  },
  capped: 'Ramené à {n} : l’échange n’en dure pas davantage.',
  oneMoreDay: 'Un jour de plus : {value}.',
  oneMoreDayNothing: 'Un jour de plus ne change quasiment plus rien.',
  idle: 'Le joueur envoie des cœurs avant que tu ne paies.',
};
