export default {
  label: 'Days of advance',
  badge: '{n} d',
  hint: {
    title: 'Days of advance',
    body: [
      'How many days the player sends you hearts BEFORE you pay out of your own pocket.',
      'This is your main protection: every day of advance shrinks what you would lose if the player vanished, so you can afford a better price in return.',
      'The simulator automatically caps this at the real length of the trade: you cannot receive 20 days of advance on a trade that only lasts 6.',
    ],
  },
  capped: 'Capped at {n}: the trade does not last any longer than that.',
  oneMoreDay: 'One more day: {value}.',
  oneMoreDayNothing: 'One more day barely changes anything now.',
  idle: 'The player sends hearts before you pay.',
};
