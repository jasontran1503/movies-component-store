import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GenreService } from '@nx-the-movies/shared/data-access/apis';
import { Genre } from '@nx-the-movies/shared/data-access/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'nx-the-movies-side-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideBarComponent {
  private genreService = inject(GenreService);

  categories = [
    { id: 'popular', icon: 'heart', name: 'popular' },
    { id: 'top-rated', icon: 'fire', name: 'top rated' },
    { id: 'upcoming', icon: 'calendar-o', name: 'upcoming' }
  ];
  genres$: Observable<Genre[]> = this.genreService.getGenres();

  @Output() closeSidebar = new EventEmitter<void>();

  onCloseSidebar() {
    this.closeSidebar.emit();
  }
}
