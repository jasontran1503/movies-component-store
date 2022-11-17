import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { ToggleModeComponent } from '../toggle-mode/toggle-mode.component';

@Component({
  selector: 'nx-the-movies-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, SearchComponent, ToggleModeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  isShowHamburger = false;

  @Output() showSidebar = new EventEmitter<boolean>();
  @ViewChild('hamburger') hamburger?: ElementRef<HTMLElement>;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const width = (event.target as Window).innerWidth;
    this.checkWidth(width);
    this.showSidebar.emit(false);
  }

  ngOnInit(): void {
    this.checkWidth(document.body.offsetWidth);
  }

  onShowSidebar() {
    this.showSidebar.emit(true);
  }

  onCloseSidebar(event: MouseEvent) {
    if (
      this.hamburger?.nativeElement &&
      (event.target as HTMLElement) === this.hamburger?.nativeElement
    ) {
      return;
    }
    this.showSidebar.emit(false);
  }

  private checkWidth(width: number): void {
    if (width < 1299) {
      this.isShowHamburger = true;
    } else {
      this.isShowHamburger = false;
    }
  }
}
