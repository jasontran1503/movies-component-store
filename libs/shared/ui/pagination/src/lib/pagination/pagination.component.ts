import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'nx-the-movies-pagination[totalPages][currentPage]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit {
  @Input() totalPages = 0;
  @Input() currentPage = 1;

  pages: number[] = [];

  @Output() changePage = new EventEmitter<number>();

  ngOnInit(): void {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  setPage(page: number) {
    this.currentPage = page;
    this.changePage.emit(this.currentPage);
  }

  previous() {
    this.currentPage > 1 ? (this.currentPage = this.currentPage - 1) : (this.currentPage = 0);
    this.changePage.emit(this.currentPage);
  }

  next() {
    this.currentPage < this.totalPages
      ? (this.currentPage = this.currentPage + 1)
      : (this.currentPage = this.totalPages);
    this.changePage.emit(this.currentPage);
  }
}
