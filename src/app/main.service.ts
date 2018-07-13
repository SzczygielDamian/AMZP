import { Injectable } from '@angular/core';
import { Http  , Headers, Response, RequestOptions} from '@angular/http';
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable()
export class MainService {
  private baseUrl = 'http://localhost:3000/api';
  public token: string;

  constructor(private http: Http) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  getUsers() {
    return this.http.get(`${this.baseUrl}/users`)
      .toPromise()
      .then(response => response.json());
  }

  getMachines() {
    return this.http.get(`${this.baseUrl}/machines`)
      .toPromise()
      .then(response => response.json());
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/deleteUser/${id}`)
      .toPromise()
      .then(response => response.json());
  }

  deleteUserWorkplace(id: number) {
    return this.http.delete(`${this.baseUrl}/deleteUserWorkplace/${id}`)
      .toPromise()
      .then(response => response.json());
  }

  addUser( Imie: string, Nazwisko: string, Stanowisko: string, haslo: string, email: string) {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('Imie', Imie);
    urlSearchParams.append('Nazwisko', Nazwisko);
    urlSearchParams.append('Stanowisko', Stanowisko);
    urlSearchParams.append('haslo',  Md5.hashStr(haslo).toString());
    urlSearchParams.append('email', email);
    const body = urlSearchParams.toString();
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.baseUrl}/newUser`, body, options)
      .toPromise()
      .then(response => response.json());
  }

  addUserWorkplace( pracownik: number, nazwa_maszyny: string) {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('pracownik_id_pracownika', pracownik.toString());
    urlSearchParams.append('nazwa_maszyny', nazwa_maszyny.toString());
    const body = urlSearchParams.toString();
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.baseUrl}/newUserWorkplace`, body, options)
      .toPromise()
      .then(response => response.json());
  }

  updateUser(id_pracownika: number, Imie: string, Nazwisko: string, Stanowisko: string, haslo: string, email: string) {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id_pracownika', id_pracownika.toString());
    urlSearchParams.append('Imie', Imie);
    urlSearchParams.append('Nazwisko', Nazwisko);
    urlSearchParams.append('Stanowisko', Stanowisko);
    urlSearchParams.append('haslo', Md5.hashStr(haslo).toString());
    urlSearchParams.append('email', email);
    const body = urlSearchParams.toString();
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const options = new RequestOptions({ headers: headers });
    return this.http.put(`${this.baseUrl}/user`, body, options)
      .toPromise()
      .then(response => response.json());
  }
  UpdateUserWorkplace(id_stanowiska: number, pracownik: number, nazwa_maszyny: string) {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id_stanowiska', id_stanowiska.toString());
    urlSearchParams.append('pracownik_id_pracownika', pracownik.toString());
    urlSearchParams.append('nazwa_maszyny', nazwa_maszyny);
    const body = urlSearchParams.toString();
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const options = new RequestOptions({ headers: headers });
    return this.http.put(`${this.baseUrl}/UserWorkplace`, body, options)
      .toPromise()
      .then(response => response.json());
  }
  gethalfProducts() {
    return this.http.get(`${this.baseUrl}/halfProducts`)
      .toPromise()
      .then(response => response.json());
  }
  getviewOfOrder() {
    return this.http.get(`${this.baseUrl}/viewOfOrder`)
      .toPromise()
      .then(response => response.json());
  }
  addOrder( pracownik: number, produkt: number, model_produktu: number, ilosc_zamowienia: string, data_zamowienia: string, data_realizacji: string, fileName: string) {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('pracownik_id_pracownika', pracownik.toString());
    urlSearchParams.append( 'produkt_id_produktu', produkt.toString());
    urlSearchParams.append('model_produktu_id_modelu', model_produktu.toString());
    urlSearchParams.append('ilosc_zamowienia', ilosc_zamowienia);
    urlSearchParams.append('data_zamowienia', data_zamowienia);
    urlSearchParams.append('data_realizacji', data_realizacji);
    urlSearchParams.append('filename', fileName);
    const body = urlSearchParams.toString();
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.baseUrl}/newOrder`, body, options)
      .toPromise()
      .then(response => response.json());
  }
  getproductionStage() {
    return this.http.get(`${this.baseUrl}/productionStage`)
      .toPromise()
      .then(response => response.json());
  }
  addProductionStage( stanowisko: number, nazwa_etapu: string) {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('stanowisko_id_stanowiska', stanowisko.toString());
    urlSearchParams.append('nazwa_etapu', nazwa_etapu);
    const body = urlSearchParams.toString();
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.baseUrl}/newProductionStage`, body, options)
      .toPromise()
      .then(response => response.json());
  }
  getconsumptionOfIntermediates() {
    return this.http.get(`${this.baseUrl}/consumptionOfIntermediates`)
      .toPromise()
      .then(response => response.json());
  }
  addNewProductConsumption ( polprodukty: number, model_produktu: number, Zuzycie: string) {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('Polprodukty_id_polproduktu', polprodukty.toString());
    urlSearchParams.append('model_produktu_id_modelu', model_produktu.toString());
    urlSearchParams.append('Zuzycie', Zuzycie);
    const body = urlSearchParams.toString();
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.baseUrl}/newProductConsumption`, body, options)
      .toPromise()
      .then(response => response.json());
  }
  deleteCOfI( Produkt_id_produktu: number, Polprodukt_id_polproduktu: number) {
    const urlSearchParams = new URLSearchParams();
    console.log(Produkt_id_produktu, Polprodukt_id_polproduktu);
    urlSearchParams.append('Produkt_id_produktu', Produkt_id_produktu.toString());
    urlSearchParams.append('Polprodukty_id_polproduktu', Polprodukt_id_polproduktu.toString());
    const body = urlSearchParams.toString();
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.baseUrl}/deleteConsumptionOfIntermediates`,  body, options)
      .toPromise()
      .then(response => response.json());
  }
  login(email: string, haslo: string) {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('email', email);
    urlSearchParams.append('haslo', Md5.hashStr(haslo).toString());
    const body = urlSearchParams.toString();
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.baseUrl}/login`, body, options)
      .toPromise()
      .then(response => response.json());
  }
  getUser(id) {
    return this.http.get(`${this.baseUrl}/users/${id}`)
      .toPromise()
      .then(response => response.json());
  }
  getwarehouse() {
    return this.http.get(`${this.baseUrl}/warehouse`)
      .toPromise()
      .then(response => response.json());
  }
  UpdatewarehouseTaking(id_produktu_magazynu: number, stan_w_magazynie: number, pracownik: number) {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id_produktu_magazynu', id_produktu_magazynu.toString());
    urlSearchParams.append('stan_w_magazynie', stan_w_magazynie.toString());
    urlSearchParams.append('pracownik_id_pracownika', pracownik.toString());
    const body = urlSearchParams.toString();
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const options = new RequestOptions({ headers: headers });
    return this.http.put(`${this.baseUrl}/warehouseTaking`, body, options)
      .toPromise()
      .then(response => response.json());
  }
  UpdatewarehouseTakingAdd(id_produktu_magazynu: number, data_godzina_wprowadzenia: string, stan_w_magazynie: number, pracownik: number, id_produkcji: number, etap_produkcji_id_etapu_produkcji: number) {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id_produktu_magazynu', id_produktu_magazynu.toString());
    urlSearchParams.append('data_godzina_wprowadzenia', data_godzina_wprowadzenia);
    urlSearchParams.append('stan_w_magazynie', stan_w_magazynie.toString());
    urlSearchParams.append('pracownik_id_pracownika', pracownik.toString());
    urlSearchParams.append('id_produkcji', id_produkcji.toString());
    urlSearchParams.append('etap_produkcji_id_etapu_produkcji', etap_produkcji_id_etapu_produkcji.toString());
    const body = urlSearchParams.toString();
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const options = new RequestOptions({ headers: headers });
    return this.http.put(`${this.baseUrl}/warehouseTakingAdd`, body, options)
      .toPromise()
      .then(response => response.json());
  }
  getproductionResults() {
    return this.http.get(`${this.baseUrl}/productionResults`)
      .toPromise()
      .then(response => response.json());
  }
  AddproductionResults ( produkcja: number, data_wyprodukowania: string, id_produktu_magazynu: number) {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('produkcja_id_produkcji', produkcja.toString());
    urlSearchParams.append('data_wyprodukowania', data_wyprodukowania);
    urlSearchParams.append('id_produktu_magazynu', id_produktu_magazynu.toString());
    const body = urlSearchParams.toString();
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.baseUrl}/AddproductionResults`, body, options)
      .toPromise()
      .then(response => response.json());
  }
  AddnewHalfProducts ( nazwa_polproduktu: string, typ_polproduktu: string, ilosc_polproduktu: string) {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('nazwa_polproduktu', nazwa_polproduktu);
    urlSearchParams.append('typ_polproduktu', typ_polproduktu);
    urlSearchParams.append('ilosc_polproduktu', ilosc_polproduktu);
    const body = urlSearchParams.toString();
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.baseUrl}/AddnewHalfProducts`, body, options)
      .toPromise()
      .then(response => response.json());
  }
  UpdateHalfProduct(id_stanu: number, polprodukty: number, ilosc_polproduktu: string) {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id_stanu', id_stanu.toString());
    urlSearchParams.append('polprodukty_id_polproduktu', polprodukty.toString());
    urlSearchParams.append('ilosc_polproduktu', ilosc_polproduktu);
    const body = urlSearchParams.toString();
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const options = new RequestOptions({ headers: headers });
    return this.http.put(`${this.baseUrl}/EditHalfProducts`, body, options)
      .toPromise()
      .then(response => response.json());
  }
  getTheResultOfTheProductionOfTables() {
    return this.http.get(`${this.baseUrl}/theResultOfTheProductionOfTables`)
      .toPromise()
      .then(response => response.json());
  }
  getTheResultOfTheProductionOfModelTables() {
    return this.http.get(`${this.baseUrl}/theResultOfTheProductionOfModelTables`)
      .toPromise()
      .then(response => response.json());
  }
  getTheResultOfTheProductionOfModelTable() {
    return this.http.get(`${this.baseUrl}/theResultOfTheProductionOfModelTable`)
      .toPromise()
      .then(response => response.json());
  }
  getproducts() {
    return this.http.get(`${this.baseUrl}/products`)
      .toPromise()
      .then(response => response.json());
  }
  AddProduct ( nazwa_produktu: string) {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('nazwa_produktu', nazwa_produktu);
    const body = urlSearchParams.toString();
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.baseUrl}/newProduct`, body, options)
      .toPromise()
      .then(response => response.json());
  }
  AddProductsModel ( produkt: number, nazwa_modelu: string) {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('produkt_id_produktu', produkt.toString());
    urlSearchParams.append('nazwa_modelu', nazwa_modelu);
    const body = urlSearchParams.toString();
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.baseUrl}/newProductsModel`, body, options)
      .toPromise()
      .then(response => response.json());
  }
  getProductsModel() {
    return this.http.get(`${this.baseUrl}/productsModel`)
      .toPromise()
      .then(response => response.json());
  }
  getProductTable() {
    return this.http.get(`${this.baseUrl}/productTable`)
      .toPromise()
      .then(response => response.json());
  }
  getProductTab() {
    return this.http.get(`${this.baseUrl}/productTab`)
      .toPromise()
      .then(response => response.json());
  }
  getTransferOfTheOrder() {
    return this.http.get(`${this.baseUrl}/transferOfTheOrder`)
      .toPromise()
      .then(response => response.json());
  }
  AddTransferOfTheOrder(przekazanie_zamowienia_do_produkcji: number, etap_produkcji: number, id_przekazania_zamowienia: number, ilosc: number, data_godzina_wprowadzenia: string, stan_w_magazynie: number, pracownik: number) {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('przekazanie_zamowienia_do_produkcji_id_przekazania_zamowienia', przekazanie_zamowienia_do_produkcji.toString());
    urlSearchParams.append('etap_produkcji_id_etapu_produkcji', etap_produkcji.toString());
    urlSearchParams.append('id_przekazania_zamowienia', id_przekazania_zamowienia.toString());
    urlSearchParams.append('ilosc', ilosc.toString());
    urlSearchParams.append('data_godzina_wprowadzenia', data_godzina_wprowadzenia);
    urlSearchParams.append('stan_w_magazynie', stan_w_magazynie.toString());
    urlSearchParams.append('pracownik_id_pracownika', pracownik.toString());
    const body = urlSearchParams.toString();
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const options = new RequestOptions({ headers: headers });
    return this.http.put(`${this.baseUrl}/AddTransferOfTheOrder`, body, options)
      .toPromise()
      .then(response => response.json());
  }
}
