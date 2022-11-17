import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nx-the-movies-toggle-mode',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toggle-mode.component.html',
  styleUrls: ['./toggle-mode.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleModeComponent {
  light = true;

  changeTheme() {
    this.light = !this.light;
    if (this.light) {
      document.body.className = 'light';
    } else {
      document.body.className = 'dark';
    }
  }
}
