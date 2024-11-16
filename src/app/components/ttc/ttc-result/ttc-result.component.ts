import { Component, computed } from '@angular/core';
import { TTCService } from 'src/app/services/ttc.service';

@Component({
  selector: 'app-ttc-result',
  standalone: true,
  templateUrl: './ttc-result.component.html',
  styleUrl: './ttc-result.component.css',
})
export class TTCResultComponent {
  constructor(private ttc: TTCService) {}

  prixHT = this.ttc.get('prixHT');
  quantite = this.ttc.get('quantite');
  tva = this.ttc.get('tva');
  discount = computed(() =>
    this.quantite() > 15
      ? 30
      : this.quantite() >= 10 && this.quantite() <= 15
      ? 20
      : 0
  );

  prixUnitaire = computed(() => this.prixHT() + this.tva());

  prixTotal = computed(
    () => this.prixUnitaire() * this.quantite() * (1 - this.discount() / 100)
  );
}
