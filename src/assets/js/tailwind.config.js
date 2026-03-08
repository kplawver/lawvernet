tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Contrail One"', 'ui-sans-serif', 'sans-serif'],
        sans:    ['"Radio Canada"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Comic panel UI colors
        'panel-bg':     '#FFFFFF',
        'panel-border': '#111827',
        'page-bg':      '#FEF9EE',
        'ink':          '#111827',
        'primary':      '#DC2626',
        'primary-dark': '#B91C1C',
        'primary-light':'#FCA5A5',
        // Dark mode panel
        'dark-panel-bg':    '#1E293B',
        'dark-panel-border':'#F59E0B',
        // Comic bubble fills
        'comic-red':    '#E63946',
        'comic-yellow': '#FFD700',
        'comic-blue':   '#0057B8',
        'comic-orange': '#FF6B00',
        'comic-green':  '#2DC653',
      },
    }
  }
};
