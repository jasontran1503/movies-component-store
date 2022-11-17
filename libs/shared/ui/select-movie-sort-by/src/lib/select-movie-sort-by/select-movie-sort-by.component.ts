import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DestroyService } from '@nx-the-movies/shared/common';
import { SortBy } from '@nx-the-movies/shared/data-access/models';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'nx-the-movies-select-movie-sort-by',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `<select class="form-select mb-3" [formControl]="control">
    <option value="popularity" selected>Popularity</option>
    <option value="vote_average">Vote Average</option>
    <option value="original_title">Original Title</option>
    <option value="release_date">Release Date</option>
  </select> `,
  styles: [
    `
      .form-select {
        width: 50%;
        background-color: var(--palette-background);
        color: var(--palette-text-primary);
        border: 1px solid var(--palette-text-primary);
        box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px,
          rgb(0 0 0 / 12%) 0px 1px 3px 0px;
      }

      @media screen and (max-width: 576px) {
        .form-select {
          width: 100%;
        }
      }
    `
  ],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectMovieSortByComponent implements OnInit {
  private destroy$ = inject(DestroyService);
  control = new FormControl('popularity');

  @Output() sortBy = new EventEmitter<SortBy>();

  ngOnInit(): void {
    this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => {
        if (value) {
          this.sortBy.emit(value as SortBy);
        }
      }
    });
  }
}
