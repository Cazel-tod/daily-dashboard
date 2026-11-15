import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { DbIcon } from '../icon/icon';
import { DbDivider } from '../divider/divider';
import { DotboardIconName, DotboardTone } from '../dotboard-icons';

@Component({
  selector: 'db-display-card',
  imports: [DbIcon, DbDivider, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (interactive()) {
      <button type="button" #card [class]="classes()" [style.--card-h.px]="cardHeight() || null">
        <ng-container *ngTemplateOutlet="body" />
      </button>
    } @else {
      <div #card [class]="classes()" [style.--card-h.px]="cardHeight() || null">
        <ng-container *ngTemplateOutlet="body" />
      </div>
    }

    <ng-template #body>
      <div class="db-card__head">
        <span class="db-card__label">{{ label() }}</span>
        @if (status()) {
          <span class="db-card__status">{{ status() }}</span>
        } @else if (icon()) {
          <db-icon [name]="icon()!" [size]="32" />
        }
      </div>

      <db-divider [tone]="dividerTone()" />

      @if (showValue()) {
        <div class="db-card__value">
          {{ value() }}
          @if (unit()) {
            <span class="db-card__unit">{{ unit() }}</span>
          }
        </div>
      } @else {
        <div class="db-card__body">
          <ng-content />
        </div>
      }

      @if (caption() || interactive()) {
        <div class="db-card__foot">
          <span>{{ caption() }}</span>
          @if (interactive()) {
            <db-icon name="arrow-right" [size]="24" />
          }
        </div>
      }
    </ng-template>
  `,
})
export class DbDisplayCard {
  readonly label = input('');
  readonly tone = input<DotboardTone | 'danger' | 'default'>('default');
  readonly status = input<string>();
  readonly icon = input<DotboardIconName>();
  readonly value = input<string | number>();
  readonly unit = input<string>();
  readonly caption = input<string>();
  readonly size = input<'md' | 'lg'>('md');
  readonly interactive = input(false);
  readonly pressed = input(false);
  readonly texture = input<'dotfield' | 'arc' | 'gradient' | 'none'>('none');

  private readonly destroyRef = inject(DestroyRef);
  private readonly cardEl = viewChild<ElementRef<HTMLElement>>('card');

  // La texture "arc" dimensionne ses anneaux en fraction de la hauteur réelle de la carte :
  // impossible à exprimer en CSS pur (% d'un radial-gradient suit la largeur et la hauteur séparément).
  readonly cardHeight = signal(0);

  constructor() {
    afterNextRender(() => {
      const el = this.cardEl()?.nativeElement;
      if (!el) return;
      const observer = new ResizeObserver((entries) => {
        const height = entries[0]?.contentRect.height;
        if (height) this.cardHeight.set(height);
      });
      observer.observe(el);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  readonly showValue = computed(() => this.value() !== undefined);

  readonly dividerTone = computed(() => {
    const tone = this.tone();
    return tone === 'default' || tone === 'danger' ? undefined : tone;
  });

  readonly classes = computed(() => {
    const cls = ['db-card'];
    const tone = this.tone();
    if (tone === 'danger') cls.push('db-card--danger', 'db-tone-red');
    else if (tone !== 'default') cls.push(`db-tone-${tone}`);
    if (this.size() === 'lg') cls.push('db-card--lg');
    if (this.pressed()) cls.push('is-pressed');
    const texture = this.texture();
    if (texture !== 'none') cls.push(`db-tex-${texture}`);
    return cls.join(' ');
  });
}
