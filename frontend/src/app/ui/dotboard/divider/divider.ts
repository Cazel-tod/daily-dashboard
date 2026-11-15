import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DotboardTone } from '../dotboard-icons';

@Component({
  selector: 'db-divider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="classes()" role="separator">
      @for (mark of marks(); track mark) {
        <i class="db-mark" aria-hidden="true"></i>
      }
    </div>
  `,
})
export class DbDivider {
  readonly tone = input<DotboardTone>();
  readonly count = input(1);

  readonly marks = computed(() => Array.from({ length: Math.max(1, this.count()) }, (_, i) => i));

  readonly classes = computed(() => {
    const tone = this.tone();
    return tone ? `db-divider db-tone-${tone}` : 'db-divider';
  });
}
