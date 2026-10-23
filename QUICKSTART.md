# Build and verify

Unofficial Cronitor TypeScript SDK generated with Voxgig. MIT licensed; copyright Irfan. No npm release has been published.

Use Node.js 24 or later. From a fresh clone:

```sh
cd .sdk
npm ci
npm run generate
npx voxgig-sdkgen doctor
cd ../ts
npm ci
npm test
cd ..
node --test verification/wire.test.cjs
```

Build before importing `./ts/dist/CronitorSDK`. Compiled output is intentionally ignored in Git. The generated installation text suggests a clone contains compiled output; follow these build instructions instead.

## Read-only live test

Create a free [Cronitor account](https://cronitor.io/sign-up). In API Settings create a custom key with `monitor:read`. A telemetry-only key cannot access the REST API. Copy `.env.example` to `.env` and set `CRONITOR_API_KEY` locally. The file is ignored by Git.

```sh
node --env-file=.env scripts/live-smoke.cjs
```

This checks authenticated listing through both `direct()` and `Monitor().list()`, then loads an existing monitor if one exists. It creates, updates and deletes nothing. A successful empty-account list does not verify loading. Other entities and write operations are not covered by this smoke test.

## Live monitor CRUD test

With a test-account key carrying `monitor:read` and `monitor:write`, run:

```sh
node --env-file=.env scripts/live-crud.cjs
```

This creates one uniquely named paused heartbeat monitor with notifications disabled, verifies create/load/update/list/remove through the generated SDK, and confirms deletion with an HTTP 404. It attempts cleanup if a stage fails. It never changes existing monitors. For the configured API version use `schedules: ['every 1 day']`, rather than the older `schedule` field. Generated updates take `{ monitor_list: [...] }`.

```js
const { CronitorSDK } = require('./ts/dist/CronitorSDK')
const client = new CronitorSDK({ apikey: process.env.CRONITOR_API_KEY })
const monitors = await client.Monitor().list({ page: 1, page_size: 5 })
```

The SDK maps `page_size` to Cronitor's `pageSize` query parameter and sends `Cronitor-Version: 2025-11-28`. It encodes the API key as the HTTP Basic username with an empty password. No secret/password option is needed.

## Regeneration

Edit the OpenAPI definition, `.sdk/model/project.aontu`, or `.sdk/model/guide/guide.aontu`, then regenerate. Do not edit `ts/` source. Project ownership is configured in the model; `sdk.aontu` also sets `origin: 'irfanf16'`. Preserve that setting when re-scaffolding.

The two project-specific header expectations live in `.sdk/test/primary/prepareHeaders.aontu` and `makeSpec.aontu`; re-scaffolding may replace them. See [REPORT.md](REPORT.md) for findings and verification limits.
