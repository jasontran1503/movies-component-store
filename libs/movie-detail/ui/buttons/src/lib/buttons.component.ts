import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { MovieDetail } from '@nx-the-movies/shared/data-access/models';

@Component({
  selector: 'nx-the-movies-buttons[movieDetail]',
  template: `<ng-container>
    <a [href]="movieDetail.homepage" target="_blank" class="button"
      >Website<i class="fa fa-link" aria-hidden="true"></i
    ></a>
    <a href="https://www.imdb.com/title/{{ movieDetail.imdb_id }}" target="_blank" class="button"
      >IMDB<i class="fa fa-film" aria-hidden="true"></i
    ></a>
    <a href="" target="_blank" class="button"
      >Trailer<i class="fa fa-play" aria-hidden="true"></i
    ></a>
    <a class="button back" (click)="back()"
      ><i class="fa fa-arrow-left" aria-hidden="true"></i>Back</a
    >
  </ng-container>`,
  styles: [
    `
      .button {
        width: 100px;
        height: 50px;
        border: 1px solid #14b8a2;
        border-radius: 5px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        cursor: pointer;
        font-weight: 500;
        text-decoration: none;
        margin-right: 5px;
        margin-bottom: 5px;
        color: #14b8a2;
      }
      .back {
        background-color: #14b8a2;
        color: #000;
      }
    `
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonsComponent {
  @Input() movieDetail!: MovieDetail;

  private location = inject(Location);

  back() {
    this.location.back();
  }
}
