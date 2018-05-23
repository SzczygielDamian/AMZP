import { Component, OnInit } from '@angular/core';
import { MainService } from "../main.service";

@Component({
  selector: 'app-workplace',
  templateUrl: './workplace.component.html',
  styleUrls: ['./workplace.component.css']
})
export class WorkplaceComponent implements OnInit {
  users = [];
  machines = [];
  deleteAlert = [];
  newUserWorkplaceAlert = '';
  model: any = {};
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private mainService: MainService) {
    this.getUsers();
    this.getMachines();
  }
  ngOnInit() {
  }
  getUsers() {
    this.mainService.getUsers()
      .then(response => this.users = response.users)
      .catch(error => console.log(error));
  }
  getMachines() {
    this.mainService.getMachines()
      .then(response => this.machines = response.machines)
      .catch(error => console.log(error));
  }
  deleteUserWorkplace(id) {
    this.mainService.deleteUserWorkplace(id)
      .then(response => {
        this.deleteAlert = response.Message;
        this.getMachines();
      })
      .catch(error => console.log(error));
  }
  addUserWorkplace() {
    if (this.model.id_stanowiska){
      this.mainService.UpdateUserWorkplace(
        this.model.id_stanowiska,
        this.model.pracownik,
        this.model.nazwa_maszyny)
        .then(response => {
          this.newUserWorkplaceAlert = response.Message;
          this.model.id_stanowiska = null;
          this.model.pracownik = '';
          this.model.nazwa_maszyny = '';
          this.getUsers();
        })
        .catch(error => console.log(error));
    } else {
      this.mainService.addUserWorkplace(
      this.model.pracownik,
      this.model.nazwa_maszyny,)
      .then(response => {
        this.newUserWorkplaceAlert = response.Message;
        this.model.pracownik =  '';
        this.model.nazwa_maszyny = '';
        this.getMachines();
      })
      .catch(error => console.log(error));
    }}

  editUserWorkplace(UserWorkplace) {
    this.model = {
      id_stanowiska: UserWorkplace.id_stanowiska,
      pracownik: UserWorkplace.id_pracownika,
      nazwa_maszyny: UserWorkplace.nazwa_maszyny,
    };
  }
  onClick(): void {
    window.location.reload();
  }
}
