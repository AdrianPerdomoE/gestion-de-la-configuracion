import { Product } from "./Product";

export class KartItem {
  constructor(public product: Product, public amount: number,public storeName: string) {}
}
