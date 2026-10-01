export default {
  empty: 'No purchase amount entered yet.',
  profiles: {
    unknown: 'stranger',
    regular: 'regular',
    loyal: 'loyal',
  },
  vouchesPart: ' with {n}',
  vouchesMax: ' with 5 vouches or more',
  sharedPart: ' via Shared Spaces',
  spread:
    'For a {amount} € purchase with {advance} of advance before I pay, {profile} profile{vouches}, the total is {hearts} to send at {rate} per play day ({playDays}/week){shared}, for an estimated {duration}.',
  single:
    'For a {amount} € purchase with {advance} of advance before I pay, {profile} profile{vouches}, the total is {hearts}, sent in one go{shared}.',

  // The same trade stated without the appraisal that priced it. Everything
  // left here is something both sides have to agree on anyway.
  termsSpread:
    'For a {amount} € purchase, the total is {hearts} to send at {rate} per play day ({playDays}/week){shared}, for an estimated {duration}.',
  termsSingle: 'For a {amount} € purchase, the total is {hearts}, sent in one go{shared}.',
};
