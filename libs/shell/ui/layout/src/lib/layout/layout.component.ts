import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from '@nx-the-movies/shell/ui/navbar';
import { SideBarComponent } from '@nx-the-movies/shell/ui/side-bar';

@Component({
  selector: 'nx-the-movies-layout',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SideBarComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {
  isShowSidebar = false;

  showSidebar(value: boolean) {
    this.isShowSidebar = value;
  }

  closeSidebar() {
    this.isShowSidebar = false;
  }
}
