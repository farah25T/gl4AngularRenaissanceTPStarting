import { inject, Injectable } from '@angular/core';
import { Cv } from '../model/cv';
import { SignalService } from 'src/app/services/signal.service';
import { catchError, Observable, tap } from 'rxjs';
import { API } from 'src/config/api.config';
import { HttpClient } from '@angular/common/http';

export interface CvTraitement {
  cvs: Cv[];
  selectedCv: Cv | null;
  embauche: Cv[];
}
@Injectable({
  providedIn: 'root',
})
export class NewEmbaucheService extends SignalService<CvTraitement> {
  http = inject(HttpClient);

  constructor() {
    super({
      selectedCv: null,
      cvs: [],
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
    return this.get('cvs')();
  }

  /**
   * Permet d'ajouter un cv au flux des cvs sélectionnés
   *
   * @param cv : Le cv à ajouter dans le flux des cvs sélectionnés
   */
  selectCv(cv: Cv | null) {
    this.set('selectedCv', cv);
  }

  getselectedCv(): Cv | null {
    return this.get('selectedCv')();
  }
  /**
   * Retrieves the list of embauchees from the current state.
   * This provides a snapshot of the current value.
   */
  getEmbauchees(): Cv[] {
    return this.get('embauche')();
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
    if (this.get('embauche')().indexOf(cv) == -1) {
      this.set('embauche', [...this.get('embauche')(), cv]);
      return true;
    }
    return false;
  }

  /**
   * Fetches CVs from the API and returns an Observable.
   *
   * @returns Observable<Cv[]>
   */
  fetchCvs(): void {
    this.http.get<Cv[]>(API.cv).subscribe({
      next: (cvs) => {
        this.set('cvs', cvs);
      },
      error: (err) => {
        console.error('Failed to fetch CVs', err);
      },
    });
  }

  /**
   * Add a new cv */
  addCv(cv: Cv): Observable<Cv> {
    return this.http.post<Cv>(API.cv, cv);
  }

  /**
   *
   * Retourne un cv par son id de l'API
   *
   * @param id: number
   * @returns CV[]
   *
   */
  getCvById(id: number): Observable<Cv> {
    return this.http.get<Cv>(API.cv + id);
  }

  deleteCvById(id: number): Observable<any> {
    return this.http.delete<any>(`${API.cv}/${id}`);
  }
}
