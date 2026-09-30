export default {
  label: 'Profil du joueur',
  hint: {
    title: 'Profil du joueur',
    body: [
      'Ton historique personnel avec ce joueur précis.',
      'Un inconnu peut disparaître sans rien perdre. Un habitué a une réputation à tenir sur le serveur, et un client fidèle a bien plus à perdre en t’arnaquant qu’il n’a à y gagner.',
      'Ne compte comme « fidèle » qu’un joueur avec qui tu as déjà bouclé plusieurs échanges.',
    ],
  },
  options: {
    unknown: 'Inconnu / Premier échange',
    regular: 'Joueur régulier connu',
    loyal: 'Client fidèle',
  },
};
