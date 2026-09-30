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

The address bar follows the form. Copy the URL and whoever opens it lands on the same
settings with the same price, already on screen — the result travels in the link, so
that page asks the API for nothing at all.

```
#a=37&d=0&p=r&v=3&c=2&w=7&r=1_204_0_102_2_2_0_3.11_16.39__0000_0010
```

Settings on the left, the reply packed after `r`. It stays in the fragment, which
browsers never send to a server. Only what the API already publishes travels: a price
and qualitative factors, never a coefficient.

`r` is versioned. A link written by an older build, truncated by a chat client or
edited by hand is refused rather than trusted, and the page recomputes the price
instead. A link shared before a price change keeps showing the price of that day; move
any field and it recalculates.

## Caching

Quotes already seen are kept in memory for the session, so sliding back and forth costs
nothing and the server sees one request per genuinely new setting. Nothing is written
to disk: a reload starts from a clean slate.

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
