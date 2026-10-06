export default {
  label: 'Nombre de comptes',
  unit: 'comptes',
  hint: {
    title: 'Nombre de comptes',
    body: [
      'Combien de comptes le joueur peut utiliser pour t’envoyer des cœurs un jour où il se connecte.',
      'Le jeu autorise un cœur par compte et par jour de connexion : deux comptes, donc deux cœurs par jour. Un envoi plus rapide raccourcit l’échange, donc tu restes moins longtemps en risque.',
      'Ne compte que les comptes depuis lesquels il envoie réellement, pas ceux qu’il dit avoir. Au-delà d’un certain nombre, en ajouter ne change plus grand-chose à ce que tu demandes : le risque, lui, ne descend plus.',
    ],
  },
  doubleCapacity: 'Deux fois plus de comptes : {value}.',
  doubleCapacityNothing: 'Deux fois plus de comptes ne change quasiment plus rien.',
};
