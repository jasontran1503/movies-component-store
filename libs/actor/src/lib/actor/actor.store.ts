import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentStore, OnStateInit, tapResponse } from '@ngrx/component-store';
import { MovieService, PersonService } from '@nx-the-movies/shared/data-access/apis';
import {
  ApiStatus,
  ListResponse,
  Movie,
  Person,
  SortBy
} from '@nx-the-movies/shared/data-access/models';
import { forkJoin, map, Observable, pipe, switchMap, tap, withLatestFrom } from 'rxjs';

interface ActorState {
  actor: Person | null;
  movieResponse: ListResponse<Movie> | null;
  status: ApiStatus;
  page: number;
  sortBy: SortBy;
}

const initialState: ActorState = {
  actor: null,
  movieResponse: null,
  status: 'idle',
  page: 1,
  sortBy: 'popularity'
};

@Injectable()
export class ActorStore extends ComponentStore<ActorState> implements OnStateInit {
  readonly sortBy$ = this.select((s) => s.sortBy);
  readonly personId$ = this.route.paramMap.pipe(map((params) => Number(params.get('id'))));

  readonly vm$ = this.select(
    this.select((s) => s.actor),
    this.select((s) => s.movieResponse),
    this.select((s) => s.status),
    this.select((s) => s.page),
    this.sortBy$,
    (actor, movieResponse, status, page, sortBy) => ({
      actor,
      movieResponse,
      status,
      page,
      sortBy
    }),
    { debounce: true }
  );

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
    private movieService: MovieService
  ) {
    super(initialState);
  }

  private readonly getDataState = this.effect((personId$: Observable<number>) =>
    personId$.pipe(
      switchMap((personId) =>
        forkJoin([
          this.personService.getPersonBio(personId),
          this.movieService.getMoviesWithCast(personId, 'popularity', 1)
        ]).pipe(
          tap(() => this.patchState({ status: 'loading' })),
          tapResponse(
            ([actor, movieResponse]) =>
              this.patchState({
                actor,
                status: 'success',
                movieResponse,
                page: 1,
                sortBy: 'popularity'
              }),
            () => this.patchState({ status: 'error' })
          )
        )
      )
    )
  );

  readonly sortBy = this.effect<SortBy>(
    pipe(
      tap(() => this.patchState({ status: 'loading' })),
      withLatestFrom(this.personId$),
      switchMap(([sortBy, personId]) =>
        this.movieService.getMoviesWithCast(personId, sortBy).pipe(
          tapResponse(
            (movieResponse) =>
              this.patchState({ movieResponse, status: 'success', sortBy, page: 1 }),
            () => this.patchState({ status: 'error' })
          )
        )
      )
    )
  );

  readonly changePage = this.effect<number>(
    pipe(
      tap(() => this.patchState({ status: 'loading' })),
      withLatestFrom(this.sortBy$, this.personId$),
      switchMap(([page, sortBy, personId]) =>
        this.movieService.getMoviesWithCast(personId, sortBy, page).pipe(
          tapResponse(
            (movieResponse) => this.patchState({ movieResponse, status: 'success', sortBy, page }),
            () => this.patchState({ status: 'error' })
          )
        )
      )
    )
  );

  ngrxOnStateInit() {
    this.getDataState(this.personId$);
  }
}
