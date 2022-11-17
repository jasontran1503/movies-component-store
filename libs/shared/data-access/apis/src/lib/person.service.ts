import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { APP_CONFIG, Person } from '@nx-the-movies/shared/data-access/models';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private appConfig = inject(APP_CONFIG);
  private http = inject(HttpClient);

  getPersonBio(personId: number) {
    return this.http.get<Person>(`${this.appConfig.baseUrl}person/${personId}`, {
      params: { append_to_response: 'videos' }
    });
  }
}
