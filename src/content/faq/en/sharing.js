export default {
  id: 'sharing',
  title: 'Sharing a result',
  questions: [
    {
      id: 'result-or-form',
      q: 'What is the difference between sharing the result and sharing the form?',
      a: [
        'Sharing the result sends the figures a conversation needs: the amount, the number of hearts, the duration, the sending pace, any delay before payment, and the day the price was worked out.',
        'Sharing the form sends the profile given to the other player and the vouches counted as well. That is a personal appraisal, and it does not necessarily belong in the hands of the person it describes.',
        'In the first case those two settings are absent from the link rather than merely hidden: they are not written into it. The sending pace is, because it is one of the terms — so the other player can work out roughly how many hearts a day were assumed of them.',
      ],
    },
    {
      id: 'what-a-link-contains',
      q: 'What does a share link contain?',
      a: [
        'Enough to show the result again, and nothing else. No account, no nickname, no address, nothing that identifies a person.',
        'A link that has been truncated, or mangled in transit, is rejected rather than guessed at: the page opens on its defaults. The link carries no signature, though: it proves nothing about who built it, or that it has not been altered. The figures in it read like any other received message, and are worth re-entering to check.',
        'A shared result keeps the price of the day it was made, which is why that day appears on the preview. Moving any setting recalculates it.',
      ],
    },
  ],
};
