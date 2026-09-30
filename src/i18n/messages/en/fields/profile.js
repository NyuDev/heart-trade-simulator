export default {
  label: 'Player profile',
  hint: {
    title: 'Player profile',
    body: [
      'Your own track record with this specific player.',
      'A stranger can disappear and lose nothing. A regular has a reputation to keep on the server, and a loyal customer has far more to lose by scamming you than they could gain.',
      'Only count someone as loyal if you have already completed several trades together.',
    ],
  },
  options: {
    unknown: 'Stranger / First trade',
    regular: 'Known regular player',
    loyal: 'Loyal customer',
  },
};
