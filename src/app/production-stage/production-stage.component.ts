import { Component, OnInit } from '@angular/core';
import  { MainService} from "../main.service";

@Component({
  selector: 'app-production-stage',
  templateUrl: './production-stage.component.html',
  styleUrls: ['./production-stage.component.css']
})
export class ProductionStageComponent implements OnInit {
  productionStage = [];
  newStageAlert = '';
  model: any = {};
  machines = [];
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private mainService: MainService) {
    this.getproductionStage();
    this.getMachines();
  }

  ngOnInit() {
  }

  getproductionStage(){
    this.mainService.getproductionStage()
      .then(response => this.productionStage = response.productionStage)
      .catch( error => console.log(error));
}

  addProductionStage() {
    this.mainService.addProductionStage(
      this.model.stanowisko,
      this.model.nazwa_etapu)
      .then(response => {
        this.newStageAlert = response.Message;
        this.model.stanowisko =  '';
        this.model.nazwa_etaapu = '';
        this.getproductionStage();
      })
      .catch(error => console.log(error));}

  getMachines() {
    this.mainService.getMachines()
      .then(response => this.machines = response.machines)
      .catch(error => console.log(error));
  }
}
