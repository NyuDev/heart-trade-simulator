export default {
  id: 'how-the-price-works',
  title: 'How the price is worked out',
  questions: [
    {
      id: 'how-the-price-is-calculated',
      q: 'How is the price calculated?',
      a: [
        'In two steps. First a base rate in hearts per euro, which depends on the amount alone. Then that rate is adjusted by whatever changes the risk and the delay.',
        'The base rate falls smoothly: there are no tiers, so one more cent never makes the price jump. The result is kept inside a band, and the braking is gradual rather than a wall: no lever ever stops counting in the calculation. The price is a whole number of hearts, though, so hard against an edge one more vouch can be worth less than the heart it would take to show.',
        'The coefficients are not published. What is, and what every quote shows, is the direction and strength of each lever.',
      ],
    },
    {
      id: 'why-the-other-player-matters',
      q: 'Why does the price depend on who is on the other side?',
      a: [
        'Because that is where the risk sits. Whoever fronts the money has no recourse: no escrow, no guarantee, no way to compel anyone. If the other player stops after three weeks, the money is gone.',
        'A stranger therefore costs more than someone already known. A counterparty whose vouches have been verified lowers the price; an unverified one raises it. It is not a moral judgement; it is the price of uncertainty.',
      ],
    },
    {
      id: 'why-sending-speed-matters',
      q: 'Why does the sending pace change the price?',
      a: [
        'Because it decides the duration, and the duration carries the risk: the longer a trade runs, the more chances it has to break.',
        'The calculation uses the true average per calendar day rather than a good day: six hearts three days a week is slower than three hearts every day. Past a certain pace, going faster barely moves the price — the risk has already stopped dropping.',
      ],
    },
    {
      id: 'why-bigger-orders-cost-less-per-heart',
      q: 'Why does a larger purchase get a friendlier rate per heart?',
      a: [
        'Two things pull against each other here. Setup effort does not scale with the amount — a sixty-euro trade is not six times the work of a ten-euro one, it is the same conversation, the same purchase, the same follow-up. But a larger amount implies a longer trade, and duration carries the risk.',
        'The effort term wins at small amounts and then fades, which is why the improvement flattens out and barely moves at all on the largest orders. Duration keeps acting through the sending pace.',
      ],
    },
    {
      id: 'advance-before-payment',
      q: 'What are the days of advance for?',
      a: [
        'Days of advance reduce what is exposed if the arrangement stops, and the price follows: the other player starts sending hearts before the sum is actually spent.',
        'For pricing it is capped at the length of the trade: asking for longer than the trade runs earns no further discount, and the quote says so when that happens. The shared link and the preview card state the delay that was asked for, which can be longer. When it is not zero, the repayment covers a purchase that has not happened yet.',
      ],
    },
  ],
};
