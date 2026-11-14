/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts}'],
  theme: {
    extend: {
      colors: Object.fromEntries([
        'bg-night', 'bg-surface', 'bg-raised', 'line-subtle',
        'text-primary', 'text-secondary', 'accent-trust', 'accent-glow',
        'state-validated', 'alert-amber', 'risk-coral',
      ].map((token) => [token, `var(--color-${token})`])),
      fontFamily: {
        sans: ['Schibsted Grotesk Variable', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
      borderRadius: { sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '2rem', full: '9999px' },
    },
  },
  plugins: [],
};
