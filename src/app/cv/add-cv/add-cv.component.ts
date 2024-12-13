import { Component } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { CvService } from "../services/cv.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { APP_ROUTES } from "src/config/routes.config";
import { Cv } from "../model/cv";
import { uniqueCinValidator } from "../validators/cin-validator.validator";
import { cinAgeValidator } from "../validators/cin-age.validator";

@Component({
  selector: "app-add-cv",
  templateUrl: "./add-cv.component.html",
  styleUrls: ["./add-cv.component.css"],
})
export class AddCvComponent {
  constructor(
    private cvService: CvService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  form = this.formBuilder.group(
    {
    name: ["", Validators.required],
    firstname: ["", Validators.required],
    path: [{ value: "", disabled: true }], 
    job: ["", Validators.required],
    cin: [
      "",
      {
        validators: [
          Validators.required, 
          Validators.pattern("[0-9]{8}"),
          // cinAgeValidator(),
        ],
        asyncValidators: [uniqueCinValidator(this.cvService)],
        updateOn: "blur",
      },
    ],
    age: [
      0,
      {
        validators: [Validators.required],
      },
    ],
  },
  { validators: cinAgeValidator() }
);

  ngOnInit() {
    const savedForm = localStorage.getItem('addCvForm');
    if (savedForm) {
      this.form.patchValue(JSON.parse(savedForm));
    }
    const age = this.form.get("age")?.value ?? 0; 
    if (age < 18) {
      this.form.get("path")?.disable();
      this.form.get("path")?.setValue("");
    } else {
      this.form.get("path")?.enable();
    }
    this.form.valueChanges.subscribe((formValue) => {
      localStorage.setItem('addCvForm', JSON.stringify(formValue));
    });
    this.form.get("age")?.valueChanges.subscribe((age) => {
      if (age !== null && age < 18) { 
        this.form.get("path")?.disable();
        this.form.get("path")?.setValue("");
      } else {
        this.form.get("path")?.enable();
      }
    });
  }

  addCv() {
    this.cvService.addCv(this.form.value as Cv).subscribe({
      next: (cv) => {
        localStorage.removeItem('addCvForm');
        this.router.navigate([APP_ROUTES.cv]);
        this.toastr.success(`Le cv ${cv.firstname} ${cv.name}`);
      },
      error: (err) => {
        this.toastr.error(
          `Une erreur s'est produite, Veuillez contacter l'admin`
        );
      },
    });
  }

  get name(): AbstractControl {
    return this.form.get("name")!;
  }
  get firstname() {
    return this.form.get("firstname");
  }
  get age(): AbstractControl {
    return this.form.get("age")!;
  }
  get job() {
    return this.form.get("job");
  }
  get path() {
    return this.form.get("path");
  }
  get cin(): AbstractControl {
    return this.form.get("cin")!;
  }
}
