import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { provideComponentStore } from '@ngrx/component-store';
import { MovieListComponent } from '@nx-the-movies/shared/ui/movie-list';
import { HomeStore } from './home.store';

@Component({
  selector: 'nx-the-movies-home',
  standalone: true,
  imports: [CommonModule, MovieListComponent],
  template: `<ng-container *ngIf="vm$ | async as vm">
    <nx-the-movies-movie-list
      *ngIf="vm.movieResponse"
      [header]="vm.header"
      [movieResponse]="vm.movieResponse"
      [status]="vm.status"
      (changePage)="onChangePage($event)"
    ></nx-the-movies-movie-list
  ></ng-container>`,
  providers: [provideComponentStore(HomeStore)],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private store = inject(HomeStore);

  vm$ = this.store.vm$;

  onChangePage(page: number) {
    this.store.changePage(page);
  }
}
