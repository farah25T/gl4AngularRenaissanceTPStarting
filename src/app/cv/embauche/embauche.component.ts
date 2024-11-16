import { Component, effect, inject } from '@angular/core';
import { EmbaucheService } from '../services/embauche.service';
import { Cv } from '../model/cv';

import { ItemComponent } from '../item/item.component';
import { NewEmbaucheService } from '../services/newEmbauche.service';

@Component({
  selector: 'app-embauche',
  templateUrl: './embauche.component.html',
  styleUrls: ['./embauche.component.css'],
  standalone: true,
  imports: [ItemComponent],
})
export class EmbaucheComponent {
  private embaucheService = inject(NewEmbaucheService);

  public embauchees: Cv[] = [];
  constructor() {
    effect(() => {
      console.log(
        'EmbaucheComponent constructor',
        this.embaucheService.getEmbauchees()
      );
      this.embauchees = this.embaucheService.getEmbauchees();
    });
  }
}
