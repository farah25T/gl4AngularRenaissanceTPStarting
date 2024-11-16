import { Injectable } from '@angular/core';
import { Cv } from '../model/cv';
import { SignalService } from 'src/app/services/signal.service';

export interface CvTraitement {
  embauche: Cv[];
}
@Injectable({
  providedIn: 'root',
})
export class NewEmbaucheService extends SignalService<CvTraitement> {
  constructor() {
    super({
     
      embauche: [],
    });
  }

  /**
   * Retrieves the list of embauchees from the current state.
   * This provides a snapshot of the current value.
   */
  getEmbauchees(): Cv[] {
    return this.state().embauche;
  }

  /**
   *
   * Embauche une personne si elle ne l'est pas encore
   * Sinon il retourne false
   *
   * @param cv : Cv
   * @returns boolean
   */

  embauche(cv: Cv): boolean {
    if (this.state().embauche.indexOf(cv) == -1) {
      this.set('embauche', [...this.state().embauche, cv]);
      return true;
    }
    return false;
  }
}
