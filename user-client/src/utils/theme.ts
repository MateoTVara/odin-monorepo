// user-client/src/utils/theme.ts
export function applyTheme() {
  document.documentElement.classList.toggle(
    'dark',
    localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
}

export function listenToSystemThemeChanges() {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    if (!('theme' in localStorage)) {
      if (event.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  });
}
