export default {
  label: 'Days of hearts sent before payment',
  badge: '{n} d',
  hint: {
    title: 'Days of hearts sent before payment',
    body: [
      'How many days the player sends you hearts BEFORE you spend a penny of your own. The custom is the other way round: you buy first, and the hearts follow.',
      'This is your main protection: every day sent before you pay shrinks what you would lose if the player vanished, so you can afford a better price in return.',
      'The simulator automatically caps this at the real length of the trade: you cannot receive 20 of them on a trade that only lasts 6.',
    ],
  },
  capped: 'Capped at {n}: the trade does not last any longer than that.',
  oneMoreDay: 'One more day: {value}.',
  oneMoreDayNothing: 'One more day barely changes anything now.',
};
