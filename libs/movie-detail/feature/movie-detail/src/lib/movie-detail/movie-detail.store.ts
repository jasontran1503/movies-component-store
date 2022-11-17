import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentStore, OnStateInit, tapResponse } from '@ngrx/component-store';
import { MovieService } from '@nx-the-movies/shared/data-access/apis';
import {
  ApiStatus,
  Credits,
  ListResponse,
  Movie,
  MovieDetail
} from '@nx-the-movies/shared/data-access/models';
import { map, Observable, switchMap, forkJoin, tap, pipe, withLatestFrom } from 'rxjs';

interface MovieDetailState {
  movieDetail: MovieDetail | null;
  casts: Credits['cast'];
  movieResponse: ListResponse<Movie> | null;
  status: ApiStatus;
  page: number;
}

const initialState: MovieDetailState = {
  movieDetail: null,
  casts: [],
  movieResponse: null,
  status: 'idle',
  page: 1
};

@Injectable()
export class MovieDetailStore extends ComponentStore<MovieDetailState> implements OnStateInit {
  readonly movieId$ = this.route.paramMap.pipe(map((params) => Number(params.get('id'))));

  readonly vm$ = this.select(
    this.select((s) => s.movieDetail),
    this.select((s) => s.casts),
    this.select((s) => s.movieResponse),
    this.select((s) => s.status),
    this.select((s) => s.page),
    (movieDetail, casts, movieResponse, status, page) => ({
      movieDetail,
      casts,
      movieResponse,
      status,
      page
    }),
    { debounce: true }
  );

  constructor(private route: ActivatedRoute, private movieService: MovieService) {
    super(initialState);
  }

  private readonly getDataState = this.effect((movieId$: Observable<number>) =>
    movieId$.pipe(
      tap(() => this.patchState({ status: 'loading' })),
      switchMap((movieId) =>
        forkJoin([
          this.movieService.getMovieDetail(movieId),
          this.movieService.getCredits(movieId),
          this.movieService.getRecommendations(movieId)
        ]).pipe(
          tapResponse(
            ([movieDetail, { cast }, movieResponse]) =>
              this.patchState({
                status: 'success',
                movieDetail,
                movieResponse,
                casts: cast,
                page: 1
              }),
            () => this.patchState({ status: 'error' })
          )
        )
      )
    )
  );

  readonly changePage = this.effect<number>(
    pipe(
      tap(() => this.patchState({ status: 'loading' })),
      withLatestFrom(this.movieId$),
      switchMap(([page, movieId]) =>
        this.movieService.getRecommendations(movieId, page).pipe(
          tapResponse(
            (movieResponse) => this.patchState({ movieResponse, status: 'success', page }),
            () => this.patchState({ status: 'error' })
          )
        )
      )
    )
  );

  ngrxOnStateInit() {
    this.getDataState(this.movieId$);
  }
}
