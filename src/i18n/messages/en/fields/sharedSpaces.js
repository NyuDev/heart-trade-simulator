export default {
  label: 'Turn on the Shared Spaces trick',
  sublabel: '(messages / candles)',
  description: 'Faster sending, in exchange for daily handling on your side.',
  hint: {
    title: 'Shared Spaces',
    body: [
      'The messages-and-candles trick lets the player send you more hearts per session than one heart per account would allow.',
      'In return it forces a tedious daily chore on you: taking your candle down, putting it back, dealing with server glitches. That daily work therefore counts in the balance of the trade.',
      'Only turn it on if you are willing to handle it every day until the trade is done.',
    ],
  },
  warning:
    'Here the trick asks the player for {n} hearts more than going without: it shortens the trade below the requested days of hearts sent before payment, so what those days were earning them is lost. You would be doing the daily chore for nothing - turn it off, or ask for fewer days.',
};
