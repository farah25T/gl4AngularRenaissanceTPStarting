import { Component, Input, effect, inject } from '@angular/core';
import { Cv } from '../model/cv';
import { ToastrService } from 'ngx-toastr';

import { RouterLink } from '@angular/router';
import { DefaultImagePipe } from '../pipes/default-image.pipe';
import { NewEmbaucheService } from '../services/newEmbauche.service';

@Component({
  selector: 'app-cv-card',
  templateUrl: './cv-card.component.html',
  styleUrls: ['./cv-card.component.css'],
  standalone: true,
  imports: [RouterLink, DefaultImagePipe],
})
export class CvCardComponent {
  private embaucheService = inject(NewEmbaucheService);
  private toastr = inject(ToastrService);

  cv: Cv | null = null;

  constructor() {
    console.log('cv-card constructor');
    effect(() => {
      this.cv = this.embaucheService.getselectedCv();
    });
  }
  ngOnDestroy(): void {
    console.log('cv-card destroyed, resetting selectedCv');
    this.embaucheService.selectCv(null);
  }
  embaucher() {
    if (this.cv) {
      if (this.embaucheService.embauche(this.cv)) {
        this.toastr.success(
          `${this.cv?.firstname} ${this.cv?.name} a été pré embauché`
        );
      } else {
        this.toastr.warning(
          `${this.cv?.firstname} ${this.cv?.name} est déjà pré embauché`
        );
      }
    }
  }
}
