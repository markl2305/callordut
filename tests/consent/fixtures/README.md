# Cached vendor loaders (consent tests)

Public vendor JavaScript, cached 2026-10-12 (gtag.js 2026-10-13 UTC) so the consent tests execute the real collectors with no network.
Each is served by the harness in place of the live file; every collection request they make is answered locally
and never delivered.

| file | fetched from | bytes | note |
|---|---|---|---|
| `vercel-insights-script.js` | `https://hiresabina.ai/_vercel/insights/script.js` (brotli body, decoded) | 4,550 | Vercel Web Analytics loader `sv 0.1.3`; byte-identical to the copy anvil cached from dominusos.ai for review 1h-R1 |
| `linkedin-insight.min.js` | `https://snap.licdn.com/li.lms-analytics/insight.min.js` | 3,337 | bootstrap; picks `beta` or `old` by partner id |
| `linkedin-insight.beta.min.js` | `https://snap.licdn.com/li.lms-analytics/insight.beta.min.js` | 62,285 | |
| `linkedin-insight.old.min.js` | `https://snap.licdn.com/li.lms-analytics/insight.old.min.js` | 62,130 | |
| `gtag-js-G-8Q4S859G8F.js` | `https://www.googletagmanager.com/gtag/js?id=G-8Q4S859G8F` (gzip body, decoded), fetched **2026-10-13T01:09:31Z**, one GET, no collection request | 466,967 | hiresabina's real GA4 container. Destinations in it: `G-8Q4S859G8F` and the linked Google tag `GT-MQXCL5MZ`; **no `AW-` (Google Ads) id**. Enhanced measurement on (page/history/scroll/outbound/form/video/download), email auto-redaction on, one conversion-marking rule (`close_convert_lead`). sha256 `ca31948f…4911` |

`SHA256SUMS` pins them (`shasum -a 256 -c tests/consent/fixtures/SHA256SUMS` from the repo root). The harness serves
gtag.js only for the id it was cached for; a sibling site with another GA id caches its own container here (one GET of
the public script) or passes `CONSENT_GA_FIXTURE`, otherwise its GA checks fail. Nothing is fetched at test time. When a vendor changes its loader, re-cache it here and re-run the matrix; a stale copy
proves the behaviour of that copy only.
