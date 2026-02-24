# Bug Fixes Documentation — Month 1 Test Suite

**Format:** `[participant-name]-month1-bug-fixes.md` (replace participant-name with your name)

---

## Bug #1: Button — Event handler called when disabled

- **Location:** `src/components/Button/Button.tsx` (button element)
- **Symptom:** Clicking a disabled button still triggered `onClick`. The button only had a CSS class for appearance; the native `disabled` attribute was not set.
- **Root Cause:** The `disabled` prop was not passed to the DOM `<button>`, so the browser still fired click events.
- **Test Written:** "respects disabled prop and does not call onClick" — render Button with `disabled` and mock `onClick`, click the button, assert `onClick` was not called.
- **Fix Applied:** Set `disabled={disabled || loading}` on the `<button>` element. Also set `aria-busy={loading}` for accessibility.

---

## Bug #2: Button — Loading state allows double submit (accessibility)

- **Location:** `src/components/Button/Button.tsx` (button element)
- **Symptom:** When `loading` was true, the button remained clickable, so users could trigger the action multiple times.
- **Root Cause:** Loading was only reflected in the label (e.g. "Loading..."); the button was not disabled.
- **Test Written:** "does not call onClick when loading" — render Button with `loading` and mock `onClick`, click, assert `onClick` was not called.
- **Fix Applied:** Same as Bug #1: `disabled={disabled || loading}` so the button is non-interactive while loading.

---

## Bug #3: Toggle — Event handler not called in controlled mode

- **Location:** `src/components/Toggle/Toggle.tsx` (`handleClick`)
- **Symptom:** When the parent controlled the Toggle with `checked` and `onChange`, clicking the switch did not call `onChange`, so the parent state never updated.
- **Root Cause:** In controlled mode the component only updated internal state and never invoked `onChange`.
- **Test Written:** "calls onChange with new value when clicked in controlled mode" — render with `checked={false}` and `onChange` mock, click, assert `onChange` was called with `true`.
- **Fix Applied:** In `handleClick`, when `controlledChecked !== undefined`, call `onChange?.(nextChecked)` and do not call `setInternalChecked`; only update internal state when uncontrolled.

---

## Bug #4: Tabs — Off-by-one error in onChange

- **Location:** `src/components/Tabs/Tabs.tsx` (`handleTabClick`)
- **Symptom:** `onChange` was called with `index + 1` instead of the actual tab index. Parents expecting 0-based indices received 1-based values.
- **Root Cause:** The code passed `onChange?.(index + 1)` instead of `onChange?.(index)`.
- **Test Written:** "calls onChange with correct 0-based index when tab clicked" — render Tabs with `onChange` mock, click second and third tabs, assert `onChange` was called with 1 and 2 respectively.
- **Fix Applied:** Changed to `onChange?.(index)`.

---

## Bug #5: Tabs — Missing bounds check (defaultIndex out of range)

- **Location:** `src/components/Tabs/Tabs.tsx` (initial state)
- **Symptom:** When `defaultIndex` was negative or >= `tabs.length`, `tabs[activeIndex]` was undefined and the panel showed nothing or behaved incorrectly.
- **Root Cause:** `defaultIndex` was used directly in `useState(defaultIndex)` with no clamping.
- **Test Written:** "clamps defaultIndex to valid range when out of bounds" — render with `defaultIndex={10}` and 3 tabs, assert the third tab is selected and its content is visible.
- **Fix Applied:** Compute `clampedIndex = Math.min(Math.max(0, defaultIndex), Math.max(0, tabs.length - 1))` and use it in `useState(clampedIndex)`.

---

## Bonus fix (optional to count): Dropdown — Missing null check causing crash

- **Location:** `src/components/Dropdown/Dropdown.tsx` (use of `items`)
- **Symptom:** When `items` was `undefined` or `null` (e.g. async data not yet loaded), `items.find` and `items.map` threw.
- **Root Cause:** No guard for non-array `items`.
- **Test Written:** "handles undefined or null items without crash (defensive)" — render with `items={undefined}`, assert no throw.
- **Fix Applied:** `const safeItems = Array.isArray(items) ? items : []` and use `safeItems` for `find` and `map`.

---

*End of bug fixes documentation.*
