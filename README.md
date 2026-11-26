# Klauders Automation – Playwright

Test automation framework for [Automate the Internet](https://klauders.com/automate-the-internet), built with **Playwright Test + TypeScript**. It covers both the **UI** and **API** layers in a single runner and runs on **GitHub Actions**.

The reasoning behind the stack is in [docs/test-strategy.md](docs/test-strategy.md) (ADR-0001).

## Tech stack

| Area            | Tool                                                     |
| --------------- | -------------------------------------------------------- |
| Test runner     | [Playwright Test](https://playwright.dev)                |
| Language        | TypeScript (strict mode)                                 |
| Linting         | ESLint + `typescript-eslint` + `eslint-plugin-playwright` |
| Formatting      | Prettier                                                 |
| Git hooks       | Husky + lint-staged                                      |
| Commit messages | Commitlint (Conventional Commits)                        |
| CI              | GitHub Actions                                           |

## Prerequisites

- [Node.js](https://nodejs.org) LTS
- npm

## Getting started

```bash
# Install dependencies
npm ci

# Install Playwright browsers
npx playwright install --with-deps
```

## Running tests

```bash
# Run the full suite (Chromium, Firefox and WebKit)
npx playwright test

# Run a single browser
npx playwright test --project=chromium

# Run a single folder or file
npx playwright test tests/e2e

# Run in UI mode / headed mode
npx playwright test --ui
npx playwright test --headed

# Open the HTML report from the last run
npx playwright show-report
```

## Project structure

```
.
├── .github/
│   ├── workflows/
│   │   ├── playwright.yml        # Runs the suite on push / PR to master
│   │   └── pr-checks.yml         # Validates the PR description
│   └── pull_request_template.md
├── docs/
│   ├── test-strategy.md          # ADR-0001: framework decision and guidelines
│   └── test-analysis.md          # Scope, features and risk analysis
├── src/
│   ├── config/                   # Environment and runtime configuration
│   ├── data/                     # Test data
│   ├── fixtures/                 # Custom Playwright fixtures
│   ├── pages/                    # Page Objects (POM)
│   └── utils/                    # Shared helpers
├── tests/
│   ├── api/                      # API tests
│   ├── e2e/                      # UI end-to-end tests
│   └── mobile/                   # Mobile viewport tests
├── playwright.config.ts
└── tsconfig.json
```

### Path aliases

Defined in [tsconfig.json](tsconfig.json):

| Alias         | Path               |
| ------------- | ------------------ |
| `@pages/*`    | `src/pages/*`      |
| `@fixtures/*` | `src/fixtures/*`   |
| `@utils/*`    | `src/utils/*`      |
| `@data/*`     | `src/data/*`       |

```ts
import { LoginPage } from '@pages/login.page';
```

## Configuration

Main settings in [playwright.config.ts](playwright.config.ts):

- **Base URL:** `https://klauders.com/automate-the-internet`
- **Browsers:** Chromium, Firefox, WebKit
- **Parallelism:** fully parallel locally, 1 worker on CI
- **Retries:** 2 on CI, 0 locally
- **Traces:** captured on the first retry
- **Reporter:** HTML (`playwright-report/`)
- `test.only` fails the build on CI

## Conventions

- **Page Object Model** for the UI layer, using user-facing locators (`getByRole`, `getByLabel`, `getByTestId`) instead of CSS/XPath.
- **API clients** built on Playwright's `request` fixture, one class per resource.
- **Custom fixtures** inject page objects, API clients and test data so tests stay short.
- **No hard waits.** Rely on Playwright's auto-waiting and web-first assertions.

## CI/CD

- **Playwright Tests** ([playwright.yml](.github/workflows/playwright.yml)) runs on every push and pull request to `master`. The HTML report is uploaded as a build artifact and kept for 30 days.
- **PR Checks** ([pr-checks.yml](.github/workflows/pr-checks.yml)) checks that the pull request description:
  - includes the template sections *Description*, *Ticket*, *Screenshots* and *Checklist*
  - has at least one screenshot attached
  - has every checklist item ticked

## Contributing

1. Create a branch from `master`.
2. Write commits that follow [Conventional Commits](https://www.conventionalcommits.org) (e.g. `feat: add login page object`).
3. Open a pull request using the [template](.github/pull_request_template.md) and fill in every section.
