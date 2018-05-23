import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from "../main.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
model:any = {};
error = '';

constructor(private router: Router, private mainService: MainService ) { }

ngOnInit() {
  }

  login() {
    this.mainService.login(this.model.email, this.model.haslo)
      .then(response => {
        if (response.Error === true) {
          this.error = 'Niepoprawne hasło lub login';
        } else {
          this.error = '';
          localStorage.setItem('currentUser', JSON.stringify({
            Imie: response.user[0].Imie,
            Nazwisko: response.user[0].Nazwisko,
            id: response.user[0].id_pracownika ,
            Stanowisko: response.user[0].Stanowisko}));
          this.router.navigate(['/home']);
          location.reload();
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  onClick(): void {
    window.location.reload();
  }
}
