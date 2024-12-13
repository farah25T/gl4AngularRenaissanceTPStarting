import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function cinAgeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cin = control.get('cin')?.value;
    const age = control.get('age')?.value;
    if (!cin || !age) {
        return null;
      }

    const ageSegment = parseInt(cin.substring(0, 2), 10);
// cas ou age >= 60 et ageSegment entre 0 w 19
    if (age >= 60 && (ageSegment < 0 || ageSegment > 19)) {
      return { invalid: 'CIN invalid car pas de correlation avec age' };
    }
// cas ou age < 60 et ageSegment > 19
    if (age < 60 && ageSegment <= 19) {
      return { invalid: 'CIN invalid car pas de correlation avec age' };
    }
// cas ou pas erreur
    return null;
  };
}
