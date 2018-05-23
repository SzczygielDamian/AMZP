import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from '@angular/common';
import {Injectable} from '@angular/core';

import { AuthGuard } from './guard';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { UsersComponent } from './users/users.component';
import { MainService } from "./main.service";
import { WorkplaceComponent } from './workplace/workplace.component';
import { ProvidersComponent } from './provider/providers/providers.component';
import { ErrandComponent } from './order/errand/errand.component';
import { ProductionStageComponent } from './production-stage/production-stage.component';
import { ConsumptionOfIntermediatesComponent } from './consumption-of-intermediates/consumption-of-intermediates.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { OrderMonitoringComponent } from './order-monitoring/order-monitoring.component';
import { InformationComponent } from './information/information.component';
import { ProductionResultsComponent } from './production-results/production-results.component';

@Injectable()
export class CustomLocationStrategy extends HashLocationStrategy {
  prepareExternalUrl(internal: string): string {
        const url = 'http://81.26.6.25/student02/' + '#' + internal;
        return url;
      }
}
export class Site {
  location: string;
  constructor() {
        this.location = window.location.href
  }
}


const appRoutes: Routes = [

  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'workplace', component: WorkplaceComponent, canActivate: [AuthGuard] },
  { path: 'providers', component: ProvidersComponent, canActivate: [AuthGuard] },
  { path: 'errand', component: ErrandComponent, canActivate: [AuthGuard] },
  { path: 'production-stage', component: ProductionStageComponent, canActivate: [AuthGuard]},
  { path: 'consumption-of-intermediates', component: ConsumptionOfIntermediatesComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'warehouse', component: WarehouseComponent, canActivate: [AuthGuard]},
  { path: 'order-monitoring', component: OrderMonitoringComponent, canActivate: [AuthGuard]},
  { path: 'information', component: InformationComponent, canActivate: [AuthGuard]},
  { path: 'production-results', component: ProductionResultsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    UsersComponent,
    WorkplaceComponent,
    ProvidersComponent,
    ErrandComponent,
    ProductionStageComponent,
    ConsumptionOfIntermediatesComponent,
    LoginComponent,
    HomeComponent,
    WarehouseComponent,
    OrderMonitoringComponent,
    InformationComponent,
    ProductionResultsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false}
    )

  ],
  providers: [MainService,
              AuthGuard,
              { provide: APP_BASE_HREF, useValue: '/student02/' },
              { provide: LocationStrategy, useClass: CustomLocationStrategy },],
  bootstrap: [AppComponent]
})
export class AppModule { }
