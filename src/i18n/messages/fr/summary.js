export default {
  empty: 'Aucun montant d’achat saisi pour le moment.',
  profiles: {
    unknown: 'inconnu',
    regular: 'régulier',
    loyal: 'fidèle',
  },
  vouchesPart: ' avec {n}',
  vouchesMax: ' avec 5 recommandations ou plus',
  sharedPart: ' via Espaces Partagés',
  spread:
    'Pour un achat de {amount} € avec {advance} d’avance avant mon paiement, profil {profile}{vouches}, le total est de {hearts} à envoyer à raison de {rate} par jour de connexion ({playDays}/semaine){shared}, soit une durée estimée de {duration}.',
  single:
    'Pour un achat de {amount} € avec {advance} d’avance avant mon paiement, profil {profile}{vouches}, le total est de {hearts}, envoyé en une seule fois{shared}.',

  // Le même échange, sans l’appréciation qui a fixé le prix. Ne reste que ce
  // sur quoi les deux parties doivent de toute façon s’entendre.
  termsSpread:
    'Pour un achat de {amount} €, le total est de {hearts} à envoyer à raison de {rate} par jour de connexion ({playDays}/semaine){shared}, soit une durée estimée de {duration}.{advance}',
  termsSingle:
    'Pour un achat de {amount} €, le total est de {hearts}, envoyé en une seule fois{shared}.{advance}',
  // Le délai avant la dépense : les cœurs partent d’abord, l’achat suit.
  termsAdvance:
    ' L’achat sera effectué {n} après l’accord : l’envoi des cœurs commence avant que la somme soit dépensée.',
};
