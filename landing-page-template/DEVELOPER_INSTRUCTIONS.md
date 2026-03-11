# Landing Page Developer Instructions

> **Goal:** Go from design brief → deployed landing page in ~30 minutes.
> The boilerplate is already done. You only write the content.

---

## 1. Starting a New Project

### Step 1 — Copy the template

```bash
cp -r /path/to/landing-page-template /path/to/your-app-name
cd your-app-name
```

### Step 2 — Rename the project

Edit `package.json` — change the `name` field to your app's kebab-case name:

```json
{
  "name": "your-app-name"
}
```

### Step 3 — Install dependencies

```bash
npm install
```

### Step 4 — Start dev server

```bash
npm run dev
```

Open `http://localhost:4321` — you'll see a blank page (no components yet). That's expected.

---

## 2. What to Customize (Per Brief)

These files do **not** exist in the template — you write them fresh for each project.

### `src/pages/index.astro`

The main page. Import and compose all sections. Set `title`, `description`, and `appName`.

```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
import ValueProposition from '../components/ValueProposition.astro';
import ProblemSolution from '../components/ProblemSolution.astro';
import HowItWorks from '../components/HowItWorks.astro';
import Testimonials from '../components/Testimonials.astro';
import FAQ from '../components/FAQ.astro';
import FinalCTA from '../components/FinalCTA.astro';

// ── From design brief ─────────────────────────────────────────────────
const APP_NAME = "your-app-name";   // kebab-case, matches backend projectName
const title = "App Name — Tagline";
const description = "Meta description from brief (150–160 chars)";

const faqs = [
  { q: "Question from brief?", a: "Answer from brief." },
  // ...
];

const steps = [
  { step: "Step Name", outcome: "What the user gains." },
  // ...
];

const testimonials = [
  { quote: "Quote from brief.", name: "Name", age: 30 },
  // ...
];
---

<Layout title={title} description={description}>
  <Hero appName={APP_NAME} />
  <ValueProposition />
  <ProblemSolution />
  <HowItWorks steps={steps} />
  <Testimonials items={testimonials} />
  <FAQ items={faqs} />
  <FinalCTA appName={APP_NAME} />
</Layout>
```

---

### `src/components/Hero.astro`

- Headline, subheadline, CTA button text, trust indicator — all from brief
- Must include `<WaitlistForm>` with `formId="hero"` and the correct `projectName`

```astro
---
import WaitlistForm from './WaitlistForm.astro';
interface Props { appName: string; }
const { appName } = Astro.props;
---
<section class="py-16 sm:py-24 px-4">
  <div class="max-w-4xl mx-auto text-center">
    <h1 class="font-heading text-4xl sm:text-6xl font-bold text-primary mb-6 leading-tight">
      Headline from Brief
    </h1>
    <p class="text-lg sm:text-xl text-text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
      Subheadline from brief.
    </p>
    <WaitlistForm
      projectName={appName}
      buttonText="CTA Text from Brief"
      formId="hero"
    />
    <p class="text-sm text-text-muted mt-6">Trust indicator from brief</p>
  </div>
</section>
```

---

### `src/components/ValueProposition.astro`

3 cards with titles, descriptions, and icons from the brief. No boilerplate needed — write it fresh.

---

### `src/components/ProblemSolution.astro`

Pain points with Reddit quotes and solutions from the brief. Write fresh per project.

---

### `src/components/FinalCTA.astro`

Bottom CTA section. Must include `<WaitlistForm>` with `formId="bottom"`.

```astro
---
import WaitlistForm from './WaitlistForm.astro';
interface Props { appName: string; }
const { appName } = Astro.props;
---
<section class="py-16 sm:py-24 px-4">
  <div class="max-w-3xl mx-auto text-center">
    <h2 class="font-heading text-3xl sm:text-4xl font-bold text-primary mb-6">
      Final CTA Headline from Brief
    </h2>
    <p class="text-lg text-text-muted mb-10">Subtext from brief.</p>
    <WaitlistForm
      projectName={appName}
      buttonText="Join the Waitlist — It's Free"
      incentiveText="Incentive text from brief (e.g. free PDF offer)"
      variant="cta"
      formId="bottom"
    />
  </div>
</section>
```

---

### `src/components/Header.astro` and `src/components/Footer.astro`

Simple brand header and footer. Write per project (they contain the app name and nav links).

---

## 3. What NOT to Touch (Already Done)

These files are complete and work identically across all projects. **Do not modify them unless fixing a bug.**

| File                                | What it does                                            |
| ----------------------------------- | ------------------------------------------------------- |
| `astro.config.mjs`                  | Astro + Tailwind integration                            |
| `Dockerfile`                        | Multi-stage build → nginx. Uses `/app/dist` (critical!) |
| `.gitignore`                        | Ignores node_modules, dist, .env                        |
| `src/layouts/Layout.astro`          | HTML shell, meta tags, font loading                     |
| `src/components/WaitlistForm.astro` | Form + API call + success/error states                  |
| `src/components/FAQ.astro`          | Accordion FAQ — pass `items` prop                       |
| `src/components/HowItWorks.astro`   | 3-step section — pass `steps` prop                      |
| `src/components/Testimonials.astro` | Testimonial cards — pass `items` prop                   |

