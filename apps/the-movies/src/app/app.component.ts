import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { DestroyService } from '@nx-the-movies/shared/common';
import { filter, takeUntil } from 'rxjs';

@Component({
  selector: 'nx-the-movies-root',
  template: `<router-outlet></router-outlet>`,
  standalone: true,
  imports: [RouterModule],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  private destroy$ = inject(DestroyService);

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event) => {
        if ((event as NavigationEnd).url === '/') {
          this.router.navigate(['/list'], { queryParams: { category: 'popular' } });
        }
      });
  }
}
