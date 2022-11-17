import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DestroyService } from '@nx-the-movies/shared/common';
import { debounceTime, takeUntil } from 'rxjs';

@Component({
  selector: 'nx-the-movies-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  private router = inject(Router);
  private destroy$ = inject(DestroyService);

  searchControl = new FormControl('');

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(debounceTime(300), takeUntil(this.destroy$)).subscribe({
      next: (search) => {
        if (search && search.trim()) {
          this.router.navigate(['/list'], { queryParams: { search } });
        }
      }
    });
  }
}
