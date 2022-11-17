import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nx-the-movies-star-rating[rating]',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="rating">
    <ng-container *ngFor="let item of starsRating" [ngSwitch]="item">
      <i *ngSwitchCase="1" class="fa fa-star" aria-hidden="true"></i>
      <i *ngSwitchCase="0.5" class="fa fa-star-half-o" aria-hidden="true"></i>
      <i *ngSwitchCase="0" class="fa fa-star-o" aria-hidden="true"></i>
    </ng-container>
    <span class="score" *ngIf="showScore">435</span>
  </div> `,
  styles: [
    `
      .rating {
        .fa {
          color: #b5b800;
          font-size: var(--text-xl);
        }
        .score {
          color: #b5b800;
          margin-left: 10px;
          font-weight: 600;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarRatingComponent implements OnInit {
  @Input() rating!: number;
  @Input() showScore = false;

  starsRating: number[] = [];

  ngOnInit(): void {
    const array: number[] = [];
    const score = this.rating / 2;
    const full = Math.floor(score);
    const half = score - full >= 0.5 ? 0.5 : 0;

    for (let i = 0; i < full; i++) {
      array.push(1);
    }
    array.push(half);
    this.starsRating = [...array];
    if (array.length < 5) {
      for (let i = 0; i < 5 - array.length; i++) {
        this.starsRating.push(0);
      }
    }
  }
}
