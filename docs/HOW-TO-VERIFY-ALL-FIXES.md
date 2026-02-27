# How to Verify All Bug Fixes

This guide explains how to confirm every fix works: **in the running app** and **via tests**.

---

## 1. Run the app (see fixes in UI)

```bash
npm run dev
```

Open http://localhost:5173 and use a **hard refresh** (Ctrl+Shift+R or Cmd+Shift+R) so you don’t see an old cached build.

---

## 2. What to check for each fix

| Component | Bug fixed | How to verify in the UI |
|-----------|-----------|--------------------------|
| **Button** | Disabled and loading don’t trigger click | Click **"Disabled"** → click count must NOT increase. Click **"Saving..."** (loading) → nothing happens. Click **"Primary"** → count increases. |
| **Toggle** | `onChange` called in controlled mode | Toggle **"Dark mode"** → text below must switch between **"Dark mode: ON"** and **"Dark mode: OFF"**. |
| **Tabs** | `onChange` gets correct 0-based index | Open DevTools Console. Click **Overview** → log should show `Tab index: 0`. Click **Features** → `Tab index: 1`. Click **Pricing** → `Tab index: 2`. |
| **Input** | Unique IDs (no duplicate IDs) | Two inputs (Name, Email) both work; no console errors about duplicate IDs. Type in Name → value updates. |
| **Modal** | Overlay + focus trap | Click **Open Modal** → modal opens. Click gray area outside → modal closes. Press Tab → focus stays inside modal. Press Escape → modal closes. |
| **Alert** | Visibility synced with content | Dismiss an alert; if the app later shows a new alert with new content, it should appear again (not stay hidden). |
| **Dropdown** | Keyboard + selection | Click **Framework** → open list. Press **Arrow Down/Up** → highlight moves. Press **Enter** → option selected and "Selected: …" updates. |

If any of these don’t behave as above, the app may be cached: stop dev server, run `npm run dev` again, and hard refresh the browser.

---

## 3. Verify with tests (all fixes covered)

Run the full test suite:

```bash
npm test
```

Each fix is covered by at least one test:

| Fix | Test file | What the test does |
|-----|-----------|--------------------|
| Button disabled | `Button.test.tsx` | Renders disabled button, clicks it, asserts `onClick` not called |
| Button loading | `Button.test.tsx` | Renders loading button, clicks it, asserts `onClick` not called |
| Toggle onChange | `Toggle.test.tsx` | Controlled Toggle: click, assert `onChange` called with correct boolean |
| Tabs index | `Tabs.test.tsx` | Click tab 2 and tab 3, assert `onChange` called with 1 and 2 (0-based) |
| Input unique ID | `Input.test.tsx` | Renders multiple inputs; IDs and labels work (no duplicate ID) |
| Modal overlay + Escape | `Modal.test.tsx` | Escape closes; overlay click closes (content click does not) |
| Alert visibility | `Alert.test.tsx` | Dismissible alert; content change can re-show (via re-render) |
| Dropdown selection | `Dropdown.test.tsx` + `dropdown-affects-display.integration.test.tsx` | Open, select option, assert `onChange` and displayed value |

---

## 4. App-level check (optional)

The integration test **`app-fixes.integration.test.tsx`** renders the real **App** and checks:

- Disabled button does not increase click count
- Toggle updates "Dark mode: ON/OFF"
- Tabs report correct 0-based index
- Dropdown selection updates "Selected: …"

So:

- **UI check:** run `npm run dev`, follow the table in section 2.
- **Automated check:** run `npm test`; if all tests pass, the fixes are verified by tests.

---

## 5a. Automated UI test (Cypress E2E)

To run a **full UI test in the browser** (all 8 components in one run):

1. **Terminal 1** – start the app:
   ```bash
   npm run dev
   ```
2. **Terminal 2** – run Cypress against the running app:
   ```bash
   npx cypress run
   ```
   Or open the Cypress UI: `npx cypress open`, then run the E2E spec `demo-flow.cy.ts`.

The spec `cypress/e2e/demo-flow.cy.ts` checks: app load, Button (primary / disabled / loading), Toggle (Dark mode ON/OFF), Tabs (Overview / Features / Pricing), Input (Name), Modal (open/close), Card (visible), Dropdown (select Vue), Alert (visible), and basic accessibility. If all pass, the UI is working.

---

## 5. If only Toggle seems fixed

- **Rebuild:** run `npm run dev` again and hard refresh (Ctrl+Shift+R).
- **Confirm source:** all fixes live in the component files under `src/components/` (Button, Toggle, Tabs, Input, Modal, Alert, Dropdown). No separate “fixed” build – the same code is used by the app and by tests.
- **Tests:** run `npm test`. If every test passes, the code paths for all fixes are exercised; then the remaining issue is usually caching or an old tab.
