import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DotboardTone } from '../dotboard-icons';

@Component({
  selector: 'db-tag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span [class]="classes()">
      @if (tone() !== 'none') {
        <i class="db-mark" aria-hidden="true"></i>
      }
      <ng-content />
    </span>
  `,
})
export class DbTag {
  readonly tone = input<DotboardTone | 'none'>();

  readonly classes = computed(() => {
    const tone = this.tone();
    return tone && tone !== 'none' ? `db-tag db-tone-${tone}` : 'db-tag';
  });
}
