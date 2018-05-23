import { Component, OnInit } from '@angular/core';
import { MainService} from "../main.service";

@Component({
  selector: 'app-order-monitoring',
  templateUrl: './order-monitoring.component.html',
  styleUrls: ['./order-monitoring.component.css']
})
export class OrderMonitoringComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  warehouse  = [];

  constructor(private mainService: MainService) { }

  ngOnInit() {
    this.getwarehouse();
  }
  getwarehouse() {
    this.mainService.getwarehouse()
      .then(response => this.warehouse = response.warehouse)
      .catch(error => console.log(error));
  }
}
