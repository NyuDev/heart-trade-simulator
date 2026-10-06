export default {
  empty: 'No purchase amount entered yet.',
  profiles: {
    unknown: 'first time',
    regular: 'a familiar face',
    loyal: 'a close friend',
  },
  vouchesPart: ' with {n}',
  vouchesMax: ' with 5 vouches or more',
  sharedPart: ' via Shared Spaces',
  spread:
    'For a {amount} € purchase with {advance} of hearts sent before I pay, trust level “{profile}”{vouches}, the total is {hearts} to send at {rate} per play day ({playDays}/week){shared}, for an estimated {duration}.',
  single:
    'For a {amount} € purchase with {advance} of hearts sent before I pay, trust level “{profile}”{vouches}, the total is {hearts}, sent in one go{shared}.',

  // The same trade stated without the appraisal that priced it. Everything
  // left here is something both sides have to agree on anyway.
  termsSpread:
    'For a {amount} € purchase, the total is {hearts} to send at {rate} per play day ({playDays}/week){shared}, for an estimated {duration}.{advance}',
  termsSingle: 'For a {amount} € purchase, the total is {hearts}, sent in one go{shared}.{advance}',
  // The delay before the money moves: hearts go first, the purchase follows.
  termsAdvance:
    ' The purchase will be made {n} after the agreement: the hearts start going out before the money is spent.',
};
