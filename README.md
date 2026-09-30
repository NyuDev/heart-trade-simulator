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
  i18n/           language detection, dictionaries
  format/         numbers, units, durations, summary
  composables/    debounce, countdown, clipboard, quote fetching
  components/     layout, form, fields, quote panel
  styles/         tokens, reset, controls
```

No file goes over 100 lines. Each split follows a responsibility, not a quota.
