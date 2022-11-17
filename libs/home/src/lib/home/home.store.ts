import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentStore, OnStateInit, tapResponse } from '@ngrx/component-store';
import { MovieService } from '@nx-the-movies/shared/data-access/apis';
import { ApiStatus, ListResponse, Movie } from '@nx-the-movies/shared/data-access/models';
import { defer, map, pipe, switchMap, tap, withLatestFrom } from 'rxjs';

const MOVIE_DISCOVER = ['popular', 'upcoming', 'top_rated'];

interface HomeState {
  movieResponse: ListResponse<Movie> | null;
  status: ApiStatus;
  page: number;
  header: { main: string; sub: string };
}

const initialState: HomeState = {
  movieResponse: null,
  status: 'idle',
  page: 1,
  header: { main: '', sub: '' }
};

@Injectable()
export class HomeStore extends ComponentStore<HomeState> implements OnStateInit {
  readonly genreId$ = this.route.queryParams.pipe(
    tap((params) => {
      const key = Object.keys(params)[0];
      this.patchState({ header: { main: key, sub: params[key] } });
    }),
    map((params) => Number(params['id']))
  );
  readonly header$ = this.select((s) => s.header);

  readonly vm$ = this.select(
    this.select((s) => s.movieResponse),
    this.select((s) => s.status),
    this.select((s) => s.page),
    this.select((s) => s.header),
    (movieResponse, status, page, header) => ({
      movieResponse,
      status,
      page,
      header
    }),
    { debounce: true }
  );

  constructor(private route: ActivatedRoute, private movieService: MovieService) {
    super(initialState);
  }

  readonly changePage = this.effect<number>(
    pipe(
      tap(() => this.patchState({ status: 'loading' })),
      withLatestFrom(this.genreId$, this.header$),
      switchMap(([page, genreId, header]) =>
        this.getMovies(header, genreId, page).pipe(
          tapResponse(
            (movieResponse) => this.patchState({ header, movieResponse, status: 'success', page }),
            () => this.patchState({ status: 'error' })
          )
        )
      )
    )
  );

  private readonly getDataState = this.effect<number>(
    pipe(
      tap(() => this.patchState({ status: 'loading' })),
      withLatestFrom(this.header$),
      switchMap(([genreId, header]) =>
        this.getMovies(header, genreId).pipe(
          tapResponse(
            (movieResponse) =>
              this.patchState({ header, movieResponse, status: 'success', page: 1 }),
            () => this.patchState({ status: 'error' })
          )
        )
      )
    )
  );

  private getMovies(header: { main: string; sub: string }, genreId: number, page?: number) {
    return defer(() => {
      if (header.main === 'search') {
        return this.movieService.search(header.sub, page);
      }
      const type = header.sub.replace(/ /g, '_');
      if (!MOVIE_DISCOVER.includes(type)) {
        return this.movieService.getMoviesWithGenres(genreId, page);
      }
      return this.movieService.getMovies(type, page);
    });
  }

  ngrxOnStateInit() {
    this.getDataState(this.genreId$);
  }
}
