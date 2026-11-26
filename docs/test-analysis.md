# Test Analysis – Automate the Internet

> **Status:** Draft | **Owner:** Rodrigo Ayala | **Last updated:** YYYY-MM-DD

---

## 1. Purpose & Scope

<!-- One or two sentences on why this analysis exists and what it drives (e.g., the automation backlog for the AUT project). -->

### In scope

- 

### Out of scope

- 

---

## 2. Application Under Test

| Feature  | URL / Path | Description |
| -------- | ---------- | ----------- |
| Register |            |             |
| Login    |            |             |

---

## 3. Risk Analysis

> **Risk score** = Impact × Likelihood (1–9).
> **Priority:** 7–9 = High · 4–6 = Medium · 1–3 = Low

| Feature  | Impact (1–3) | Likelihood (1–3) | Risk score | Priority |
| -------- | :----------: | :--------------: | :--------: | :------: |
| Register |      3       |        3         |     9      |   High   |
| Login    |      3       |        3         |     9      |   High   |

---

## 4. Test Scenarios

> **ID format:** `TS-<Feature>-<NNN>` · **Type:** Positive / Negative / Edge · **Priority:** P1–P3

### 4.1 Register

| ID              | Scenario | Type     | Priority | Tags                 | Ticket  |
| --------------- | -------- | -------- | :------: | -------------------- | ------- |
| TS-Register-001 | ...      | Positive |    P1    | `@smoke @regression` | AUT-001 |

### 4.2 Login

| ID           | Scenario | Type     | Priority | Tags                 | Ticket  |
| ------------ | -------- | -------- | :------: | -------------------- | ------- |
| TS-Login-001 | ...      | Positive |    P1    | `@smoke @regression` | AUT-002 |

---

## 5. Test Design Techniques Applied

| Technique                 | Applied to | Example |
| ------------------------- | ---------- | ------- |
| Equivalence Partitioning  |            |         |
| Boundary Value Analysis   |            |         |
| Decision Table            |            |         |
| State Transition          |            |         |

---

## 6. Test Strategy by Layer

| Layer         | Tooling                        | What we validate | Why here |
| ------------- | ------------------------------ | ---------------- | -------- |
| UI E2E        | Playwright                     |                  |          |
| API           | Playwright `APIRequestContext` |                  |          |
| Visual / a11y |                                |                  |          |

---

## 7. Not Automated (and why)

| Scenario / Area | Reason | Alternative (manual, exploratory, etc.) |
| --------------- | ------ | --------------------------------------- |
|                 |        |                                         |

---

## 8. Test Data & Environments

| Item                 | Value                                                     |
| -------------------- | --------------------------------------------------------- |
| Base URL             | https://klauders.com/automate-the-internet?lang=en        |
| Browsers / viewports | Chrome                                                    |
| Test data source     | `accounts.json`                                           |
| Secrets handling     |                                                           |

---

## 9. Traceability Matrix

| Scenario ID     | Spec file | Ticket  | Tag      |
| --------------- | --------- | ------- | -------- |
| TS-Register-001 |           | AUT-001 | `@smoke` |
| TS-Login-001    |           | AUT-002 | `@smoke` |

---

## 10. Risks & Assumptions

### Risks

| Risk | Mitigation |
| ---- | ---------- |
|      |            |

### Assumptions

- 

---

## 11. Entry / Exit Criteria

### Entry criteria

- [ ] 

### Exit criteria

- [ ]