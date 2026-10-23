# Voxgig SDK generator observations

Author: Irfan · Research: 23 October 2026 · Updated: 24 October 2026 · Repository: https://github.com/irfanf16/cronitor-sdk

**Status: generated, verified offline, and authenticated monitor CRUD verified against Cronitor.**

## Selection and scope

I selected [Cronitor](https://cronitor.io/docs/api), a monitoring SaaS with a free account and an official OpenAPI 3.0.3 specification. I enumerated all 804 public repositories returned by the Voxgig SDK organisation API on 23 October and found no name containing `cronitor`. The snapshot is in `evidence/catalogue-2026-10-23.txt`; catalogue availability can change.

The TypeScript SDK was produced using the official Voxgig generator, not a handwritten client. It exposes 16 inferred entities from 37 paths and 72 HTTP operations. Independent live verification covers monitor create, load, update, list and remove; the remaining entities and complete endpoint coverage are unverified.

## Reproduction and results

```sh
npm create --yes @voxgig/sdkgen@latest cronitor -- -d ./openapi.json -o ./cronitor-sdk -t ts -f test
cd cronitor-sdk/.sdk
npm run generate
npx voxgig-sdkgen doctor
cd ../ts
npm install
npm test
```

Actual resolved toolchain: sdkgen 4.35.3, apidef 8.25.5, model 12.0.1, docgen 0.30.7; Node 24.19.0, npm 11.17.0. Lockfiles preserve the resolved dependencies.

- Generation and TypeScript compilation succeeded.
- Generated suite: 46 test files passed, zero failed after the fixture adjustment below. These are Node's file-level summary counts, not the number of individual assertions.
- Three independent request checks passed: monitor listing/auth/version/query mapping, monitor resource loading, and HTTP 401 envelope handling. All use a synthetic fetch transport, not Cronitor's servers.
- `doctor` reported the scaffold matched, with zero additive items.
- [SDK verification on GitHub Actions passed](https://github.com/irfanf16/cronitor-sdk/actions/runs/40022201530). After the workflow fix, [Documentation CI also passed on a fresh GitHub runner](https://github.com/irfanf16/cronitor-sdk/actions/runs/40024681485), including full Vale QA. See finding 6 for the cause and durable project configuration.
- Authenticated live tests: **passed**. The read-only smoke test verified HTTP 200 and response shape through `direct()` plus generated `Monitor.list()` on the initially empty account.
- The separate CRUD test created one uniquely named paused heartbeat with notifications disabled, loaded it, updated its name, confirmed the update with a fresh load, found it through listing, and removed it. A subsequent GET returned HTTP 404, confirming deletion. No existing monitor was modified. Captured results are in `evidence/live-verification.txt`.
- The initial create attempt used the older `schedule` input and returned HTTP 400. The versioned schema uses `schedules`; switching to `schedules: ['every 1 day']` resolved it. Generated update expects `{ monitor_list: [...] }`, transformed into the API's array request body. Both details are preserved in the executable test.

## Developer experience

The documented scaffold → model → generate → test workflow was easy to follow. HTTP Basic authentication was correctly inferred, including the empty password. Monitor list responses were unwrapped from `body.monitors`, and query names were mapped to the upstream API's names. Ownership, repository metadata and the API version header could be set declaratively without modifying generated runtime code.

Findings worth improving:

1. **Header fixture coupling.** Adding `main: kit: config: headers: 'Cronitor-Version': '2025-11-28'` caused `PrimaryUtility` to fail: its `prepareHeaders` corpus expected only `content-type`. Updated two project corpus expectations to include the configured header; all generated suites then passed. Ideally the scaffold should derive the expected headers from the configured model. Diagnostic output is preserved in `evidence/initial-primary-failure.tap`.
2. **Unreachable generated flow.** Generation warned that `BasicRumErrorFlow#1 (load)` was switched off because no route was reachable with its inputs. Generation still succeeded. I left this visible rather than claiming that flow was tested.
3. **Installation wording.** The generated TypeScript README says a clone carries compiled `dist/`. This repository ignores build output, so a fresh clone must build first. `QUICKSTART.md` provides the verified sequence.
4. **Defaults and verification.** The scaffold initially attributed publication to Voxgig and used its namespace. I configured Irfan's ownership and repository. The default CI also needed generation before testing because the ignored `.sdk/test/test.json` is required by the offline corpus.
5. **Dependency warning.** Scaffold installation reported three development-toolchain advisories (two low, one high). A follow-up audit request failed at the registry endpoint; advisory identities and fixes were not verified. The generated SDK itself declares no production npm dependencies.
6. **Documentation CI assumes an existing compiled model (fixed in this project).** The [initial generated workflow failed on a fresh checkout](https://github.com/irfanf16/cronitor-sdk/actions/runs/40022201463) with `Cannot find module .../.sdk/model/sdk.json`: it compiled build sources and invoked docgen without generating the ignored model first. The project now declares `main: kit: doc: ci: active: false` to replace only the emitted CI workflow with the project-owned `.github/workflows/documentation.yml`. That workflow installs the locked toolchain, runs `npm run generate`, then runs the same pinned Vale rules and docgen QA. Documentation generation remains enabled and no QA checks were removed. Repeated generation preserves the custom workflow, the obsolete generated workflow is pruned, `doctor` passes, and full local text QA passes. The default upstream workflow still merits the same ordering fix.

## Time and AI disclosure

AI performed research, generation, configuration, diagnostics, live testing and drafting. The author created the Cronitor account and supplied credentials. Active human time has not been measured by the tooling; AI execution and waiting time are not presented as human effort, and no unverified claim about the 30-minute cap is made. The author should confirm their actual active time when submitting.

The SDK is MIT licensed with Irfan as copyright holder. It is unofficial and is not endorsed by Cronitor. The upstream specification was downloaded from https://cronitor.io/api/openapi.json; its hash and source are recorded in `evidence/SOURCES.md`.
