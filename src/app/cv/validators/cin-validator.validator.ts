import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { CvService } from "../services/cv.service";
import { debounceTime, distinctUntilChanged, map, catchError, switchMap } from "rxjs/operators";
import { of } from "rxjs";

export function uniqueCinValidator(cvService: CvService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) {
      return of(null);
    }

    return cvService.selectByProperty("cin", control.value).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map((cvs) => {
        return cvs.length > 0 ? { uniqueCin: true } : null;
      }),
      catchError((error) => {
        console.error('Erreur lors de la validation du CIN:', error);
        return of(null); 
      })
    );
  };
}
