import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { CvService } from '../services/cv.service';
import { Cv } from '../model/cv';

@Injectable({
  providedIn: 'root',
})
export class CvDetailsResolver implements Resolve<Cv> {
  router: any;
  constructor(private cvService: CvService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Cv> {
    const id = +route.params['id'];
    return this.cvService.getCvById(id).pipe(
      catchError((error) => {
        console.log('Erreur lors du chargement du CV', error);
        this.router.navigate(['/cv']); 
        return EMPTY; 
      })
    );}
}