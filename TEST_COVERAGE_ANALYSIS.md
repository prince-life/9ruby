# Test Coverage Analysis — 9 Ruby Command Center

## Current State

| Metric | Value |
|---|---|
| Test framework | Vitest + React Testing Library |
| Test files | 2 (`example.test.ts`, `GitHubView.test.tsx`) |
| Tests passing | 2 of 3 (1 failing in `GitHubView.test.tsx`) |
| Source modules tested | 1 of 16 custom modules |
| Estimated line coverage | ~2% |
| CI test step | **Missing** — tests are not run in the deploy pipeline |

### Existing Tests

- **`example.test.ts`** — Smoke test that verifies the test runner works. No application code is tested.
- **`GitHubView.test.tsx`** — Tests the connect form renders and that connecting with a token shows repos. The second test is **currently failing** because it asserts on text (`"storage space where your project lives"`) that doesn't exist in the component's rendered output.

---

## Priority 1 — High Impact, Low Effort

These are the most valuable tests to add first. They cover critical logic and are straightforward to write.

### 1. Fix the failing `GitHubView` test

The test at line 70 waits for text matching `/storage space where your project lives/i`, but the connected state renders repository cards, not that string. The assertion should check for the repo name (`"my-project"`) or the "REPOSITORIES" label instead.

### 2. `GitHubView` — Error & edge case coverage

The existing test only covers the happy path. Missing scenarios:

| Scenario | What to test |
|---|---|
| Invalid token | `fetch` returns `{ ok: false }` → error message displayed |
| Network failure | `fetch` throws → `"Connection failed"` displayed |
| Empty token | Click connect with blank input → no fetch call made |
| Disconnect | After connecting, clicking Disconnect resets to the connect form |
| Fetch commits | Click a repo → commits are fetched and displayed |
| Commits error | Commit fetch fails → error message in the commits panel |
| Enter key | Pressing Enter in the input field triggers connect |

### 3. `useIsMobile` hook

A pure logic hook that's easy to unit test:
- Returns `false` when `window.innerWidth >= 768`
- Returns `true` when `window.innerWidth < 768`
- Reacts to `matchMedia` change events

### 4. `Gem3D` component

Reusable across the app with clear prop-driven behavior:
- Renders the gem code label (e.g., `"RBY"` for ruby)
- Shows a lock icon when `active` is `false`
- Does not show lock icon when `active` is `true`
- Calls `onClick` when clicked
- Applies correct size class for `sm`, `md`, `lg`

---

## Priority 2 — Medium Impact

### 5. `GemVault` view — Selection & state

- Defaults to the "ruby" gem selected
- Clicking a different gem updates the detail card (label, power, agent name)
- Active gems show "ACTIVE" badge; inactive gems show "LOCKED"
- Active gems show "Activate Agent" button; inactive show "Scan NFC to Unlock"
- Power bar width reflects the gem's power percentage

### 6. `NeuralSettings` view — Toggle state

- Renders all 3 settings with correct initial toggle states (`Auto-Sync`: on, `Learn`: on, `Bridge`: off)
- Clicking a toggle switches its state (on→off, off→on)
- Radar chart displays all 5 metrics with correct values

### 7. `TerminalLog` component — Timer behavior

- Renders initial 5 log entries on mount
- After the interval fires, a new log entry is appended
- Caps at 20 log entries (older entries removed)
- Cleanup: interval is cleared on unmount

Use `vi.useFakeTimers()` to control the 2500ms interval.

### 8. `HubView` — Rendering

- Renders the "Terminal" heading and "ONLINE" indicator
- Displays all 3 quick action buttons (Scan NFC, Auto-Pilot, Emergency Stop)
- Displays all 4 system metrics with correct values

---

## Priority 3 — Structural & Integration

### 9. `AgentBuilder` view

- Renders all 3 automations with trigger→action labels
- Active automations have a pulsing indicator; inactive ones don't
- "Create New Automation" button renders

### 10. `Index` page — Navigation integration

- Defaults to HubView
- Switching the active view renders the correct component
- All 5 views can be navigated to

### 11. `AdaptiveNav` component

- Renders 5 navigation tabs
- Marks the active tab
- Calls `onChange` with the correct view type on click
- Shows sidebar on desktop, bottom nav on mobile (requires mocking `useIsMobile`)

### 12. `GlassCard` component

- Renders children
- Applies the correct variant class (`default`, `strong`, `interactive`)

---

## Priority 4 — Infrastructure

### 13. Add tests to CI/CD

The deploy workflow (`.github/workflows/deploy.yml`) does **not** run tests. Add an `npm test` step before the build step:

```yaml
- run: npm ci
- run: npm test    # ← add this line
- run: npm run build
```

This prevents broken code from being deployed to GitHub Pages.

### 14. Add coverage reporting

Add a coverage script to `package.json` and configure a minimum threshold:

```json
{
  "scripts": {
    "test:coverage": "vitest run --coverage"
  }
}
```

In `vitest.config.ts`:
```ts
test: {
  coverage: {
    provider: 'v8',
    include: ['src/views/**', 'src/components/Gem3D.tsx', 'src/components/TerminalLog.tsx', 'src/components/AdaptiveNav.tsx', 'src/hooks/**'],
    thresholds: { lines: 50 }
  }
}
```

---

## Summary — Recommended Order of Action

1. **Fix** the failing `GitHubView` test (blocks CI if tests are added to pipeline)
2. **Add** `GitHubView` error/edge case tests
3. **Add** `useIsMobile` hook test
4. **Add** `Gem3D` component test
5. **Add** `GemVault` view test
6. **Add** `NeuralSettings` toggle test
7. **Add** `TerminalLog` timer test
8. **Add** tests to CI pipeline
9. Remaining views & components as capacity allows
