import { HttpClientModule } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { providersInterceptor } from '@nx-the-movies/shared/common';
import { getAppConfigProvider } from '@nx-the-movies/shared/data-access/models';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(
        [
          {
            path: '',
            loadComponent: () =>
              import('@nx-the-movies/shell/ui/layout').then((m) => m.LayoutComponent),
            loadChildren: () => import('@nx-the-movies/shell/feature').then((m) => m.layoutRoutes)
          }
        ],
        {
          scrollOffset: [0, 0],
          scrollPositionRestoration: 'top'
        }
      ),
      HttpClientModule
    ),
    providersInterceptor(),
    getAppConfigProvider(environment)
  ]
}).catch((err) => console.error(err));
