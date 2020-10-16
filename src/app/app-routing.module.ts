import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { EmployerDetailsComponent } from './employer-details/employer-details.component';
import { IncomeDetailsComponent } from './income-details/income-details.component';
import { TrafficComponent } from './traffic/traffic.component';

const routes: Routes = [
  { path: '', redirectTo: '/customer-details', pathMatch: 'full' },
  { path: 'customer-details', component: CustomerDetailsComponent },
  { path: 'employer-details', component: EmployerDetailsComponent },
  { path: 'income-details', component: IncomeDetailsComponent },
  { path: 'traffic', component: TrafficComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
