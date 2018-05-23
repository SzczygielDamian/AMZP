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
  theResultOfTheProductionOfTablesInMayTables = [];
  theResultOfTheProductionOfTablesInMayTablesData = [];

  @ViewChild('content') content: ElementRef ;

  reportPDF: any = [];
  reportPDFResult: any =[];


  constructor(private mainService: MainService) {
    google.charts.load('current', {'packages': ['bar']});
    google.charts.load('current', {'packages': ['corechart']});
  }

  ngOnInit() {
    this.getproductionResults();
    google.charts.setOnLoadCallback(this.theResultOfTheProductionOfTablesChart.bind(this));
    google.charts.setOnLoadCallback(this.theResultOfTheProductionOfTablesInMayChart.bind(this));
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

  theResultOfTheProductionOfTablesInMayChart() {
    this.mainService.getTheResultOfTheProductionOfTablesInMay()
      .then(response => this.theResultOfTheProductionOfTablesInMayTables = response.data)
      .then(() => {
        this.theResultOfTheProductionOfTablesInMayTables.forEach((item) => {
          this.theResultOfTheProductionOfTablesInMayTablesData.push([item.nazwa_produktu, item.Ilosc_wyprodukowanych_modeli]);
        });
      })
      .then(() => {
        const data = google.visualization.arrayToDataTable([
          ['modele', ''],
          ...this.theResultOfTheProductionOfTablesInMayTablesData
        ]);
        chart.draw(data, options);
      })
      .catch(error => console.log(error));

    const options = {
      legend: { position: 'none' },
      chart: { title: 'Wynik produkcji w Maju' },
      bars: 'horizontal', // Required for Material Bar Charts.
      axes: {
        x: {
          0: { side: 'top', label: 'Wyniki produkcji'} // Top x-axis.
        }
      },
      height: 300,
      bar: { groupWidth: '90%' }
    };

    const chart = new google.charts.Bar(document.getElementById('theResultOfTheProductionOfTablesInMayChart'));
  }
  theResultOfTheProductionOfTablesChart() {
    this.mainService.getTheResultOfTheProductionOfTables()
      .then(response => this.theResultOfTheProductionOfTables = response.data)
      .then(() => {
        this.theResultOfTheProductionOfTables.forEach((item) => {
          this.theResultOfTheProductionOfTablesData.push([item.nazwa_produktu, item.Ilosc_zamowien_modelu]);
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
      title: 'Najczęściej zamiawiane modele stołów',
      height: 300,
    };

    const chart = new google.visualization.PieChart(document.getElementById('theResultOfTheProductionOfTablesChart'));
  }



}
