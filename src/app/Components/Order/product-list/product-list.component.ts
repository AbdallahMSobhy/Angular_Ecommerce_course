import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ICategory } from 'src/app/Models/icategory';
import { IProduct } from 'src/app/Models/iproduct';
import { OrderProductViewModel } from 'src/app/ViewModels/order-product-view-model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnChanges {
  prodList: IProduct[];
  prodListOfCat: IProduct[] = [];
  totalcartprice: number = 0;
  producttoadd!: OrderProductViewModel;
  @Input() sentCatId: number = 0;
  @Input() sentSearchInput: string = '';
  @Output() totalpriceChanged: EventEmitter<number>;
  @Output() productAdded: EventEmitter<OrderProductViewModel>;
  constructor() {
    this.totalpriceChanged = new EventEmitter<number>();
    this.productAdded = new EventEmitter<OrderProductViewModel>();
    this.prodList = [
      {
        id: 100,
        name: 'Lenovo Thinkpad Laptop',
        price: 100,
        quantity: 1,
        imgUrl: 'https://picsum.photos/200/200',
        categoryId: 1,
      },
      {
        id: 200,
        name: 'Apple Mac Laptop',
        price: 200,
        quantity: 0,
        imgUrl: 'https://picsum.photos/200/200',
        categoryId: 1,
      },
      {
        id: 300,
        name: 'Lenovo Tap 2',
        price: 300,
        quantity: 10,
        imgUrl: 'https://picsum.photos/200/200',
        categoryId: 2,
      },
      {
        id: 400,
        name: 'Samsung Tap',
        price: 400,
        quantity: 2,
        imgUrl: 'https://picsum.photos/200/200',
        categoryId: 2,
      },
      {
        id: 500,
        name: 'Samsung Note 10',
        price: 500,
        quantity: 0,
        imgUrl: 'https://picsum.photos/200/200',
        categoryId: 3,
      },
      {
        id: 600,
        name: 'Samsung S22 Ultra ',
        price: 600,
        quantity: 1,
        imgUrl: 'https://picsum.photos/200/200',
        categoryId: 3,
      },
    ];

    this.prodListOfCat = this.prodList;
  }
  // ngOnChanges(changes: SimpleChanges): void {
  ngOnChanges(): void {
    // if (changes['sentCatId']) {
    //   this.filterProductsByCatID();
    // }
    if (this.sentCatId != 0) {
      this.prodListOfCat = this.prodList.filter(
        (x) =>
          x.categoryId == this.sentCatId &&
          x.name
            .toLocaleLowerCase()
            .includes(this.sentSearchInput.toLocaleLowerCase())
      );
    } else {
      this.prodListOfCat = this.prodList.filter((x) =>
        x.name
          .toLocaleLowerCase()
          .includes(this.sentSearchInput.toLocaleLowerCase())
      );
    }
  }
  private filterProductsByCatID() {
    if (this.sentCatId == 0) {
      this.prodListOfCat = this.prodList;
    } else {
      this.prodListOfCat = this.prodList.filter(
        (prd) => prd.categoryId == this.sentCatId
      );
    }
  }
  ngOnInit(): void {}
  trackByPrdId(index: number, product: IProduct) {
    return product.id;
  }
  addToCart(prod: IProduct, Quntity: string) {
    this.totalcartprice += prod.price * +Quntity;
    //Excute Event of change
    this.totalpriceChanged.emit(this.totalcartprice);
    this.producttoadd = new OrderProductViewModel(
      prod.id,
      prod.name,
      prod.price,
      +Quntity,
      prod.categoryId,
      prod.imgUrl
    );
    this.productAdded.emit(this.producttoadd);
  }
  // addToCart(price: number, Quntity: string) {
  //   this.totalcartprice += price * +Quntity;
  //   //Excute Event of change
  //   this, this.totalpriceChanged.emit(this.totalcartprice);
  // }
}
