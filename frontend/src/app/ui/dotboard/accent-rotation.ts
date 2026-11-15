import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import { DotboardTone } from './dotboard-icons';

const ACCENT_POOL: readonly DotboardTone[] = ['cyan', 'orange', 'blue', 'yellow', 'red'];
const SLOT_MINUTES = 30;
const CHECK_INTERVAL_MS = 60_000;

function currentAccentTone(): DotboardTone {
  const now = new Date();
  const slot = Math.floor((now.getHours() * 60 + now.getMinutes()) / SLOT_MINUTES);
  return ACCENT_POOL[slot % ACCENT_POOL.length];
}

@Injectable({ providedIn: 'root' })
export class DotboardAccentRotation {
  readonly tone = signal<DotboardTone>(currentAccentTone());

  constructor() {
    const id = setInterval(() => this.tone.set(currentAccentTone()), CHECK_INTERVAL_MS);
    inject(DestroyRef).onDestroy(() => clearInterval(id));
  }
}
