# Month 1 — Submission Requirements Checklist

Use this to prepare your zip and deliverables. Replace `[name]` with your participant name (e.g. `john-doe`).

## File Naming Convention

- `[participant-name]-month1-test-suite.zip` — All test files (and source if required)
- `[participant-name]-month1-coverage-report.html` — Export from `npm run test:coverage` (open coverage/lcov-report/index.html, Save As)
- `[participant-name]-month1-bug-fixes.md` — Bug documentation (copy from `docs/participant-month1-bug-fixes.md` and rename)
- `[participant-name]-month1-tdd-commits.md` — Git log showing TDD (red-green-refactor) commits

## Required Files to Include in Zip

- All test files under `src/**/*.test.tsx`, `src/**/__tests__/**/*.tsx`
- `cypress/e2e/**/*.cy.ts`
- `jest.config.js`, `jest.setup.cjs`
- Component source files that were fixed (Button, Toggle, Tabs, Dropdown)
- This folder: `docs/` (with bug-fixes and any reports)

## How to Generate

1. **Coverage report**
   ```bash
   npm run test:coverage
   ```
   Open `coverage/lcov-report/index.html` in a browser, then File → Save As → `[name]-month1-coverage-report.html`.

2. **TDD commits**
   ```bash
   git log --oneline -20 > docs/participant-month1-tdd-commits.md
   ```
   Rename to `[name]-month1-tdd-commits.md`. Ensure commits show test-first (e.g. "Add failing test for disabled button", "Fix Button disabled prop") for evaluators.

3. **Bug fixes doc**
   - Use `docs/participant-month1-bug-fixes.md` as template.
   - Replace "participant-name" in the filename with your name when submitting.

## Evaluation Preview

| Criteria       | Points | Focus |
|----------------|--------|--------|
| Test Coverage  | 25     | 80%+ lines, functions, branches |
| Test Quality   | 25     | Descriptive names, AAA, no implementation testing |
| TDD Process    | 20     | Red-green-refactor visible in commits |
| Bug Fixes      | 15     | All 5 bugs found and fixed with tests |
| Code Quality   | 10     | Clean, readable tests |
| Documentation  | 5      | Clear bug fix documentation |
