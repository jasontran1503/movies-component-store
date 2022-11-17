import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { provideComponentStore } from '@ngrx/component-store';
import { SortBy } from '@nx-the-movies/shared/data-access/models';
import { MovieListComponent } from '@nx-the-movies/shared/ui/movie-list';
import { SelectMovieSortByComponent } from '@nx-the-movies/shared/ui/select-movie-sort-by';
import { ActorStore } from './actor.store';

@Component({
  selector: 'nx-the-movies-actor',
  standalone: true,
  imports: [CommonModule, MovieListComponent, SelectMovieSortByComponent],
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.scss'],
  providers: [provideComponentStore(ActorStore)],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActorComponent {
  private location = inject(Location);
  private store = inject(ActorStore);

  vm$ = this.store.vm$;

  sortBy(value: SortBy) {
    this.store.sortBy(value);
  }

  onChangePage(page: number) {
    this.store.changePage(page);
  }

  back() {
    this.location.back();
  }
}
