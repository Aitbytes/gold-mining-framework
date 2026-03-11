/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ─── CUSTOMIZE PER BRIEF ───────────────────────────────────────────
        // Replace these hex values with the exact colors from the design brief.
        // Token names must stay the same — only the hex values change.
        //
        // primary   → main brand color (headings, logo, key text)
        // accent    → CTA buttons, highlights, links
        // surface   → page/card backgrounds
        // text      → default body text
        // text-muted → secondary/helper text
        // success   → form success state
        // ──────────────────────────────────────────────────────────────────
        primary: "#2D3436",
        accent: "#6C5CE7",
        surface: "#F8F9FA",
        "text-main": "#2D3436",
        "text-muted": "#636E72",
        success: "#00B894",
      },
      fontFamily: {
        // ─── CUSTOMIZE PER BRIEF ───────────────────────────────────────────
        // Replace with the font families specified in the design brief.
        // Also update the Google Fonts URL in src/layouts/Layout.astro.
        // ──────────────────────────────────────────────────────────────────
        heading: ['"Playfair Display"', "Georgia", "serif"],
        body: ['"Source Sans Pro"', "system-ui", "sans-serif"],
      },
    },
  },
};
