import { Component, OnInit } from '@angular/core';
import { MainService } from "../main.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  public href: string = "";
  transferOfTheOrder = [];
  model: any = [];
  newTransferOfTheOrderAlert = '';
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  mobWidth: any;
  constructor(private router: Router, private mainService: MainService) {
    this.getTransferOfTheOrder();
    this.mobWidth = (window.screen.width);
  }

  ngOnInit() {
    this.href = this.router.url;
    console.log(this.router.url);
  }

  getTransferOfTheOrder() {
    this.mainService.getTransferOfTheOrder()
      .then(response => this.transferOfTheOrder = response.transferOfTheOrder)
      .catch(error => console.log(error));
  }
  AddTransferOfTheOrder(record) {
    let dateFormat = require('dateformat');
    const data_godzina_wprowadzenia = new Date ();
    let datwpr = dateFormat(data_godzina_wprowadzenia, 'yyyy-mm-dd HH:MM:ss');
    this.mainService.AddTransferOfTheOrder(
      record.id_przekazania_zamowienia,
     0,
      record.id_przekazania_zamowienia,
      record.ilosc - 1,
      datwpr.toString(),
      1,
      this.currentUser.id
    )
      .then(response => {
        this.newTransferOfTheOrderAlert = response.Message;
        this.model.id_przekazania_zamowienia =  '';
        this.model.etap_produkcji = '';
        this.model.id_przekazania_zamowienia = null;
        this.model.ilosc = '';
        this.model.data_godzina_wprowadzenia = '';
        this.model.stan_w_magazynie = '';
        this.model.pracownik = '';
        this.getTransferOfTheOrder();
      })
      .catch(error => console.log(error)); }
}
