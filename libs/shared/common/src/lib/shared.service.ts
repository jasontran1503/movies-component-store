import { Injectable } from '@angular/core';
import { Genre } from '@nx-the-movies/shared/data-access/models';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private genres: Genre[] = [];

  setGenres(genres: Genre[]) {
    this.genres = genres;
  }

  getGenres() {
    return this.genres;
  }
}
