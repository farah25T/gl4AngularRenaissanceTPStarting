import { Component } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Cv } from '../model/cv';
import { LoggerService } from 'src/app/services/logger.service';
import { ToastrService } from 'ngx-toastr';
import { CvService } from '../services/cv.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-master-details-cv',
  templateUrl: './master-details-cv.component.html',
  styleUrl: './master-details-cv.component.css'
})
export class MasterDetailsCvComponent {

  cvs$: Observable<Cv[]>;

  constructor(
    private cvService: CvService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.cvs$ = this.cvService.getCvs().pipe(
      catchError(error => {
        this.toastr.error('Attention!! Les données sont fictives, problème avec le serveur. Veuillez contacter l\'admin.');
        return of(this.cvService.getFakeCvs());
      })
    );
    this.cvService.selectCv$
    .pipe(takeUntilDestroyed())
    .subscribe({
      next: cv => this.goToCvDetails(cv)
    })
  }
  
  ngOnInit() {}

  goToCvDetails(cv: Cv) {
    this.router.navigate([cv.id], { relativeTo: this.route });
  }
}
