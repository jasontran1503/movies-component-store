import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { inject, Injectable, Provider } from '@angular/core';
import { APP_CONFIG } from '@nx-the-movies/shared/data-access/models';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  private appConfig = inject(APP_CONFIG);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    req = req.clone({
      params: req.params.set('api_key', this.appConfig.apiKey)
    });

    return next.handle(req);
  }
}

export function providersInterceptor(): Provider {
  return [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiKeyInterceptor,
      multi: true
    }
  ];
}
