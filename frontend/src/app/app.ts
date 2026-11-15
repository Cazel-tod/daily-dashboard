import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DbButton, DotboardTheme } from './ui/dotboard';

@Component({
  imports: [RouterOutlet, DbButton],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('frontend');
  protected readonly theme = inject(DotboardTheme);
  protected readonly themeIcon = computed(() => (this.theme.theme() === 'dark' ? 'moon' : 'sun'));
}
