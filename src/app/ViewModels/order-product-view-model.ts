import { ICategory } from '../Models/icategory';

export class OrderProductViewModel {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public quantityToAdd: number,
    public catId: number,
    public imgUrl?: string,
    public categoryName?: string
  ) {}
}
