import { Component } from '@angular/core';
import { StoreData } from 'src/app/ViewModels/store-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  storeInfo: StoreData;
  isImageShowen: boolean = true;
  constructor() {
    this.storeInfo = new StoreData(
      'Iti Store',
      'https://picsum.photos/200/200',
      ['Cairo', 'Giza']
    );
  }
  ngOnInit(): void {}
  toggleImage() {
    this.isImageShowen = !this.isImageShowen;
  }
}
