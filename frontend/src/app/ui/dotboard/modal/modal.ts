import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  effect,
  input,
  output,
  viewChild,
} from '@angular/core';
import { DbButton } from '../button/button';
import { DotboardTone } from '../dotboard-icons';

let modalCounter = 0;

@Component({
  selector: 'db-modal',
  imports: [DbButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (open()) {
      <div
        class="db-scrim"
        [class.is-contained]="contained()"
        (click)="onScrimClick($event)"
      >
        <div
          class="db-modal"
          role="dialog"
          aria-modal="true"
          [attr.aria-labelledby]="titleId"
          tabindex="-1"
          #panel
        >
          <header class="db-modal__head">
            <h2 [id]="titleId" class="db-modal__title" [class]="tone() ? 'db-tone-' + tone() : ''">
              @if (tone()) {
                <i class="db-mark" aria-hidden="true"></i>
              }
              {{ title() }}
            </h2>
            <db-button variant="ghost" size="lg" icon="close" ariaLabel="Fermer" (click)="closed.emit()" />
          </header>
          <div class="db-modal__body">
            <ng-content />
          </div>
          <footer class="db-modal__foot">
            <ng-content select="[dbModalActions]" />
          </footer>
        </div>
      </div>
    }
  `,
})
export class DbModal {
  readonly open = input(true);
  readonly title = input('');
  readonly tone = input<DotboardTone>();
  readonly contained = input(false);
  readonly closed = output<void>();

  readonly titleId = `db-modal-title-${++modalCounter}`;
  private readonly panel = viewChild<ElementRef<HTMLDivElement>>('panel');

  constructor() {
    effect(() => {
      if (this.open() && !this.contained()) {
        this.panel()?.nativeElement.focus();
      }
    });
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.open()) this.closed.emit();
  }

  onScrimClick(event: MouseEvent) {
    if (event.target === event.currentTarget) this.closed.emit();
  }
}
