import { Component } from '@angular/core';
import { TTCComponent } from "../ttc.component";
import { TTCResultComponent } from "../ttc-result/ttc-result.component";

@Component({
  selector: 'app-tccindex',
  standalone: true,
  imports: [TTCComponent, TTCResultComponent],
  templateUrl: './tccindex.component.html',
  styleUrl: './tccindex.component.css'
})
export class TccindexComponent {

}
