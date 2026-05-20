# Phone Frame Crop Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Put the desktop landing page inside the phone frame and crop the mobile viewer's built-in LinkedIn status bar without breaking mockup alignment.

**Architecture:** Keep the existing React structure and make the smallest CSS/JS changes. Add a landing-only desktop phone wrapper in `App.jsx`, keep `Viewer.jsx` unchanged unless CSS cannot target it cleanly, and use CSS custom properties to keep background/mockup alignment explicit.

**Tech Stack:** Vite, React, plain CSS, hash routing, no new dependencies.

---

## File Structure

- Modify `src/App.jsx`: wrap `Landing` in a reusable desktop phone shell while preserving mobile full-screen behavior.
- Modify `src/index.css`: add the desktop landing phone-shell rules and mobile crop variables for viewer image alignment.
- No new runtime files are required.

### Task 1: Desktop Landing Phone Frame

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/index.css`

- [ ] **Step 1: Confirm current build is green**

Run: `npm run build`
Expected: build exits 0 and prints `✓ built`.

- [ ] **Step 2: Wrap the landing in a desktop shell**

Replace the landing return in `src/App.jsx` with:

```jsx
  if (route.page === 'landing') {
    return (
      <div className="desktop-phone-stage desktop-phone-stage--landing">
        <div className="desktop-phone-shell">
          <Landing onSelectConcept={handleSelectConcept} />
        </div>
      </div>
    )
  }
```

Expected: mobile is unchanged until CSS media query applies; desktop can target `.desktop-phone-stage--landing`.

- [ ] **Step 3: Add desktop shell CSS**

Add this block to `src/index.css` after the `.landing` rules:

```css
.desktop-phone-stage {
  min-height: 100vh;
}

.desktop-phone-shell {
  min-height: 100vh;
}
```

Then add this inside the existing `@media (min-width: 768px)` block:

```css
  .desktop-phone-stage--landing {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: var(--color-bg);
  }

  .desktop-phone-stage--landing .desktop-phone-shell {
    width: 393px;
    height: 852px;
    max-height: 90vh;
    aspect-ratio: 393 / 852;
    border-radius: 48px;
    background: var(--color-bg);
    border: 3px solid #333;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.05), 0 20px 60px rgba(0,0,0,0.5);
    overflow: hidden;
  }

  .desktop-phone-stage--landing .landing {
    min-height: 100%;
    height: 100%;
  }
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: build exits 0 and prints `✓ built`.

- [ ] **Step 5: Commit desktop landing frame**

Run:

```bash
git add src/App.jsx src/index.css
git commit -m "fix: frame desktop landing page"
```

Expected: commit succeeds.

### Task 2: Mobile Viewer Status Bar Crop

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Add viewer alignment variables**

Replace `.viewer-bg` and `.viewer-mockup` mobile positioning in `src/index.css` with:

```css
.viewer-frame {
  --viewer-width: 100vw;
  --viewer-crop-top: 44px;
  --mockup-top-ratio: 0.72180;
  position: absolute;
  inset: 0;
  will-change: transform;
}

.viewer-bg {
  position: absolute;
  top: calc(-1 * var(--viewer-crop-top));
  left: 0;
  width: var(--viewer-width);
  height: auto;
  user-select: none;
  pointer-events: none;
  -webkit-user-drag: none;
}

.viewer-mockup {
  position: absolute;
  top: calc((var(--mockup-top-ratio) * var(--viewer-width)) - var(--viewer-crop-top));
  left: 0;
  width: var(--viewer-width);
  height: var(--viewer-width);
  object-fit: cover;
  user-select: none;
  pointer-events: none;
  -webkit-user-drag: none;
}
```

Expected: background and mockup both shift up by the same crop amount on mobile.

- [ ] **Step 2: Preserve desktop viewer alignment**

Inside the existing desktop media query, update `.phone-frame .viewer-frame` to include desktop variables:

```css
  .phone-frame .viewer-frame {
    --viewer-width: 100%;
    --viewer-crop-top: 0px;
    width: 100%;
    height: 100%;
  }
```

Keep the existing `.phone-frame .viewer-bg` and `.phone-frame .viewer-mockup` overrides, with `.viewer-mockup { top: 33.3%; }`.

Expected: desktop viewer remains visually unchanged.

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: build exits 0 and prints `✓ built`.

- [ ] **Step 4: Commit mobile crop**

Run:

```bash
git add src/index.css
git commit -m "fix: crop mobile viewer status bar"
```

Expected: commit succeeds.

### Task 3: Final Verification

**Files:**
- Verify: `src/App.jsx`
- Verify: `src/index.css`

- [ ] **Step 1: Run production build**

Run: `npm run build`
Expected: build exits 0 and prints `✓ built`.

- [ ] **Step 2: Check git status**

Run: `git status --short`
Expected: only intentional files are modified or the working tree is clean except unrelated pre-existing files such as `pnpm-lock.yaml`.

- [ ] **Step 3: Push and deploy if requested**

Run only when the user requests push/deploy:

```bash
git push
vercel --prod
```

Expected: GitHub push succeeds and Vercel reports a ready production deployment.
