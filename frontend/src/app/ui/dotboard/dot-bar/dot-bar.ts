import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'db-dot-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="db-dots db-dots--row"
      [style.grid-template-columns]="'repeat(' + count() + ', 1fr)'"
      role="img"
      [attr.aria-label]="label() ?? roundedValue() + ' %'"
    >
      @for (dot of dots(); track dot) {
        <i [class.on]="dot < filled()"></i>
      }
    </div>
  `,
})
export class DbDotBar {
  readonly value = input(0);
  readonly count = input(12);
  readonly label = input<string>();

  private readonly clampedValue = computed(() => Math.max(0, Math.min(100, this.value())));
  readonly roundedValue = computed(() => Math.round(this.clampedValue()));

  readonly dots = computed(() => Array.from({ length: this.count() }, (_, i) => i));
  readonly filled = computed(() => Math.round((this.clampedValue() / 100) * this.count()));
}
