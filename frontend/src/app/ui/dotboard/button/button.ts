import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DbIcon } from '../icon/icon';
import { DotboardIconName, DotboardTone } from '../dotboard-icons';

@Component({
  selector: 'db-button',
  imports: [DbIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      [class]="classes()"
      [disabled]="disabled()"
      [attr.aria-pressed]="active() === undefined ? null : active()"
      [attr.aria-label]="ariaLabel() ?? null"
    >
      @if (icon()) {
        <db-icon [name]="icon()!" [size]="24" />
      }
      @if (label()) {
        <span>{{ label() }}</span>
      }
    </button>
  `,
})
export class DbButton {
  readonly variant = input<'primary' | 'secondary' | 'ghost' | 'danger'>('secondary');
  readonly size = input<'md' | 'lg'>('md');
  readonly tone = input<DotboardTone>();
  readonly active = input(false);
  readonly pressed = input(false);
  readonly disabled = input(false);
  readonly icon = input<DotboardIconName>();
  readonly label = input<string>();
  readonly ariaLabel = input<string>();

  readonly classes = computed(() => {
    const cls = ['db-btn', `db-btn--${this.variant()}`];
    if (this.size() === 'lg') cls.push('db-btn--lg');
    if (this.icon() && !this.label()) cls.push('db-btn--icon');
    const tone = this.tone();
    if (tone) cls.push(`db-tone-${tone}`);
    if (tone || this.active()) cls.push('has-mark');
    if (this.active()) cls.push('is-active');
    if (this.pressed()) cls.push('is-pressed');
    return cls.join(' ');
  });
}
