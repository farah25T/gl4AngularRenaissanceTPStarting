import { computed, Injectable, Signal, signal } from '@angular/core';
import { SignalService } from './signal.service';

export interface TTC {
  prixHT: number;
  quantite: number;
  tva: number;
}
@Injectable({
  providedIn: 'root',
})
export class TTCService extends SignalService<TTC> {
  constructor() {
    super({prixHT: 0, quantite: 1, tva: 18});
  }
}
