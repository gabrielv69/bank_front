import { Product } from "./product.model";


/**
 * Interface for responses
 */

export interface ResponseApi {
  name: string;
  message: string;
  data: Product[];
}
