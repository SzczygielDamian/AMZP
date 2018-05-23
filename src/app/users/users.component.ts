import { Component, OnInit } from '@angular/core';
import { MainService } from "../main.service";
import {location} from "@angular/platform-browser/src/facade/browser";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  users = [];
  user: any = [];
  newUserAlert = '';
  deleteAlert = '';
  model: any = {};


  constructor(private mainService: MainService) {
    this.getUsers();
    this.mainService.getUser(this.currentUser.id)
      .then(response => this.user = response.user[0])
      .catch(error => console.log(error));
  }
  ngOnInit() {
  }
  getUsers() {
    this.mainService.getUsers()
      .then(response => this.users = response.users)
      .catch(error => console.log(error));
  }
  deleteUser(id) {
    this.mainService.deleteUser(id)
      .then(response => {
        this.deleteAlert = response.Message;
        this.getUsers();
      })
      .catch(error => console.log(error));
  }
  addUser() {
    if (this.model.id_pracownika) {
      this.mainService.updateUser(
        this.model.id_pracownika,
        this.model.Imie,
        this.model.Nazwisko,
        this.model.Stanowisko,
        this.model.haslo,
        this.model.email)
        .then(response => {
          this.newUserAlert = response.Message;
          this.model.id_pracownika = null;
          this.model.Imie = '';
          this.model.Nazwisko = '';
          this.model.Stanowisko = '';
          this.model.haslo = '';
          this.model.email = '';
          this.getUsers();
        })
    }else {
      this.mainService.addUser(
      this.model.Imie,
      this.model.Nazwisko,
      this.model.Stanowisko,
      this.model.haslo,
      this.model.email)
      .then(response => {
        this.newUserAlert = response.Message;
        this.model.Imie =  '';
        this.model.Nazwisko = '';
        this.model.Stanowisko =  '';
        this.model.haslo =  '';
        this.model.email =  '';
        this.getUsers();
      })
      .catch(error => console.log(error));}

  }
  editUser(user) {
    this.model = {
      id_pracownika: user.id_pracownika,
      Imie: user.Imie,
      Nazwisko: user.Nazwisko,
      Stanowisko: user.Stanowisko,
      email: user.email,
      haslo: user.haslo
    };
  }
  onClick(): void {
    window.location.reload();
  }
}
