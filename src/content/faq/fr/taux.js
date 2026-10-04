export default {
  id: 'pourquoi-ce-taux',
  title: 'Pourquoi ce taux',
  questions: [
    {
      id: 'pourquoi-70-coeurs-pour-10-euros',
      q: 'Pourquoi le simulateur s’ouvre-t-il sur 10 € pour environ 70 cœurs ?',
      a: [
        'C’est le point de calage, et il vient du Season Pass : c’est l’achat le plus courant dans ce genre d’échange, et la communauté s’est largement fixée autour de ce rapport.',
        'Il ne vaut que pour ce montant : le taux au cœur s’améliore sur les commandes plus grosses et se dégrade sur les très petites, et le reste du calcul l’écarte encore selon le risque et le délai. Parler d’un « taux du site » n’aurait pas de sens.',
        'Le point de calage est une convention, pas un résultat. Ce que le calcul ajoute, c’est de la cohérence et un sens : les mêmes corrections pour tout le monde, dans la même direction. Il ne démontre pas que ce niveau-là est le bon. Qui trouve la convention mauvaise discute avec la communauté, pas avec l’arithmétique.',
      ],
    },
    {
      id: 'pourquoi-pas-le-taux-de-la-boutique',
      q: 'En passant par la boutique, un cœur reviendrait à environ un euro. Pourquoi ne pas s’aligner dessus ?',
      a: [
        'Ce calcul revient souvent dans les discussions, et il est juste. Mais un prix affiché en boutique n’est pas une valeur : c’est une demande de vente. Ce taux-là n’a aucun marché observé — rien n’indique que des cœurs changent de main à un euro pièce — donc c’est un prix demandé, pas un prix constaté.',
        'Ce chiffre sert de plafond : au-delà, celui qui paie n’a plus aucune raison de passer par un échange. Un plafond ne dit pas où le prix doit se poser en dessous.',
        'Surtout, s’aligner dessus reviendrait à dire que celui qui avance l’argent ne gagne rien à le faire. Il paie comptant, définitivement, et attend d’être remboursé pendant des mois par quelqu’un que rien n’oblige à aller au bout. Un prix auquel une seule des deux parties a intérêt à agir n’est pas un prix sur lequel deux personnes s’entendraient.',
      ],
    },
    {
      id: 'est-ce-que-ca-devalue-les-coeurs',
      q: 'Ce taux ne dévalue-t-il pas les cœurs ?',
      a: [
        'Le rapport entre une somme et un nombre de cœurs ne décrit pas la valeur d’un cœur. Il décrit un délai et un risque.',
        'Le schéma est celui d’un paiement différé : l’objet arrive tout de suite, il se paie sur plusieurs mois. Personne ne dit qu’un paiement en plusieurs fois dévalue l’argent de celui qui l’obtient ; il revient plus cher que le comptant parce que quelqu’un avance et attend. L’écart se mesure ici par rapport au point de calage, pas par rapport au prix de la boutique.',
        'Et un cœur n’est pas gratuit, il est lent. On ne peut pas en obtenir cent dans la journée, quel que soit le temps passé en jeu. Ce qui se paie ici, c’est ce calendrier.',
      ],
    },
    {
      id: 'ce-prix-fait-il-autorite',
      q: 'Ce prix fait-il autorité ?',
      a: [
        'Non, et le présenter ainsi serait malhonnête. C’est un point de départ défendable, calculé de la même façon pour tout le monde.',
        'Deux joueurs restent libres de s’entendre sur autre chose. Le chiffre sert surtout à partir d’une base commune plutôt que d’une impression.',
      ],
    },
  ],
};
