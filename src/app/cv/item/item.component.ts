import { Component, Input, Output, EventEmitter, inject } from "@angular/core";
import { Cv } from "../model/cv";
import { CvService } from "../services/cv.service";
import { NgStyle } from "@angular/common";
import { DefaultImagePipe } from "../pipes/default-image.pipe";
import { NewEmbaucheService } from "../services/newEmbauche.service";

@Component({
    selector: "app-item",
    templateUrl: "./item.component.html",
    styleUrls: ["./item.component.css"],
    standalone: true,
    imports: [NgStyle, DefaultImagePipe],
})
export class ItemComponent {
  private cvService = inject(NewEmbaucheService);

  @Input({ required: true }) cv!: Cv;
  @Input() size = 50;

  onSelectCv() {
    this.cvService.selectCv(this.cv);
  }
}
