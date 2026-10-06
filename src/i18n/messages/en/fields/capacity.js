export default {
  label: 'Number of accounts',
  unit: 'accounts',
  hint: {
    title: 'Number of accounts',
    body: [
      'How many accounts the player can send you hearts from on a day they log in.',
      'The game allows one heart per account per play day, so two accounts means two hearts a day. Faster sending shortens the trade, so you stay at risk for less time.',
      'Count only the accounts they actually send from, not the ones they say they have. Past a certain number, adding more barely changes what you ask: the risk stops dropping.',
    ],
  },
  doubleCapacity: 'Twice as many accounts: {value}.',
  doubleCapacityNothing: 'Twice as many accounts barely changes anything now.',
};
