import { Component, OnInit } from '@angular/core';
import { MainService} from "../main.service";

@Component({
  selector: 'app-consumption-of-intermediates',
  templateUrl: './consumption-of-intermediates.component.html',
  styleUrls: ['./consumption-of-intermediates.component.css']
})
export class ConsumptionOfIntermediatesComponent implements OnInit {
  product = [];
  halfProducts = [];
  consumptionOfIntermediates = [];
  newProductConsumptionAlert =  '';
  deleteAlert = '';
  model: any = {};
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private mainService: MainService) {
  this.getproduct();
  this.gethalfProducts();
  this.getconsumptionOfIntermediates();
  }

  ngOnInit() {
  }

  getproduct() {
    this.mainService.getproduct()
      .then(response => this.product = response.product)
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
      this.model.produkt,
      this.model.Zuzycie
     )
      .then(response => {
        this.newProductConsumptionAlert = response.Message;
        this.model.polprodukty =  '';
        this.model.produkt = '';
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
