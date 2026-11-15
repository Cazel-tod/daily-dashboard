import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DOTBOARD_ICONS, DotboardIconName } from '../dotboard-icons';

@Component({
  selector: 'db-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      class="db-icon"
      [attr.width]="renderSize()"
      [attr.height]="renderSize()"
      viewBox="0 0 7 7"
      fill="currentColor"
      focusable="false"
      [attr.role]="label() ? 'img' : null"
      [attr.aria-label]="label() ?? null"
      [attr.aria-hidden]="label() ? null : 'true'"
    >
      @for (dot of dots(); track dot.x + '-' + dot.y) {
        <circle [attr.cx]="dot.x + 0.5" [attr.cy]="dot.y + 0.5" r="0.38" />
      }
    </svg>
  `,
})
export class DbIcon {
  readonly name = input.required<DotboardIconName>();
  readonly size = input(32);
  readonly label = input<string>();

  readonly renderSize = computed(() => Math.max(24, this.size()));

  readonly dots = computed(() => {
    const rows = DOTBOARD_ICONS[this.name()];
    const points: { x: number; y: number }[] = [];
    for (let y = 0; y < 7; y++) {
      for (let x = 0; x < 7; x++) {
        if (rows[y].charAt(x) === '#') points.push({ x, y });
      }
    }
    return points;
  });
}