---

## 4. Color & Font Setup

### Colors

Open `tailwind.config.mjs`. Replace only the **hex values** — keep the token names the same.

```js
colors: {
  primary:    "#YOUR_HEX",   // Main brand color (headings, logo)
  accent:     "#YOUR_HEX",   // CTA buttons, highlights, links
  surface:    "#YOUR_HEX",   // Page/card background
  "text-main": "#YOUR_HEX", // Default body text
  "text-muted": "#YOUR_HEX",// Secondary/helper text
  success:    "#YOUR_HEX",   // Form success state (green-ish)
},
```

**Map from design brief:**

| Brief token | Tailwind token |
| ----------- | -------------- |
| Primary     | `primary`      |
| Accent      | `accent`       |
| Surface     | `surface`      |
| Text        | `text-main`    |
| Text Muted  | `text-muted`   |
| Success     | `success`      |

### Fonts

1. Update `fontFamily` in `tailwind.config.mjs`:

```js
fontFamily: {
  heading: ['"Font Name"', "Georgia", "serif"],
  body:    ['"Font Name"', "system-ui", "sans-serif"],
},
```

2. Update the Google Fonts URL in `src/layouts/Layout.astro` (look for the `<!-- Google Fonts -->` comment).

Common pairings from briefs:

- **Playfair Display + Source Sans Pro** → `?family=Playfair+Display:wght@400;500;600;700&family=Source+Sans+Pro:wght@300;400;600;700`
- **DM Serif Display + DM Sans** → `?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500;600`
- **Inter only** → `?family=Inter:wght@300;400;500;600;700`

---

## 5. WaitlistForm Props Reference

```astro
<WaitlistForm
  projectName="your-app-name"        <!-- REQUIRED: kebab-case app name -->
  buttonText="Get Early Access"       <!-- optional, default: "Join the Waitlist" -->
  incentiveText="Join 2,400+ people"  <!-- optional: shown below form -->
  variant="hero"                      <!-- optional: "hero" | "cta", default: "hero" -->
  formId="hero"                       <!-- optional: unique per form, default: "waitlist" -->
/>
```

**Important:** If you have two forms on the same page (Hero + FinalCTA), use different `formId` values (e.g. `"hero"` and `"bottom"`). The `projectName` must be the same on both.

---

## 6. Deployment Checklist

### Build & test locally

```bash
npm run build   # Builds to ./dist/
npm run preview # Preview the production build at localhost:4321
```

### Push to GitHub

```bash
git init
git add .
git commit -m "feat: initial landing page for app-name"
gh repo create app-name --public --source=. --description "Landing page" --push
```

### Create Dokploy app

1. Go to Dokploy → GoldMine project → New Application
2. Name: `app-name` (gets a random suffix automatically)
3. Connect GitHub repo → branch: `main` (or `master`) → Build type: **Dockerfile**
4. Enable **Auto Deploy** on push
5. Click **Deploy**

### Add domain

1. In Dokploy app → Domains → Add Domain
2. Host: `app-name.aitbytes.dev` (uses wildcard DNS, no DNS config needed)
3. Port: `80`
4. Enable HTTPS → Certificate: **Let's Encrypt**
5. Save → wait ~60 seconds for cert provisioning

### Verify

- `https://app-name.aitbytes.dev` loads the page
- Submit a test email in the waitlist form → check for success message
- Verify email appears in the shared backend

---

## 7. Common Gotchas

| Issue                            | Fix                                                                     |
| -------------------------------- | ----------------------------------------------------------------------- |
| Dockerfile COPY fails            | Always use `COPY --from=builder /app/dist` (not `/dist`)                |
| Tailwind classes not applying    | Check `content` in `tailwind.config.mjs` includes `*.astro`             |
| Form shows error after submit    | Check `projectName` matches what's registered in backend                |
| Fonts not loading                | Verify Google Fonts URL in `Layout.astro` matches `tailwind.config.mjs` |
| Build succeeds but page is blank | Check `index.astro` imports and that all referenced components exist    |
| GitHub push fails                | Check default branch name: `git branch` to confirm `main` vs `master`   |

---

## 8. File Creation Checklist

When starting from this template, you need to create these files (everything else is done):

- [ ] `src/pages/index.astro`
- [ ] `src/components/Hero.astro`
- [ ] `src/components/ValueProposition.astro`
- [ ] `src/components/ProblemSolution.astro`
- [ ] `src/components/FinalCTA.astro`
- [ ] `src/components/Header.astro`
- [ ] `src/components/Footer.astro`
- [ ] Update `package.json` → `name`
- [ ] Update `tailwind.config.mjs` → colors + fonts
- [ ] Update `src/layouts/Layout.astro` → Google Fonts URL (if different fonts)
