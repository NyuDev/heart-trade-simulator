export default {
  id: 'the-site',
  title: 'The site',
  questions: [
    {
      id: 'data-collection',
      q: 'Is any of my data collected?',
      a: [
        'There is no account, no sign-up and no identifier. The settings are sent to the pricing server to obtain a price, and nothing that leaves identifies a person. The server keeps no record of the request.',
        'They do travel further in one case: with "share the form" the settings are written into the link itself, so the server that builds the preview reads them, and the picture it draws is cached for about a month.',
        'Traffic is counted by Cloudflare Web Analytics, which sets no cookie and stores nothing on the device; like any web request, it discloses the visitor IP address to that service. The one thing the site keeps locally is the chosen language.',
      ],
    },
    {
      id: 'what-beta-means',
      q: 'What does the beta label mean?',
      a: [
        'That the calculation may still change. A price obtained today is not guaranteed to be the same in six months, and a shared link keeps the price of its own day.',
        'Nothing is promised about availability, or about keeping anything.',
      ],
    },
    {
      id: 'licence-and-reuse',
      q: 'Can I reuse this site or its code?',
      a: [
        'The code and the content are under [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/): redistribution with attribution, no commercial use and no derivatives.',
        'The flags come from a third-party icon set under the MIT licence, credited in the repository. Suggestions go through [an issue on GitHub](https://github.com/NyuDev/heart-trade-simulator/issues/new).',
      ],
    },
  ],
};
