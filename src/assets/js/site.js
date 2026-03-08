// Alpine.js component — registered before Alpine initializes
document.addEventListener('alpine:init', () => {
  Alpine.data('siteApp', () => ({
    darkMode: localStorage.getItem('darkMode') !== null
      ? localStorage.getItem('darkMode') === 'true'
      : window.matchMedia('(prefers-color-scheme: dark)').matches,
    mobileMenuOpen: false,
    init() {
      this.$watch('darkMode', val => localStorage.setItem('darkMode', val));
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (localStorage.getItem('darkMode') === null) this.darkMode = e.matches;
      });
    }
  }));
});
