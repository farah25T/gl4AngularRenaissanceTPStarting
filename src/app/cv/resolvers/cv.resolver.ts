import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { CvService } from "../services/cv.service";
import { Cv } from "../model/cv";

@Injectable({
  providedIn: "root",
})
export class CvResolver implements Resolve<Cv[]|null> {
  constructor(private cvService: CvService) {}

  resolve(): Observable<Cv[]|null> {
    return this.cvService.getCvs().pipe(
      catchError(() => {
        console.error("Erreur lors du chargement des CVs");
        return of(null); 
      })
    );
  }
}
