import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'db-glyph-matrix',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      class="db-glyph"
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.viewBox]="'0 0 ' + cells() + ' ' + cells()"
      role="img"
      [attr.aria-label]="label() ?? roundedValue() + ' %'"
    >
      @for (dot of dots(); track dot.x + '-' + dot.y) {
        <circle
          [attr.cx]="dot.x + 0.5"
          [attr.cy]="dot.y + 0.5"
          r="0.34"
          [style.fill]="dot.lit ? 'currentColor' : 'var(--glyph-off, var(--surface-3))'"
        />
      }
    </svg>
  `,
})
export class DbGlyphMatrix {
  readonly cells = input(21);
  readonly size = input(128);
  readonly value = input(100);
  readonly label = input<string>();

  private readonly clampedValue = computed(() => Math.max(0, Math.min(100, this.value())));
  readonly roundedValue = computed(() => Math.round(this.clampedValue()));

  readonly dots = computed(() => {
    const n = this.cells();
    const center = (n - 1) / 2;
    const limit = (n / 2 - 0.5) * (n / 2 - 0.5);
    const litFrom = n * (1 - this.clampedValue() / 100);
    const points: { x: number; y: number; lit: boolean }[] = [];
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        const dx = x - center;
        const dy = y - center;
        if (dx * dx + dy * dy > limit) continue;
        points.push({ x, y, lit: y + 0.5 >= litFrom });
      }
    }
    return points;
  });
}
