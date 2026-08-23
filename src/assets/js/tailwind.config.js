tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Newsreader', 'Georgia', 'serif'],
        sans:    ['"Radio Canada"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Primary flips per mode via CSS vars defined in site.css (:root / .dark),
        // so bare text-primary/hover:text-primary work in both themes.
        'primary':       'var(--primary)',
        'primary-dark':  'var(--primary-hover)',
        'primary-light': 'var(--primary-soft)',
        // Warm complement to #99ccff, used sparingly (source badges)
        'warm':          'var(--warm)',
        // Slate drives all dark:* utilities; retinted to the somber blue-black ramp.
        slate: {
          50: '#e8edf5', 100: '#d2dbe7', 200: '#b6c2d4', 300: '#94a3b8',
          400: '#78879b', 500: '#5c6a7d', 600: '#434e5d', 700: '#2e3745',
          800: '#141920', 900: '#0a0d12',
        },
        // gray scale intentionally left stock: gray-* classes serve LIGHT mode.
      },
    }
  }
};
