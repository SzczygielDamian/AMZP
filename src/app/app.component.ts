import { Component } from '@angular/core';
import { AuthGuard} from './guard';
import { Router, NavigationStart} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  constructor(private authGuard: AuthGuard, router: Router) {
    router.events.forEach((event) => {
      this.currentUrl = this.authGuard.router.url;
      if (event instanceof NavigationStart) {
        this.canLook = this.authGuard.canActivate();
      }
    });
  }

  canLook = this.authGuard.canActivate();
  currentUrl = this.authGuard.router.url;
}
