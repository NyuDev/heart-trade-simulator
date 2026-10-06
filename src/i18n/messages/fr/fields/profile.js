export default {
  label: 'Niveau de confiance',
  hint: {
    title: 'Niveau de confiance',
    body: [
      'Ton historique personnel avec ce joueur précis.',
      'Quelqu’un que tu ne connais pas peut disparaître sans rien perdre. Un visage familier a une réputation à tenir sur le serveur, et un ami proche a bien plus à perdre en t’arnaquant qu’il n’a à y gagner.',
      'Ne compte comme ami proche qu’un joueur avec qui tu as déjà bouclé plusieurs échanges. Dans le doute, descends d’un cran : c’est toi qui avances l’argent.',
    ],
  },
  options: {
    unknown: 'Première fois ensemble',
    regular: 'Un visage familier',
    loyal: 'Un ami proche',
  },
};
