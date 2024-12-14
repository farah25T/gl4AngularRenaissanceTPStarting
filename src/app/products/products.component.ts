import { Component } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  concatMap,
  map,
  takeWhile,
  scan,
  switchMap,
} from 'rxjs';
import { Product } from './dto/product.dto';
import { ProductService } from './services/product.service';
import { Settings } from './dto/product-settings.dto';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products$!: Observable<Product[]>;
  canFetchMore = true;
  settings$ = new BehaviorSubject<Settings>({
    limit: 12,
    skip: 0,
  });

  constructor(private productService: ProductService) {
    this.products$ = this.settings$.pipe(
      takeWhile(() => this.canFetchMore),
      switchMap((x) =>
        this.productService.getProducts(x).pipe(
          map((y) => {
            this.canFetchMore = y.skip + y.limit < y.total;
            return y.products;
          })
        )
      ),
      scan(
        (allProducts, newProducts) => [...allProducts, ...newProducts],
        [] as Product[]
      )
    );
  }

  addMoreProducts() {
    if (this.canFetchMore) {
      const currentSettings = this.settings$.value;
      this.settings$.next({ limit: 12, skip: currentSettings.skip + 12 });
    }
  }
}
