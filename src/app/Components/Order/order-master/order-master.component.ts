import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ICategory } from 'src/app/Models/icategory';
import { OrderProductViewModel } from 'src/app/ViewModels/order-product-view-model';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-order-master',
  templateUrl: './order-master.component.html',
  styleUrls: ['./order-master.component.scss'],
})
export class OrderMasterComponent implements OnInit, AfterViewInit {
  catList: ICategory[];
  selectedCatId: number = 0;
  searchInput: string = '';
  recivedtotalcartprice: number = 0;
  productsoncart: OrderProductViewModel[] = [];
  @ViewChild('clinetNameInput') nameInput!: ElementRef;
  @ViewChild(ProductListComponent) productListComp!: ProductListComponent;
  constructor() {
    this.catList = [
      { id: 1, name: 'Laptop' },
      { id: 2, name: 'Taplets' },
      { id: 3, name: 'Mobiles' },
    ];
  }
  ngAfterViewInit(): void {
    this.nameInput.nativeElement.placeholder = 'Insert Product Name';
    this.nameInput.nativeElement.style.border = '2px solid red';
  }
  ngOnInit(): void {}
  OnTotalPriceChanges(totalprice: number) {
    this.recivedtotalcartprice = totalprice;
  }
  onProductAddedToCart(product: OrderProductViewModel) {
    if (!this.productsoncart.some((x) => x.id == product.id)) {
      product.categoryName = this.catList.find(
        (x) => x.id == product.catId
      )?.name;
      this.productsoncart.push(product);
    } else {
      const itemToUpdate = this.productsoncart.find((x) => x.id === product.id);
      if (itemToUpdate) {
        itemToUpdate.quantityToAdd += product.quantityToAdd;
      }
    }
  }
  checkOutCart() {
    for (let i = 0; i < this.productsoncart.length; i++) {
      const item = this.productsoncart[i];
      const foundProduct = this.productListComp.prodList.find(
        (x) => x.id === item.id
      );
      if (foundProduct) {
        foundProduct.quantity -= item.quantityToAdd;
      }
    }
    this.productsoncart = [];
  }
}
