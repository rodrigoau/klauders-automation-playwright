# ADR-0001: Use Playwright + TypeScript as a single framework for UI and API test automation

## Status

Accepted — 2026-11-26

## Context

We need a test automation framework, built from scratch, for the application under test (AUT) at https://klauders.com/automate-the-internet. It must cover both the UI and the API layers and run automatically in a CI/CD pipeline on GitHub Actions.

Key drivers:

- **One stack for UI and API.** Keeping separate tools (e.g., Selenium + RestAssured) means two languages, two sets of dependencies, two reporting systems and duplicated configuration.
- **Flakiness.** UI tests that rely on explicit waits and sleeps are slow and unreliable, which erodes trust in the suite.
- **Speed of feedback.** The suite must run in parallel and give fast results on every push and pull request.
- **Debuggability.** When a test fails in CI, we need enough evidence (traces, screenshots, videos) to diagnose it without re-running locally.
- **Maintainability.** Tests must be readable, typed and easy to extend as new features of the AUT are covered.
- **Hybrid scenarios.** Some UI tests need data set up or verified through the API (e.g., create data via API, validate it in the UI) to be faster and more stable.

Alternatives considered:

| Option                                  | Pros                                                                               | Cons                                                                                                      |
| --------------------------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Selenium WebDriver + Java + RestAssured | Mature, widely known                                                               | Two tools for UI/API, manual waits, more boilerplate, slower setup                                        |
| Cypress + JavaScript                    | Good DX, popular                                                                   | Limited multi-tab/multi-origin support, API testing is secondary, parallelization is paid (Cypress Cloud) |
| **Playwright + TypeScript**             | UI + API in one runner, auto-waiting, native parallelism, trace viewer, typed code | Smaller ecosystem than Selenium, team must know TypeScript                                                |

## Decision

We will use **Playwright Test with TypeScript** as the single framework for both UI and API automation.

Implementation guidelines:

- **UI layer:** Page Object Model (POM), with locators based on user-facing attributes (`getByRole`, `getByLabel`, `getByTestId`) instead of brittle CSS/XPath.
- **API layer:** Playwright's `APIRequestContext` (`request` fixture), wrapped in API client classes per resource/endpoint, with response schema validation.
- **Fixtures:** Custom Playwright fixtures to inject page objects, API clients and test data, keeping tests short and declarative.
- **Projects:** Separate Playwright projects for `ui` and `api` so they can run independently or together, plus multiple browsers for UI
