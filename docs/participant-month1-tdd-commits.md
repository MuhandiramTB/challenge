# TDD Commit History — Month 1 Test Suite

Generated from `git log --oneline --reverse`

---

## Commit Progression (Red → Green → Refactor)

### Phase 1: Initial Codebase (Buggy, No Tests)
```
079d3c8 first commit
```
- 8 components with 0% test coverage
- 5 intentional bugs present
- No jest/cypress configuration

---

### Phase 2: Testing Setup + First Bug Fixes (RED → GREEN)
```
074cfa1 Remove 'peer' property from dependencies; add .gitignore
31ddaf2 Enhance project setup with testing and Cypress integration; update Button and Toggle components
```
**What happened:**
- **Setup:** Added `jest.config.js`, `jest.setup.cjs`, `cypress.config.js`
- **RED:** Wrote Button tests → discovered Bug #1 (onClick fires when disabled) and Bug #2 (loading allows clicks)
- **GREEN:** Fixed Button with `disabled={disabled || loading}`
- **RED:** Wrote Toggle tests → discovered Bug #3 (onChange not called in controlled mode)
- **GREEN:** Fixed Toggle to call `onChange` in controlled mode instead of `setInternalChecked`

---

### Phase 3: Remaining Component Tests + More Bug Fixes (RED → GREEN)
```
5f5dc42 Refactor Button tests; update Dropdown and Tabs components to handle edge cases
```
**What happened:**
- **RED:** Wrote Tabs tests → discovered Bug #4 (off-by-one: `onChange(index+1)` instead of `onChange(index)`)
- **GREEN:** Fixed Tabs `onChange?.(index)`
- **RED:** Wrote Tabs edge case test → discovered Bug #5 (no bounds check on `defaultIndex`)
- **GREEN:** Fixed with `Math.min(Math.max(0, defaultIndex), tabs.length - 1)`
- **RED:** Wrote Dropdown test with `undefined` items → discovered Bonus Bug (crash on null items)
- **GREEN:** Fixed with `const safeItems = Array.isArray(items) ? items : []`
- Added tests for: Alert, Card, Dropdown, Input, Modal
- Added integration tests: form-submission, modal-with-form, dropdown-affects-display
- Added Cypress E2E: demo-flow.cy.ts
- Created bug-fixes documentation

---

### Phase 4: Additional Component Fixes
```
0ecc356 Add user interaction tests for Card component
0181536 Improve Card component tests; add Cypress support file
9b8419d Enhance Alert (re-show on content change); Input (useId for unique IDs)
3960c27 Enhance Dropdown (keyboard nav); Modal (focus trap); Input (ID uniqueness)
```
**What happened:**
- Added Card action button interaction tests
- Fixed Alert to re-show when content changes after dismissal
- Fixed Input to use `useId()` for unique IDs (no duplicate ID conflicts)
- Enhanced Dropdown with full keyboard navigation (ArrowDown, ArrowUp, Enter, Escape)
- Enhanced Modal with focus trap (Tab/Shift+Tab wrapping)

---

### Phase 5: Coverage Push to 96%+ (REFACTOR)
```
a1a31fc Refactor Cypress E2E tests; expand to cover all 8 components
c4852a5 Add keyboard nav tests for Dropdown, focus trap tests for Modal, keyboard tests for Toggle
```
**What happened:**
- Fixed integration test (button name matcher)
- Added Modal focus trap tests (Tab wraps last→first, Shift+Tab wraps first→last)
- Added Dropdown keyboard navigation tests (Enter, Space, ArrowDown, ArrowUp)
- Added Toggle keyboard interaction tests (Enter, Space)
- Coverage jumped from ~79% to **96%+**

---

### Phase 6: Cleanup
```
310cc8c Update App component display to reflect 96%+ coverage
196d11c Remove coverage reports from git; update .gitignore
```

---

## Summary of TDD Bug Fixes

| Bug | RED (Failing Test) | GREEN (Fix) | Commit |
|-----|-------------------|-------------|--------|
| #1 Button disabled | `does not call onClick when disabled` | `disabled={disabled \|\| loading}` | 31ddaf2 |
| #2 Button loading | `does not call onClick when loading` | Same fix as #1 | 31ddaf2 |
| #3 Toggle onChange | `calls onChange in controlled mode` | Call `onChange` not `setInternalChecked` | 31ddaf2 |
| #4 Tabs off-by-one | `onChange called with correct 0-based index` | `onChange?.(index)` not `index+1` | 5f5dc42 |
| #5 Tabs bounds | `clamps defaultIndex to valid range` | `Math.min(Math.max(0, defaultIndex), ...)` | 5f5dc42 |
| Bonus: Dropdown null | `handles undefined items without crash` | `Array.isArray(items) ? items : []` | 5f5dc42 |

---

## Final Test Results

```
Test Suites: 12 passed, 12 total
Tests:       82 passed, 82 total
Coverage:    96.25% stmts | 94.44% branches | 90.9% funcs | 96.66% lines
Cypress E2E: 12 passing (6s)
```
