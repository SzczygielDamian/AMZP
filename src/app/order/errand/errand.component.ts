import {Component, Input, OnInit, ElementRef} from '@angular/core';
import { MainService } from '../../main.service';
import {FileUploader} from 'ng2-file-upload/ng2-file-upload';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
const URL = 'http://81.26.6.25:3001/api/upload';

@Component({
  selector: 'app-errand',
  templateUrl: './errand.component.html',
  styleUrls: ['./errand.component.css']
})

export class ErrandComponent implements OnInit {
  viewOfOrder = [];
  productTable = [];
  productTab = [];
  products = [];
  transferOfTheOrder = [];
  newOrderAlert = '';
  model: any = [];
  productsModel = [];
  today: string;
  user: any = [];
  fileName: string;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  mobWidth: any;
  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  constructor(private mainService: MainService, private http: Http, private el: ElementRef) {
  this.getviewOfOrder();
  this.getProductsModel();
  this.getProductTable();
  this.getProductTab();
  this.getproducts();
  this.today = new Date().toISOString().split('T')[0];
  this.mobWidth = (window.screen.width);
  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
    };
  }
  upload(record) {
    const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    const fileCount: number = inputEl.files.length;
    const formData = new FormData();
    if (fileCount > 0) { // a file was selected
      formData.append('photo', inputEl.files.item(0));
      this.http
        .post(URL, formData).map((res: Response) => res.json()).subscribe(
        (success) => {
          this.fileName = success;
          this.addOrder(record);
        },
        (error) => alert(error))
    }
  }
  getviewOfOrder() {
    this.mainService.getviewOfOrder()
      .then(response => this.viewOfOrder = response.viewOfOrder)
      .catch(error => console.log(error));
  }
  getProductTable() {
    this.mainService. getProductTable()
      .then(response => this.productTable = response.productTable)
      .catch(error => console.log(error));
  }
  getProductTab() {
    this.mainService. getProductTab()
      .then(response => this.productTab = response.productTab)
      .catch(error => console.log(error));
  }
  getProductsModel() {
    this.mainService.getProductsModel()
      .then(response => this.productsModel = response.productsModel)
      .catch(error => console.log(error));
  }
  getproducts() {
    this.mainService.getproducts()
      .then(response => this.products = response.products)
      .catch(error => console.log(error));
  }
  addOrder(record) {
    console.log(record);
      let dateFormat = require('dateformat');
      const data_zamowienia = new Date();
      let datazam = dateFormat(data_zamowienia, 'yyyy-mm-dd');
      // const data_godzina_wprowadzenia = new Date ();
      // let datwpr = dateFormat(data_godzina_wprowadzenia, 'yyyy-mm-dd HH:MM:ss');

      this.mainService.addOrder(
        this.currentUser.id,
        this.model.produkt,
        this.model.model_produktu,
        this.model.ilosc_zamowienia,
        datazam.toString(),
        this.model.data_realizacji,
        this.fileName
      )
        .then(response => {
          this.newOrderAlert = response.Message;
          this.model.pracownik =  '';
          this.model.produkt = '';
          this.model.model_produktu = '';
          this.model.ilosc_zamowienia =  '';
          this.model.data_zamowienia =  '';
          this.model.data_realizacji =  '';
          this.model.filename = '';
          this.getviewOfOrder();
          this.onClick();
        })
        .catch(error => console.log(error)); }

  onClick(): void {
    window.location.reload();
  }


}
