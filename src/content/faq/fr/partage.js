export default {
  id: 'le-partage',
  title: 'Partager un résultat',
  questions: [
    {
      id: 'resultat-ou-formulaire',
      q: 'Quelle différence entre « partager le résultat » et « partager le formulaire » ?',
      a: [
        'Partager le résultat envoie les chiffres dont une discussion a besoin : la somme, le nombre de cœurs, la durée, le rythme d’envoi, le délai éventuel avant le paiement et le jour où le prix a été calculé.',
        'Partager le formulaire envoie en plus le profil attribué à l’autre joueur et les recommandations comptées. C’est une appréciation personnelle, et elle n’a pas forcément à être transmise à la personne qu’elle décrit.',
        'Dans le premier cas, ces deux réglages sont absents du lien, pas seulement masqués : ils n’y sont pas écrits. Le rythme d’envoi, lui, y figure, puisqu’il fait partie des modalités — l’autre joueur peut donc en déduire le nombre de cœurs par jour qui a été supposé de lui.',
      ],
    },
    {
      id: 'que-contient-un-lien',
      q: 'Que contient un lien de partage ?',
      a: [
        'De quoi réafficher le résultat, et rien d’autre. Aucun compte, aucun pseudonyme, aucune adresse, rien qui désigne une personne.',
        'Un lien tronqué, ou abîmé pendant le transport, est rejeté plutôt qu’interprété : la page s’ouvre alors sur ses valeurs par défaut. En revanche le lien ne porte aucune signature : il ne prouve pas qui l’a fabriqué, ni qu’il n’a pas été retouché. Les chiffres qu’il contient se lisent comme n’importe quel message reçu, et se revérifient en les saisissant soi-même.',
        'Un résultat partagé garde le prix du jour où il a été calculé — c’est pourquoi ce jour figure sur l’aperçu. Déplacer n’importe quel réglage le recalcule.',
      ],
    },
  ],
};
