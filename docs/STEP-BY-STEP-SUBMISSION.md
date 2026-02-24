# Step-by-Step Submission Guide — Month 1 Test Suite

Replace `[your-name]` with your actual name (e.g. `john-doe`) in file names and commands below.

---

## Part 2: Unit Test Suite — DONE

All 8 components have tests with **rendering**, **interactions**, and **edge cases**:

| Component | Test File | Required Cases Covered |
|-----------|-----------|------------------------|
| Button | `src/components/Button/Button.test.tsx` | Correct text, click, loading, disabled, variant, className |
| Toggle | `src/components/Toggle/Toggle.test.tsx` | Default, toggle, controlled onChange, disabled, a11y |
| Input | `src/components/Input/Input.test.tsx` | Placeholder, change, error, required, focus/blur, types |
| Modal | `src/components/Modal/Modal.test.tsx` | Open/close, title/children, close button, overlay, Escape |
| Card | `src/components/Card/Card.test.tsx` | Default/custom props, title, image, actions, className |
| Dropdown | `src/components/Dropdown/Dropdown.test.tsx` | Label, placeholder, selection, onChange, empty/undefined items |
| Alert | `src/components/Alert/Alert.test.tsx` | Variants, dismissible, onDismiss, hide on dismiss |
| Tabs | `src/components/Tabs/Tabs.test.tsx` | defaultIndex, tab switch, onChange index, empty tabs, bounds |

**Quality:** Descriptive names, AAA pattern, mocks for callbacks, no implementation testing, edge cases included.

---

## Part 3: Bug Discovery & TDD Fix — DONE

Five bugs documented and fixed in **`docs/participant-month1-bug-fixes.md`**:

1. **Button —** Event handler called when disabled  
2. **Button —** Loading state allows double submit (accessibility)  
3. **Toggle —** Event handler not called in controlled mode  
4. **Tabs —** Off-by-one error in onChange  
5. **Tabs —** Missing bounds check (defaultIndex out of range)  

**Before submission:** Copy the file and rename for your name:

```bash
copy docs\participant-month1-bug-fixes.md docs\[your-name]-month1-bug-fixes.md
```

Then open `docs\[your-name]-month1-bug-fixes.md` and replace any "participant-name" with your name if needed.

---

## Part 4: Integration & E2E — DONE

- **Integration (3):**
  - `src/__tests__/integration/form-submission.integration.test.tsx` — Input + Button flow
  - `src/__tests__/integration/modal-with-form.integration.test.tsx` — Modal with form inside
  - `src/__tests__/integration/dropdown-affects-display.integration.test.tsx` — Dropdown selection updates display

- **Cypress E2E (1):**
  - `cypress/e2e/demo-flow.cy.ts` — Navigate, Button click count, Modal open/close, Dropdown selection, accessibility checks

---

## Steps to Generate Submission Artifacts

### Step 1: Run unit tests and ensure they pass

```bash
cd D:\challenge
npm run test
```

Fix any failing tests before continuing.

### Step 2: Generate coverage report (HTML)

```bash
npm run test:coverage
```

This creates a **`coverage/`** folder. The HTML report is at:

**`coverage/lcov-report/index.html`**

Save a copy for submission:

```bash
copy coverage\lcov-report\index.html docs\[your-name]-month1-coverage-report.html
```

(Or zip the whole `coverage` folder and name it `[your-name]-month1-coverage-report.zip` if the evaluator prefers.)

### Step 3: Export Git log for TDD evidence

```bash
git log --oneline -30 > docs/[your-name]-month1-tdd-commits.md
```

If you have more TDD-related commits, increase the number (e.g. `-50`). Evaluators look for multiple commits showing red → green → refactor.

### Step 4: Create the test-suite zip

Include all test-related files (no `node_modules`):

**Suggested contents of `[your-name]-month1-test-suite.zip`:**

- `src/components/**/*.test.tsx` (all 8 component tests)
- `src/__tests__/integration/*.test.tsx`
- `cypress/e2e/*.cy.ts`
- `jest.config.js`
- `jest.setup.cjs`
- `cypress.config.js`
- `src/jest-dom.d.ts`

From project root (PowerShell):

```powershell
# Example: create zip with test files only (adjust paths if needed)
Compress-Archive -Path src\components\Button\Button.test.tsx, src\components\Toggle\Toggle.test.tsx, src\components\Input\Input.test.tsx, src\components\Modal\Modal.test.tsx, src\components\Card\Card.test.tsx, src\components\Dropdown\Dropdown.test.tsx, src\components\Alert\Alert.test.tsx, src\components\Tabs\Tabs.test.tsx, src\__tests__, cypress\e2e, cypress\support, jest.config.js, jest.setup.cjs, cypress.config.js, src\jest-dom.d.ts -DestinationPath [your-name]-month1-test-suite.zip
```

Or zip the whole project (excluding `node_modules` and `coverage`) and name it `[your-name]-month1-test-suite.zip` if the instructions allow.

---

## Required Files Checklist

| Required File | How to Get It |
|---------------|----------------|
| `[name]-month1-test-suite.zip` | Zip all test files (and configs) as above |
| `[name]-month1-coverage-report.html` | Copy from `coverage/lcov-report/index.html` after `npm run test:coverage` |
| `[name]-month1-bug-fixes.md` | Copy `docs/participant-month1-bug-fixes.md` and rename with your name |
| `[name]-month1-tdd-commits.md` | Run `git log --oneline -30 > docs/[name]-month1-tdd-commits.md` |

---

## Evaluation Reminder

| Criteria | Points | Check |
|----------|--------|--------|
| Test Coverage | 25 | Aim for 80%+ (lines, functions, branches); run `npm run test:coverage` |
| Test Quality | 25 | Descriptive names, AAA, no implementation testing, edge cases |
| TDD Process | 20 | Commit often so git log shows red → green → refactor |
| Bug Fixes | 15 | All 5 bugs in bug-fixes.md with location, test, fix |
| Code Quality | 10 | Readable, consistent test structure |
| Documentation | 5 | Clear bug-fixes.md format |

---

## If Jest Fails with "exports is not defined"

The project uses **`jest.setup.cjs`** (CommonJS) so the setup runs without ESM issues. Ensure **`jest.config.js`** has:

```js
setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
```

There should be no **`jest.setup.js`** (with ESM `import`) in the root; that was removed to fix the error.

---

*Replace `[your-name]` everywhere with your actual submission name.*
