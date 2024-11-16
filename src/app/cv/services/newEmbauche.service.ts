import { Injectable } from '@angular/core';
import { Cv } from '../model/cv';
import { SignalService } from 'src/app/services/signal.service';

export interface CvTraitement {
  cvs: Cv[];
  selectedCv: Cv | null;
  embauche: Cv[];
}
@Injectable({
  providedIn: 'root',
})
export class NewEmbaucheService extends SignalService<CvTraitement> {
  constructor() {
    super({
      selectedCv: null,
      cvs: [
        new Cv(1, 'aymen', 'sellaouti', 'teacher', 'as.jpg', '1234', 40),
        new Cv(2, 'skander', 'sellaouti', 'enfant', '       ', '1234', 4),
      ],
      embauche: [],
    });
  }

  /**
   *
   * Retourne un liste fictive de cvs
   *
   * @returns CV[]
   *
   */
  getFakeCvs(): Cv[] {
    return this.state().cvs;
  }

  /**
   * Permet d'ajouter un cv au flux des cvs sélectionnés
   *
   * @param cv : Le cv à ajouter dans le flux des cvs sélectionnés
   */
  selectCv(cv: Cv) {
    if (cv !== null) {
      this.set('selectedCv', cv);
    }
  }

  getselectedCv(): Cv | null {
    return this.state().selectedCv;
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
