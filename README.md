# Heart Trade Simulator

Prices Sky heart trades: you buy an in-game item with real money, the player pays you
back in hearts over days or weeks. The tool works out how many hearts to ask for.

**Live:** https://nyudev.github.io/heart-trade-simulator/

The interface collects the trade settings, sends them to an API and shows the quote.

## Language

English by default, switching to French on its own when the browser asks for it
(`navigator.languages` first, time zone as a fallback hint). A manual pick is
remembered and wins over detection.

Adding a language: a folder in `src/i18n/messages/`, an entry in `supportedLanguages`,
and a plural rule in `src/i18n/core/plurals.js`.

## Sharing a quote

The **Share this price** button copies a link to the exact quote on screen. The address
bar carries the same thing, so copying it by hand works too.

```
https://nyudev.github.io/heart-trade-simulator/#ICngFgkoGQN6HMIDwgNRrgI
```

Whoever opens it lands on those settings with that price, already on screen — the
result travels in the link, so the page asks the API for nothing at all.

Settings and reply are bit-packed and base64url-encoded: 23 to 28 characters for a
realistic trade, 35 at the very worst. It stays in the fragment, which browsers never
send to a server. Only what the API already publishes travels: a price and qualitative
factors, never a coefficient.

The format is versioned. A link that is truncated, hand-edited or written by a
different version is ignored rather than trusted, and the page opens on its defaults.
A link shared before a price change keeps showing the price of that day; move any
field and it recalculates.

## What the server is asked

Nothing, until the visitor changes something.

The opening settings always produce the same quote, so the deploy asks the API for it
once and bakes the answer into `config.js`. A first visit therefore renders a real
price without a request of its own, and the address bar stays as the visitor found it
— the share code appears the moment they move a field.

**A price change needs this site redeployed too.** The baked answer otherwise keeps
describing the previous model until the next build. Re-running the workflow is enough.

From then on, quotes already seen are kept in memory for the session, so sliding back
and forth costs nothing and the server sees one request per genuinely new setting.
Nothing is written to disk: a reload starts from a clean slate.

## Measurement

Cloudflare Web Analytics, as a script in `index.html`. Cookieless: nothing is stored
on the visitor's device and no identifier follows them across sites. The domain is
DNS-only on Cloudflare, so traffic never passes through it and this beacon is the only
way a visit is counted at all.

## Development

```bash
npm install
npm run dev     # http://localhost:5173
```

Vite proxies `/api` to `http://127.0.0.1:3001`, so the browser only ever sees one
origin. Override the target with `DEV_API_TARGET`.

## Deploying to GitHub Pages

Every push to `main` builds and deploys. Three things to set up once:

1. **Settings → Pages → Source: GitHub Actions**
2. **Settings → Secrets and variables → Actions → Variables**: add `API_BASE_URL`,
   for example `https://api.example.com/api`
3. Allow the Pages origin in the API's CORS configuration

The API address is written into `config.js` at deploy time rather than baked into the
bundle, so changing the variable and re-running the workflow is enough — no rebuild.
`index.html` loads that file with a per-build token, so a cached copy can never outlive
the bundle it belongs to.

Until `API_BASE_URL` is set, the page loads but reports that no API is connected.

## Self-hosting

```bash
docker build -t heart-trade-simulator .
docker run -p 8080:8080 -e API_BASE_URL=https://api.example.com/api heart-trade-simulator
```

Set `API_UPSTREAM` instead and nginx proxies `/api` internally: same origin, no CORS
to configure.

## Layout

```
src/
  api/            the only network boundary
  share/          reading and writing the shareable link
  state/          form, payload, input bounds
  i18n/           language detection, dictionaries
  format/         numbers, units, durations, summary
  composables/    debounce, countdown, clipboard, quote fetching
  components/     layout, form, fields, quote panel
  styles/         tokens, reset, controls
```

No file goes over 100 lines. Each split follows a responsibility, not a quota.

## Licence

Code under the MIT licence ([LICENSE](LICENSE)). Everything that is not code — the copy,
the translations, the artwork — under CC BY-NC-ND 4.0
([LICENSE-CONTENT.md](LICENSE-CONTENT.md)). Creative Commons advises against its licences
for software, hence the split.

Unofficial fan project, not affiliated with thatgamecompany, Inc. See the notice at the
bottom of the site.

## Settings you can edit without a build

[`public/site.json`](public/site.json) carries the beta badge and the sponsor box. Edit it
straight from GitHub, commit, and the change is live about a minute later. A typo there
cannot break the site: anything unreadable is ignored and that part simply does not appear.
