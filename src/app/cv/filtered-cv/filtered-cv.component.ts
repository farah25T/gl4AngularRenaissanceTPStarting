import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoggerService } from 'src/app/services/logger.service';
import { CvService } from '../services/cv.service';
import { catchError, map, Observable, of } from 'rxjs';
import { Cv } from '../model/cv';

@Component({
  selector: 'app-filtered-cv',
  templateUrl: './filtered-cv.component.html',
  styleUrl: './filtered-cv.component.css',
})
export class FilteredCvComponent {
  selectedCv$: Observable<Cv | null> = this.cvService.selectCv$;
  /*   selectedCv: Cv | null = null; */
  // junior$: Observable<Cv[]> = this.cvs$.pipe(
  //   map((cvs) => cvs.filter((cv) => cv.age < 30))
  // );
  // senior$: Observable<Cv[]> = this.cvs$.pipe(
  //   map((cvs) => cvs.filter((cv) => cv.age >= 30))
  // );
  seniors: Cv[] = [];
  juniors: Cv[] = [];
  date = new Date();

  constructor(
    private logger: LoggerService,
    private toastr: ToastrService,
    private cvService: CvService
  ) {
    // this.cvService.getCvs().subscribe({
    //   next: (cvs) => {
    //     this.cvs = cvs;
    //   },
    //   error: () => {
    //     this.cvs = this.cvService.getFakeCvs();
    //     this.toastr.error(`
    //       Attention!! Les données sont fictives, problème avec le serveur.
    //       Veuillez contacter l'admin.`);
    //   },
    // });
    console.log('zdazd');
    this.cvService
      .getCvs()
      .pipe(
        catchError(() => {
          this.toastr.error(`
          Attention!! Les données sont fictives, problème avec le serveur.
          Veuillez contacter l'admin.`);
          return of(this.cvService.getFakeCvs());
        }),
        map((cvs) => {
          this.juniors = cvs.filter((cv) => cv.age < 30);
          this.seniors = cvs.filter((cv) => cv.age >= 30);
          console.log('junior', this.juniors);
        })
      )
      .subscribe();
    this.logger.logger('je suis le cvComponent');
    this.toastr.info('Bienvenu dans notre CvTech');
    // this.cvService.selectCv$.subscribe((cv) => (this.selectedCv = cv));
  }
}
