import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TTCResultComponent } from './ttc-result/ttc-result.component';
import { TTCService } from 'src/app/services/ttc.service';

@Component({
  selector: 'app-ttc',
  standalone: true,
  imports: [FormsModule, TTCResultComponent],
  templateUrl: './ttc.component.html',
  styleUrl: './ttc.component.css',
})
export class TTCComponent {
  onChangeTva(event: Event) {
    const newValue = +(event.target as HTMLInputElement).value;

    this.ttc.set('tva', newValue);
  }
  onchangequantite(event: Event) {
    const newValue = +(event.target as HTMLInputElement).value;

    this.ttc.set('quantite', newValue);
  }
  onchangeprix(event: Event) {
    const newValue = +(event.target as HTMLInputElement).value;

    this.ttc.set('prixHT', newValue);
  }
  constructor(private ttc: TTCService) {}
  prixHT = this.ttc.get('prixHT');
  quantite = this.ttc.get('quantite');
  tva = this.ttc.get('tva');
}
