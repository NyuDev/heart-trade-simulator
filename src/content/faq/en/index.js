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
  title: 'How many hearts for a Sky trade · Frequently asked questions',
  heading: 'Frequently asked questions',
  description:
    'How the simulator prices a Sky heart trade paid in real money: where the 10 € Season Pass anchor of about 70 hearts comes from, and what moves it.',
  intro:
    'This site works out how many hearts to ask for a Sky trade paid in real money. Here is what it does, what it does not do, and what the price rests on.',
  tocLabel: 'Contents',
  // Position 2 of the breadcrumb, and the only place the work is named on a
  // page that is not itself the application.
  appName: 'Price & Risk Simulator',
  imageAlt: 'Sky heart trade calculator — how many hearts to ask for a trade paid in real money',
  nativeName: 'English',
  languageLabel: 'Change language',
  backLabel: 'Back to the simulator',
  sections: [trade, pricing, rate, risk, sharing, site],
};
