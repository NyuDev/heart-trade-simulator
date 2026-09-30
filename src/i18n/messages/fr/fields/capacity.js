export default {
  label: 'Capacité d’envoi',
  unit: 'cœurs / jour de connexion',
  hint: {
    title: 'Capacité d’envoi',
    body: [
      'Combien de cœurs le joueur peut t’envoyer un jour où il se connecte.',
      'Le jeu limite ce qu’un compte peut donner, mais certains joueurs utilisent plusieurs comptes pour aller plus vite. Un envoi rapide raccourcit l’échange, donc réduit ton exposition.',
      'Indique ce qu’il fait réellement en une session, pas ce qu’il promet. Au-delà d’un certain rythme, accélérer n’apporte plus grand-chose au prix : le risque, lui, ne descend plus.',
    ],
  },
  doubleCapacity: 'Doubler la capacité : {value}.',
  doubleCapacityNothing: 'Doubler la capacité ne change quasiment plus rien.',
};
