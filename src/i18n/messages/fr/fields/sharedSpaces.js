export default {
  label: 'Activer l’astuce des Espaces Partagés',
  sublabel: '(messages / bougies)',
  description: 'Envois plus rapides, contre une manipulation quotidienne de ta part.',
  hint: {
    title: 'Espaces Partagés',
    body: [
      'L’astuce des messages et bougies permet au joueur de t’envoyer plus de cœurs par session qu’un cœur par compte ne le permettrait.',
      'En contrepartie, elle t’impose une manipulation quotidienne pénible : retirer ta bougie, la replacer, gérer les bugs du serveur. Ce travail quotidien compte donc dans l’équilibre de l’échange.',
      'Ne l’active que si tu es prêt à t’en occuper tous les jours jusqu’à la fin de l’échange.',
    ],
  },
  warning:
    'Ici, l’astuce demande {n} cœurs de plus au joueur que sans elle : elle raccourcit l’échange sous le nombre de jours d’envoi de cœurs avant paiement demandés, donc ce que ces jours lui faisaient gagner se perd. Tu ferais la manipulation quotidienne pour rien — décoche-la, ou demande moins de jours.',
};
