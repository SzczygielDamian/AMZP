import { Component, OnInit } from '@angular/core';
import { MainService } from "../main.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  public href: string = "";

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.href = this.router.url;
    console.log(this.router.url);
  }

}
