import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ResponseApi } from '../models/response.model';
import { constants } from '../../../constants/constants';
import { environment } from '../../../environments/environment';

/**
 * Products service
 *
 * @author gvivas on 2025/05/24
 * @version 1.0
 * @since 1.0.0
 */
@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   *
   * list all Products
   */
  getAll(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(
      `${constants.SERVICES.PRODUCT_SERVICES.APIV1.PATH}`
    );
  }

  /**
   *
   * create products
   * @param product
   */
  create(product: Product): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(
      `${constants.SERVICES.PRODUCT_SERVICES.APIV1.PATH}`,
      product
    );
  }

  /**
   *
   * update products
   * @param product
   * param id
   */
  update(id: string, product: Product): Observable<ResponseApi> {
    return this.http.put<ResponseApi>(
      `${constants.SERVICES.PRODUCT_SERVICES.APIV1.PATH}/${id}`,
      product
    );
  }

  /**
   *
   * delete products
   * @param id
   */
  delete(id: string): Observable<ResponseApi> {
    return this.http.delete<ResponseApi>(
      `${constants.SERVICES.PRODUCT_SERVICES.APIV1.PATH}${id}`
    );
  }

  /**
   *
   * check if product exist
   * @param id
   */
  checkIdExists(id: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${constants.SERVICES.PRODUCT_SERVICES.APIV1.PATH}${constants.SERVICES.PRODUCT_SERVICES.APIV1.CONTROLLERS.VERIFITCATION}${id}`
    );
  }
}
