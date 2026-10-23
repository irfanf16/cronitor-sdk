# Voxgig SDK generator observations

Author: Irfan · Date: 23 October 2026 · Repository: https://github.com/irfanf16/cronitor-sdk

**Status: generated and verified offline; authenticated live testing pending a test account.**

## Selection and scope

I selected [Cronitor](https://cronitor.io/docs/api), a monitoring SaaS with a free account and an official OpenAPI 3.0.3 specification. I enumerated all 804 public repositories returned by the Voxgig SDK organisation API on 23 October and found no name containing `cronitor`. The snapshot is in `evidence/catalogue-2026-10-23.txt`; catalogue availability can change.

The TypeScript SDK was produced using the official Voxgig generator, not a handwritten client. It exposes 16 inferred entities from 37 paths and 72 HTTP operations. Generation breadth does not establish production readiness: the independent verification focuses on monitor reads and authentication.

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
- Authenticated live tests: **not run**. The read-only smoke script is ready; no test key was available. Write operations and complete endpoint coverage remain unverified.

## Developer experience

The documented scaffold → model → generate → test workflow was easy to follow. HTTP Basic authentication was correctly inferred, including the empty password. Monitor list responses were unwrapped from `body.monitors`, and query names were mapped to the upstream API's names. Ownership, repository metadata and the API version header could be set declaratively without modifying generated runtime code.

Findings worth improving:

1. **Header fixture coupling.** Adding `main: kit: config: headers: 'Cronitor-Version': '2025-11-28'` caused `PrimaryUtility` to fail: its `prepareHeaders` corpus expected only `content-type`. Updated two project corpus expectations to include the configured header; all generated suites then passed. Ideally the scaffold should derive the expected headers from the configured model. Diagnostic output is preserved in `evidence/initial-primary-failure.tap`.
2. **Unreachable generated flow.** Generation warned that `BasicRumErrorFlow#1 (load)` was switched off because no route was reachable with its inputs. Generation still succeeded. I left this visible rather than claiming that flow was tested.
3. **Installation wording.** The generated TypeScript README says a clone carries compiled `dist/`. This repository ignores build output, so a fresh clone must build first. `QUICKSTART.md` provides the verified sequence.
4. **Defaults and verification.** The scaffold initially attributed publication to Voxgig and used its namespace. I configured Irfan's ownership and repository. The default CI also needed generation before testing because the ignored `.sdk/test/test.json` is required by the offline corpus.
5. **Dependency warning.** Scaffold installation reported three development-toolchain advisories (two low, one high). A follow-up audit request failed at the registry endpoint; advisory identities and fixes were not verified. The generated SDK itself declares no production npm dependencies.

## Time and AI disclosure

AI performed research, generation, configuration, diagnostics and drafting. Automated work started at approximately 22:35 PKT; this is not a measurement of human effort. The author's active human time has not been measured here and must be supplied honestly before submission. No claim of staying within 30 human minutes is made. Remaining human actions are creating/verifying the test account and reviewing the deliverables.

The SDK is MIT licensed with Irfan as copyright holder. It is unofficial and is not endorsed by Cronitor. The upstream specification was downloaded from https://cronitor.io/api/openapi.json; its hash and source are recorded in `evidence/SOURCES.md`.
