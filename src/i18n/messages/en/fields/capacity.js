export default {
  label: 'Sending capacity',
  unit: 'hearts / play day',
  hint: {
    title: 'Sending capacity',
    body: [
      'How many hearts the player can send you on a day they log in.',
      'The game caps what one account can give, but some players run several accounts to go faster. Faster sending shortens the trade, which lowers your exposure.',
      'Enter what they actually manage in one session, not what they promise. Past a certain pace, going faster barely moves the price: the risk stops dropping.',
    ],
  },
  doubleCapacity: 'Doubling the capacity: {value}.',
  doubleCapacityNothing: 'Doubling the capacity barely changes anything now.',
};
