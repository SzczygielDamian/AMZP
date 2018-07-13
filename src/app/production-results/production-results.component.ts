import { Component, OnInit, ElementRef } from '@angular/core';
import { ViewChild} from '@angular/core';
import { MainService} from "../main.service";
declare let google: any;
import * as jsPDF from 'jspdf'

@Component({
  selector: 'app-production-results',
  templateUrl: './production-results.component.html',
  styleUrls: ['./production-results.component.css']
})
export class ProductionResultsComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  productionResults = [];
  theResultOfTheProductionOfTables = [];
  theResultOfTheProductionOfTablesData = [];
  theResultOfTheProductionOfModelTables = [];
  theResultOfTheProductionOfModelTablesData = [];
  theResultOfTheProductionOfModelTable = [];
  theResultOfTheProductionOfModelTableData = [];

  @ViewChild('content') content: ElementRef ;

  reportPDF: any = [];
  reportPDFResult: any = [];


  constructor(private mainService: MainService) {
    google.charts.load('current', {'packages': ['bar']});
    google.charts.load('current', {'packages': ['corechart']});
  }

  ngOnInit() {
    this.getproductionResults();
    google.charts.setOnLoadCallback(this.theResultOfTheProductionOfTablesChart.bind(this));
    google.charts.setOnLoadCallback(this.theResultOfTheProductionOfModelTablesChart.bind(this));
    google.charts.setOnLoadCallback(this.theResultOfTheProductionOfModelTableChart.bind(this));
  }

  getproductionResults() {
    this.mainService.getproductionResults()
      .then(response => this.productionResults = response.productionResults)
      .catch(error => console.log(error));
  }

  generatePDF(record) {
    this.reportPDF = record;
    this.mainService.getproductionResults()
      .then(response => {
        this.reportPDFResult = response.productionResults;
      })
      .catch(error => console.log(error));


    setTimeout(() => {
      const doc = new jsPDF('p', 'mm', 'a4');

      const specialElementHandlers = {
        '#editor': function (element, renderer) {
          return true;
        }
      };

      const content = this.content.nativeElement;


      doc.setFont('ZapfDingbats');

      doc.fromHTML(content.innerHTML, 15, 15, {
        'width': 190,
        'elementsHandlers': specialElementHandlers
      });

      doc.save('Raport_produkcji.pdf');
    }, 1000);
  }

  theResultOfTheProductionOfTablesChart() {
    this.mainService.getTheResultOfTheProductionOfTables()
      .then(response => this.theResultOfTheProductionOfTables = response.data)
      .then(() => {
        this.theResultOfTheProductionOfTables.forEach((item) => {
          this.theResultOfTheProductionOfTablesData.push([item.nazwa_produktu, item.Ilosc_zamowien_produktu]);
        });
      })
      .then(() => {
        const data = google.visualization.arrayToDataTable([
          ['zamowienie', ''],
          ...this.theResultOfTheProductionOfTablesData
        ]);
        chart.draw(data, options);
      })
      .catch(error => console.log(error));

    const options = {
      title: 'Najczęściej zamiawiane produkty',
      height: 300,
    };

    const chart = new google.visualization.PieChart(document.getElementById('theResultOfTheProductionOfTablesChart'));
  }

  theResultOfTheProductionOfModelTablesChart() {
    this.mainService.getTheResultOfTheProductionOfModelTables()
      .then(response => this.theResultOfTheProductionOfModelTables = response.data)
      .then(() => {
        this.theResultOfTheProductionOfModelTables.forEach((item) => {
          this.theResultOfTheProductionOfModelTablesData.push([item.nazwa_modelu, item.Ilosc_zamowien_modelu]);
        });
      })
      .then(() => {
        const data = google.visualization.arrayToDataTable([
          ['zamowienie', ''],
          ...this.theResultOfTheProductionOfModelTablesData
        ]);
        chart.draw(data, options);
      })
      .catch(error => console.log(error));

    const options = {
      title: 'Najczęściej zamiawiane modele stołów',
      height: 300,
    };

    const chart = new google.visualization.PieChart(document.getElementById('theResultOfTheProductionOfModelTablesChart'));
  }

  theResultOfTheProductionOfModelTableChart() {
    this.mainService.getTheResultOfTheProductionOfModelTable()
      .then(response => this.theResultOfTheProductionOfModelTable = response.data)
      .then(() => {
        this.theResultOfTheProductionOfModelTable.forEach((item) => {
          this.theResultOfTheProductionOfModelTableData.push([item.nazwa_modelu, item.Ilosc_zamowien_modelu]);
        });
      })
      .then(() => {
        const data = google.visualization.arrayToDataTable([
          ['zamowienie', ''],
          ...this.theResultOfTheProductionOfModelTableData
        ]);
        chart.draw(data, options);
      })
      .catch(error => console.log(error));

    const options = {
      title: 'Najczęściej zamiawiane modele stolików',
      height: 300,
    };

    const chart = new google.visualization.PieChart(document.getElementById('theResultOfTheProductionOfModelTableChart'));
  }

}
