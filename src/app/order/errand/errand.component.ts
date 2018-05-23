import {Component, Input, OnInit} from '@angular/core';
import { MainService } from "../../main.service";


@Component({
  selector: 'app-errand',
  templateUrl: './errand.component.html',
  styleUrls: ['./errand.component.css']
})

export class ErrandComponent implements OnInit {
  viewOfOrder = [];
  newOrderAlert = '';
  model: any = [];
  product = [];
  today: string;
  user: any = [];
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private mainService: MainService) {
  this.getviewOfOrder();
  this.getproduct();
  this.today = new Date().toISOString().split('T')[0];
  }

  ngOnInit() {
  }

  getviewOfOrder() {
    this.mainService.getviewOfOrder()
      .then(response => this.viewOfOrder = response.viewOfOrder)
      .catch(error => console.log(error));
  }
  getproduct() {
    this.mainService.getproduct()
      .then(response => this.product = response.product)
      .catch(error => console.log(error));
  }
  addOrder(record) {
    console.log(record);
      let dateFormat = require('dateformat');
      const data_zamowienia = new Date();
      let datazam = dateFormat(data_zamowienia, 'yyyy-mm-dd');
      const data_godzina_wprowadzenia = new Date ();
      let datwpr = dateFormat(data_godzina_wprowadzenia, 'yyyy-mm-dd HH:MM:ss')


      this.mainService.addOrder(
        this.currentUser.id,
        this.model.produkt,
        this.model.nazwa_zamowienia,
        this.model.ilosc_zamowienia,
        datazam.toString(),
        this.model.data_realizacji,
        0,
        this.model.proces_technologiczny,
        datwpr.toString(),
        1
      )
        .then(response => {
          this.newOrderAlert = response.Message;
          this.model.pracownik =  '';
          this.model.produkt = '';
          this.model.nazwa_zamowienia = '';
          this.model.ilosc_zamowienia =  '';
          this.model.data_zamowienia =  '';
          this.model.data_realizacji =  '';
          this.model.etap_produkcji = '';
          this.model.proces_technologiczny = '';
          this.model.data_godzina_wprowadzenia = '';
          this.model.stan_w_magazynie = '';
          this.getviewOfOrder();
        })
        .catch(error => console.log(error));}
}
