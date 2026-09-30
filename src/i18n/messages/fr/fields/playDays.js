export default {
  label: 'Jours de jeu par semaine',
  badge: '{n} j/sem',
  note: 'Rythme réel : {value} par jour calendaire.',
  hint: {
    title: 'Jours de jeu par semaine',
    body: [
      'À quelle fréquence le joueur se connecte vraiment.',
      'C’est le champ le plus sous-estimé. Un joueur qui envoie beaucoup mais seulement deux fois par semaine met bien plus longtemps qu’il n’y paraît, et ton argent reste immobilisé pendant tout ce temps.',
      'Le simulateur en déduit la vraie moyenne par jour calendaire, puis la vraie durée de l’échange.',
    ],
  },
};
