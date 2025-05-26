import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Router } from '@angular/router';

/**
 * Navigation service
 *
 * @author gvivas
 * @version 1.0
 * @since 1.0.0
 */

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) {}

  /**
   * Redirect to form
   */
  goToAdd(product: Product | null): void {
    if (product !== null) {
      this.router.navigate(['/product/edit'], { state: { product } });
    } else {
      this.router.navigate(['/product']);
    }
  }
}
