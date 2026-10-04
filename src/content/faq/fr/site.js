export default {
  id: 'le-site',
  title: 'Le site',
  questions: [
    {
      id: 'donnees-collectees',
      q: 'Mes données sont-elles collectées ?',
      a: [
        'Il n’y a ni compte, ni inscription, ni identifiant. Les réglages sont envoyés au serveur de calcul pour obtenir un prix, et rien de ce qui part ne désigne une personne. Le serveur n’en tient aucun registre.',
        'Ils voyagent tout de même plus loin dans un cas : avec « partager le formulaire », les réglages sont inscrits dans le lien lui-même, donc le serveur qui fabrique l’aperçu les lit, et l’image qu’il dessine reste en cache environ un mois.',
        'La fréquentation est comptée par Cloudflare Web Analytics, qui ne dépose aucun cookie et ne stocke rien sur l’appareil ; comme toute requête web, elle communique l’adresse IP du visiteur à ce service. La seule chose que le site retient localement est la langue choisie.',
      ],
    },
    {
      id: 'beta',
      q: 'Que signifie la mention « bêta » ?',
      a: [
        'Que le calcul peut encore évoluer. Un prix obtenu aujourd’hui n’est pas garanti identique dans six mois, et un lien partagé conserve le prix de son époque.',
        'Rien n’est promis sur la disponibilité du service ni sur la conservation de quoi que ce soit.',
      ],
    },
    {
      id: 'licence-et-reutilisation',
      q: 'Puis-je réutiliser ce site ou son code ?',
      a: [
        'Le code et le contenu sont sous licence [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.fr) : redistribution possible avec attribution, sans usage commercial et sans modification.',
        'Les drapeaux viennent d’un jeu d’icônes tiers sous licence MIT, crédité dans le dépôt. Les suggestions passent par [une issue sur GitHub](https://github.com/NyuDev/heart-trade-simulator/issues/new).',
      ],
    },
  ],
};
