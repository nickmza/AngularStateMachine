import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultNavComponent } from './default-nav/default-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { EmployerDetailsComponent } from './employer-details/employer-details.component';
import { LoanStateMachine } from './loan-state-machine/loan-state.service';
import { IncomeDetailsComponent } from './income-details/income-details.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { TrafficComponent } from './traffic/traffic.component';
import { TrafficStateMachine } from './traffic-state-machine/traffic-state.service';

@NgModule({
  declarations: [
    AppComponent,
    DefaultNavComponent,
    CustomerDetailsComponent,
    EmployerDetailsComponent,
    IncomeDetailsComponent,
    TrafficComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatSnackBarModule
  ],
  providers: [LoanStateMachine, TrafficStateMachine],
  bootstrap: [AppComponent]
})
export class AppModule { }
