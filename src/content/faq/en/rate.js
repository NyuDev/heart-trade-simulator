export default {
  id: 'why-this-rate',
  title: 'Why this rate',
  questions: [
    {
      id: 'why-70-hearts-for-10-euros',
      q: 'Why does the simulator open on 10 € for about 70 hearts?',
      a: [
        'That is the anchor, and it comes from the Season Pass: it is the most common purchase in this kind of trade, and the community has largely settled around that figure.',
        'It holds for that amount only: the per-heart rate improves on larger orders and worsens on very small ones, and the rest of the calculation moves it further according to risk and delay. Talking about a single rate for the site would mean nothing.',
        'The anchor is a convention, not a result. What the calculation adds is consistency and direction — the same adjustments for everyone, in the same sense. It does not demonstrate that this level is the right one. Anyone who thinks the convention is wrong is arguing with the community, not with the arithmetic.',
      ],
    },
    {
      id: 'why-not-the-shop-rate',
      q: 'Going through the shop, a heart would cost about a euro. Why not use that?',
      a: [
        'That calculation comes up often in discussions, and it is correct. But a shop price is not a value: it is an asking price. That rate has no observed market — nothing is known to change hands at a euro a heart — so it is an asking price rather than a settled one.',
        'The figure works as a ceiling: above it, whoever is paying has no reason to trade at all. A ceiling does not say where the price should sit underneath it.',
        'Above all, matching it would mean that whoever fronts the money gains nothing by doing so. They pay in full, once, irreversibly, then wait months to be repaid by someone nothing obliges to finish. A price only one side has a reason to accept is not a price two people would agree on.',
      ],
    },
    {
      id: 'does-this-devalue-hearts',
      q: 'Does this rate devalue hearts?',
      a: [
        'The ratio between a sum and a number of hearts does not describe what a heart is worth. It describes a delay and a risk.',
        'The shape is deferred payment: the item arrives at once, and is paid for over several months. Nobody says paying in instalments devalues the money of whoever gets the goods; it comes to more than cash because someone is fronting and waiting. The gap is measured here against the anchor, not against the shop price.',
        'And a heart is not free, it is slow. A hundred of them cannot be had in a day, however long anyone plays. What is being paid for here is that calendar.',
      ],
    },
    {
      id: 'is-this-price-authoritative',
      q: 'Is this price authoritative?',
      a: [
        'No, and presenting it that way would be dishonest. It is a defensible starting point, worked out the same way for everyone.',
        'Two players remain free to agree on something else. The number is mostly there so a conversation starts from common ground rather than from an impression.',
      ],
    },
  ],
};
