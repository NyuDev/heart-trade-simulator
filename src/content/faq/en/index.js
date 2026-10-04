import trade from './trade.js';
import pricing from './pricing.js';
import rate from './rate.js';
import risk from './risk.js';
import sharing from './sharing.js';
import site from './site.js';

export default {
  code: 'en',
  locale: 'en-GB',
  openGraphLocale: 'en_GB',
  path: 'faq/',
  title: 'Frequently asked questions · Price & Risk Simulator',
  heading: 'Frequently asked questions',
  description:
    'How the simulator prices a Sky trade paid in real money: where the 10 € for about 70 hearts anchor comes from, why the shop rate does not apply, and what moves the price up or down.',
  intro:
    'This site works out how many hearts to ask for a Sky trade paid in real money. Here is what it does, what it does not do, and what the price rests on.',
  tocLabel: 'Contents',
  nativeName: 'English',
  languageLabel: 'Change language',
  backLabel: 'Back to the simulator',
  disclaimer:
    'Unofficial fan project, unconnected to thatgamecompany. This site works out a price: it sells nothing, arranges no trade and takes no commission.',
  sections: [trade, pricing, rate, risk, sharing, site],
};
