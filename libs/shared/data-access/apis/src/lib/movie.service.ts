import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  APP_CONFIG,
  Credits,
  ListResponse,
  Movie,
  MovieDetail,
  SortBy
} from '@nx-the-movies/shared/data-access/models';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private appConfig = inject(APP_CONFIG);
  private http = inject(HttpClient);

  getMovies(type: string, page: number = 1) {
    return this.http.get<ListResponse<Movie>>(`${this.appConfig.baseUrl}movie/${type}`, {
      params: { page }
    });
  }

  getMoviesWithGenres(with_genres: number, page: number = 1) {
    return this.http.get<ListResponse<Movie>>(`${this.appConfig.baseUrl}discover/movie`, {
      params: { page, sort_by: 'popularity.desc', with_genres }
    });
  }

  search(query: string, page: number = 1) {
    return this.http.get<ListResponse<Movie>>(`${this.appConfig.baseUrl}search/movie`, {
      params: { page, query }
    });
  }

  getMoviesWithCast(with_cast: number, sort_by: SortBy, page: number = 1) {
    return this.http.get<ListResponse<Movie>>(`${this.appConfig.baseUrl}discover/movie`, {
      params: { page, with_cast, sort_by: `${sort_by}.desc` }
    });
  }

  getMovieDetail(id: number) {
    return this.http.get<MovieDetail>(`${this.appConfig.baseUrl}movie/${id}`, {
      params: { append_to_response: 'videos' }
    });
  }

  getRecommendations(id: number, page: number = 1) {
    return this.http.get<ListResponse<Movie>>(
      `${this.appConfig.baseUrl}movie/${id}/recommendations`,
      {
        params: { page }
      }
    );
  }

  getCredits(id: number) {
    return this.http.get<Credits>(`${this.appConfig.baseUrl}movie/${id}/credits`);
  }
}
