import { Component, OnInit } from '@angular/core';
import { MainService} from "../main.service";

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {
  warehouse = [];
  model: any = [];
  warehouseAlert = '';
  newProductionResultsAlert = [];
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  tableModel: any = [];
  isAnyStateZero = false;
  constructor(private mainService: MainService) { }

  ngOnInit() {
    this.getwarehouse();
  }

  getwarehouse() {
    this.mainService.getwarehouse()
      .then(response => this.warehouse = response.warehouse)
      .catch(error => console.log(error));
  }

  UpdatewarehouseTaking(record) {
      this.mainService.UpdatewarehouseTaking(
        record.id_produktu_magazynu,
        0,
        this.currentUser.id
      )
        .then(response => {
          this.warehouseAlert = response.Message;
          this.model.id_produktu_magazynu = null;
          this.model.stan_w_magazynie = '';
          this.model.pracownik =  '';
          this.getwarehouse();
        })
        .catch(error => console.log(error));
  }

  UpdatewarehouseTakingAdd(record) {
    let dateFormat = require('dateformat');
    const data_godzina_wprowadzenia = new Date();
    let datazam = dateFormat(data_godzina_wprowadzenia, 'yyyy-mm-dd HH:MM:ss');


    this.mainService.UpdatewarehouseTakingAdd(
      record.id_produktu_magazynu,
      datazam.toString(),
      1,
      this.currentUser.id,
      record.id_produkcji,
      record.etap_produkcji_id_etapu_produkcji + 1
    )
      .then(response => {
        this.warehouseAlert = response.Message;
        this.model.id_produktu_magazynu = null;
        this.model.data_godzina_wprowadzenia = '';
        this.model.stan_w_magazynie = '';
        this.model.pracownik =  '';
        this.model.id_produkcji = null;
        this.model.etap_produkcji_id_etapu_produkcji = '';
        this.getwarehouse();
        this.onClick();
      })
      .catch(error => console.log(error));
  }

  isWorkButtonDisabled() {
   this.warehouse.forEach((item) => {
     if (item.stan_w_magazynie === 0) {
       this.isAnyStateZero = true;
     }
   });
   return this.isAnyStateZero;
  }

  AddproductionResults(record) {
    console.log(record);
    let dateFormat = require('dateformat');
    const data_zamowienia = new Date();
    let datawyp = dateFormat(data_zamowienia, 'yyyy-mm-dd');
    const  datawypr = datawyp.toString();
    this.mainService.AddproductionResults(
      record.id_produkcji,
      datawypr,
      record.id_produktu_magazynu
    )
      .then(response => {
        this.newProductionResultsAlert = response.Message;
        this.model.id_produkcji =  '';
        this.model.data_wyprodukowania = '';
        this.model.id_produktu_magazynu = '';
        this.getwarehouse();
      })
      .catch(error => console.log(error)); }

      showTechnologicalProcess(table) {
    this.tableModel.filename = table.filename;
      }

  onClick(): void {
    window.location.reload();
  }
}
