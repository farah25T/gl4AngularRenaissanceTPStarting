import { Component } from "@angular/core";
import { Cv } from "../model/cv";
import { LoggerService } from "../../services/logger.service";
import { ToastrService } from "ngx-toastr";
import { CvService } from "../services/cv.service";
import { catchError, Observable, of } from "rxjs";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-cv",
  templateUrl: "./cv.component.html",
  styleUrls: ["./cv.component.css"],
})
export class CvComponent {
  cvs$: Observable<Cv[]> = this.cvService.getCvs();
  selectedCv$: Observable<Cv | null> = this.cvService.selectCv$;
  /*   selectedCv: Cv | null = null; */
  date = new Date();

  constructor(
    private logger: LoggerService,
    private toastr: ToastrService,
    private cvService: CvService,
    private route: ActivatedRoute 
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
    //this.cvs$=this.cvService.getCvs()
    //.pipe(
    // catchError(()=>{
    //    this.toastr.error(`
    //      Attention!! Les données sont fictives, problème avec le serveur.
    //      Veuillez contacter l'admin.`);
    //    return of(this.cvService.getFakeCvs());
    //}));
    this.logger.logger("je suis le cvComponent");
    this.toastr.info("Bienvenu dans notre CvTech");
    // this.cvService.selectCv$.subscribe((cv) => (this.selectedCv = cv));
  }
  ngOnInit(): void {
    const resolvedCvs = this.route.snapshot.data['cvR'] as Cv[];

    if (resolvedCvs) {
      this.cvs$ = of(resolvedCvs); 
    } else {
      this.toastr.error(
        `Attention!! Les données sont fictives, problème avec le serveur. Veuillez contacter l'admin.`
      );
      this.cvs$ = of(this.cvService.getFakeCvs()); 
    }}
}
