import { Component, OnInit } from '@angular/core';
import { MainService } from "../../main.service";

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {
  halfProducts = [];
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  model: any = {};
  newHalfProductsAlert = '';
  EditHalfProductsAlert = '';
  value = 0;

  constructor(private mainService: MainService) {
  this.gethalfProducts();

  }

  ngOnInit() {
  }

  gethalfProducts() {
    this.mainService.gethalfProducts()
      .then(response => this.halfProducts = response.halfProducts)
      .catch(error => console.log(error));
  }
  AddnewHalfProducts() {
    this.mainService.AddnewHalfProducts(
      this.model.nazwa_polproduktu,
      this.model.typ_polproduktu,
      this.model.ilosc_polproduktu)
      .then(response => {
        this.newHalfProductsAlert = response.Message;
        this.model.nazwa_polproduktu =  '';
        this.model.typ_polproduktu = '';
        this.model.ilosc_polproduktu = '';
        this.gethalfProducts();
      })
      .catch(error => console.log(error));}

  UpdateHalfProduct() {
    this.mainService.UpdateHalfProduct(
      this.model.id_stanu,
      this.model.polprodukty,
      this.model.ilosc_polproduktu + this.value)
      .then(response => {
        this.EditHalfProductsAlert = response.Message;
        this.model.id_stanu =  null;
        this.model.polprodukty = '';
        this.model.ilosc_polproduktu = '';
        this.gethalfProducts();
      })
      .catch(error => console.log(error));}


  onClick(): void {
    window.location.reload();
  }

  EditHalfProducts(halfProduct) {
    this.value = halfProduct.ilosc_polproduktu;
    this.model = {
      id_stanu: halfProduct.id_stanu,
      polprodukty: halfProduct.id_polproduktu,
      ilosc_polproduktu: 0,
    };
  }


}
