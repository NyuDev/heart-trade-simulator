export default {
  id: 'le-prix',
  title: 'Comment le prix est calculé',
  questions: [
    {
      id: 'comment-le-prix-est-calcule',
      q: 'Comment le prix est-il calculé ?',
      a: [
        'En deux temps. D’abord un taux de base en cœurs par euro, qui ne dépend que du montant. Ensuite ce taux est corrigé par ce qui change le risque et le délai.',
        'La descente du taux de base est continue : il n’existe aucun palier, donc un centime de plus ne fait jamais sauter le prix. Le résultat est maintenu dans une fourchette, et le freinage est progressif plutôt qu’un mur : aucun levier ne cesse jamais de compter dans le calcul. Le prix reste un nombre entier de cœurs, cela dit, si bien que tout près d’une borne une recommandation de plus peut valoir moins que le cœur qu’il faudrait pour se voir.',
        'Les coefficients ne sont pas publiés. Ce qui l’est, et que chaque devis affiche, c’est le sens et la force de chaque levier.',
      ],
    },
    {
      id: 'pourquoi-le-profil-compte',
      q: 'Pourquoi le prix dépend-il de la personne en face ?',
      a: [
        'Parce que c’est là qu’est le risque. Celui qui avance l’argent n’a aucun recours : ni séquestre, ni garantie, ni moyen de contraindre. Si l’autre s’arrête au bout de trois semaines, l’argent est perdu.',
        'Un joueur inconnu coûte donc plus cher qu’un joueur déjà connu, et des recommandations vérifiées font baisser le prix. Ce n’est pas un jugement moral : c’est le prix de l’incertitude.',
      ],
    },
    {
      id: 'pourquoi-la-vitesse-compte',
      q: 'Pourquoi la vitesse d’envoi change-t-elle le prix ?',
      a: [
        'Parce qu’elle décide de la durée, et la durée porte le risque : plus un échange traîne, plus il a d’occasions de s’interrompre.',
        'Le calcul ne retient pas le rythme d’un bon jour mais la moyenne réelle par jour calendaire : envoyer six cœurs trois jours par semaine va moins vite qu’en envoyer trois tous les jours. Au-delà d’un certain rythme, aller plus vite ne change presque plus rien — le risque, lui, a déjà cessé de baisser.',
      ],
    },
    {
      id: 'pourquoi-un-gros-montant-coute-moins-cher',
      q: 'Pourquoi un gros montant obtient-il un meilleur taux au cœur ?',
      a: [
        'Deux effets se contrarient ici. D’un côté l’effort ne suit pas le montant : monter un échange à soixante euros ne demande pas six fois plus de travail qu’à dix, c’est la même conversation, le même achat, le même suivi. De l’autre, un montant plus gros allonge la durée, et la durée porte le risque.',
        'L’effet d’effort l’emporte sur les petits montants puis s’épuise : c’est pourquoi l’amélioration ralentit et finit par ne presque plus bouger sur les très grosses commandes. La durée, elle, continue d’agir par le rythme d’envoi.',
      ],
    },
    {
      id: 'avance-avant-paiement',
      q: 'À quoi sert le délai avant le paiement ?',
      a: [
        'Les jours d’avance réduisent ce qui est exposé si l’accord s’arrête, et le prix suit : l’autre joueur commence à envoyer des cœurs avant que la somme soit dépensée.',
        'Pour le calcul, ce délai est plafonné à la durée de l’échange : demander plus long que l’échange ne dure n’apporte aucune remise supplémentaire, et le résultat le signale quand c’est le cas. Le lien partagé et la carte d’aperçu, eux, affichent le délai demandé — qui peut dépasser la durée. Quand il n’est pas nul, le remboursement porte sur un achat qui n’a pas encore eu lieu.',
      ],
    },
  ],
};
