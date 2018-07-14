import { Component, OnInit } from '@angular/core';
import { MainService } from "../main.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  products = [];
  productsModel = [];
  newProductAlert = '';
  newproductModelAlert= '';
  model: any = {};
  constructor(private mainService: MainService) {
    this.getproducts();
    this.getProductsModel();
  }

  ngOnInit() {
  }
  getproducts() {
    this.mainService.getproducts()
      .then(response => this.products = response.products)
      .catch(error => console.log(error));
  }
  getProductsModel() {
    this.mainService.getProductsModel()
      .then(response => this.productsModel = response.productsModel)
      .catch(error => console.log(error));
  }
  AddProduct() {
    this.mainService.AddProduct(
      this.model.nazwa_produktu)
      .then(response => {
        this.newProductAlert = response.Message;
        this.model.nazwa_produktu =  '';
        this.getproducts();
      })
      .catch(error => console.log(error));
  }
  AddProductsModel() {
    this.mainService.AddProductsModel(
      this.model.produkt,
      this.model.nazwa_modelu)
      .then(response => {
        this.newproductModelAlert = response.Message;
        this.model.produkt = '';
        this.model.nazwa_modelu =  '';
        this.getproducts();
      })
      .catch(error => console.log(error));
  }
  onClick(): void {
    window.location.reload();
  }

}
