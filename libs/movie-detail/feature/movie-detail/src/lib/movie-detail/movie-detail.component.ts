import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideComponentStore } from '@ngrx/component-store';
import { ButtonsComponent } from '@nx-the-movies/movie-detail/ui/buttons';
import { MovieListComponent } from '@nx-the-movies/shared/ui/movie-list';
import { StarRatingComponent } from '@nx-the-movies/shared/ui/star-rating';
import { MovieDetailStore } from './movie-detail.store';

@Component({
  selector: 'nx-the-movies-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, StarRatingComponent, MovieListComponent, ButtonsComponent],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  providers: [provideComponentStore(MovieDetailStore)],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailComponent {
  private location = inject(Location);
  private store = inject(MovieDetailStore);

  vm$ = this.store.vm$;

  onChangePage(page: number) {
    this.store.changePage(page);
  }

  back() {
    this.location.back();
  }
}
