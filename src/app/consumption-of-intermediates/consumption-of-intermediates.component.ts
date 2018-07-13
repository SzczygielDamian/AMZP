import { Component, OnInit } from '@angular/core';
import { MainService} from "../main.service";

@Component({
  selector: 'app-consumption-of-intermediates',
  templateUrl: './consumption-of-intermediates.component.html',
  styleUrls: ['./consumption-of-intermediates.component.css']
})
export class ConsumptionOfIntermediatesComponent implements OnInit {
  productsModel = [];
  halfProducts = [];
  consumptionOfIntermediates = [];
  newProductConsumptionAlert =  '';
  deleteAlert = '';
  model: any = {};
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private mainService: MainService) {
  this.getProductsModel();
  this.gethalfProducts();
  this.getconsumptionOfIntermediates();
  }

  ngOnInit() {
  }

  getProductsModel() {
    this.mainService.getProductsModel()
      .then(response => this.productsModel = response.productsModel)
      .catch(error => console.log(error));
  }
  gethalfProducts() {
    this.mainService.gethalfProducts()
      .then(response => this.halfProducts = response.halfProducts)
      .catch(error => console.log(error));
  }
  getconsumptionOfIntermediates() {
    this.mainService.getconsumptionOfIntermediates()
      .then(response => this.consumptionOfIntermediates = response.consumptionOfIntermediates)
      .catch( error => console.log(error));
  }
  addNewProductConsumption() {
    this.mainService.addNewProductConsumption(
      this.model.polprodukty,
      this.model.model_produktu,
      this.model.Zuzycie
     )
      .then(response => {
        this.newProductConsumptionAlert = response.Message;
        this.model.polprodukty =  '';
        this.model.model_produktu = '';
        this.model.Zuzycie = '';
        this.getconsumptionOfIntermediates();
      })
      .catch(error => console.log(error));}

  deleteCOfI(cOi) {
    console.log(cOi);
    this.mainService.deleteCOfI(cOi.Produkt_id_produktu, cOi.Polprodukty_id_polproduktu)
      .then(response => {
        this.deleteAlert = response.Message;
        this.getconsumptionOfIntermediates();
      })
      .catch(error => console.log(error));
  }

}
