/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ─── CUSTOMIZE PER BRIEF ───────────────────────────────────────────
        // Replace hex values with the exact colors from the design brief.
        // Token names must stay the same — only the hex values change.
        //
        // primary      → main brand color (headings, logo, key text)
        // accent       → CTA buttons, highlights, links
        // surface      → page/card backgrounds.
        //                AVOID pure white (#fff) — use off-white, warm cream,
        //                or a very light brand tint to add perceived depth.
        // text-main    → default body text
        // text-muted   → secondary/helper text
        // success      → form success state
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
        // Replace with the font families from the design brief.
        // Also update the Google Fonts URL in src/layouts/Layout.astro.
        //
        // AVOID: Inter, Roboto, Arial — generic and forgettable.
        // HEADING choices: Playfair Display, DM Serif Display, Fraunces,
        //                  Syne, Cormorant Garamond, Libre Baskerville
        // BODY choices:    Plus Jakarta Sans, Instrument Sans, DM Sans,
        //                  Source Sans 3, General Sans
        // ──────────────────────────────────────────────────────────────────
        heading: ['"Playfair Display"', "Georgia", "serif"],
        body: ['"Source Sans 3"', "system-ui", "sans-serif"],
      },
      fontSize: {
        // Dramatic scale jumps — hierarchy that reads at a glance.
        // Use text-display for hero statements, text-title for section heads.
        // clamp() gives fluid scaling without breakpoint boilerplate.
        "display": ["clamp(3rem, 6vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "title":   ["clamp(1.75rem, 3vw, 2.75rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "lead":    ["clamp(1.05rem, 1.5vw, 1.25rem)", { lineHeight: "1.65" }],
      },
      boxShadow: {
        // Layered shadows feel more natural than single-value ones.
        "card":      "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.08)",
        "card-hover":"0 2px 8px rgba(0,0,0,0.08), 0 12px 32px rgba(0,0,0,0.12)",
        "cta":       "0 4px 16px rgba(0,0,0,0.15), 0 1px 4px rgba(0,0,0,0.1)",
      },
      animation: {
        "fade-up":    "fadeUp 0.6s ease forwards",
        "fade-in":    "fadeIn 0.5s ease forwards",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      transitionTimingFunction: {
        // More considered easing than the default "ease"
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "smooth": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
    },
  },
};
