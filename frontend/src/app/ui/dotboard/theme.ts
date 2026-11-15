import { Injectable, effect, signal } from '@angular/core';

export type DotboardThemeName = 'light' | 'dark';

const STORAGE_KEY = 'dotboard-theme';

function initialTheme(): DotboardThemeName {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    /* localStorage indisponible (navigation privée, etc.) : on retombe sur l'attribut déjà posé par index.html. */
  }
  return document.documentElement.dataset['theme'] === 'light' ? 'light' : 'dark';
}

@Injectable({ providedIn: 'root' })
export class DotboardTheme {
  readonly theme = signal<DotboardThemeName>(initialTheme());

  constructor() {
    effect(() => {
      const theme = this.theme();
      document.documentElement.dataset['theme'] = theme;
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch {
        /* idem : pas bloquant si le stockage est indisponible. */
      }
    });
  }

  toggle(): void {
    this.theme.update((current) => (current === 'dark' ? 'light' : 'dark'));
  }
}
