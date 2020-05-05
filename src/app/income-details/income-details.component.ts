import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoanStateMachine } from '../loan-state-machine/loan-state.service';
import { NextEvent, BackEvent } from '../loan-state-machine/loan-state.events';

@Component({
  selector: 'app-income-details',
  templateUrl: './income-details.component.html',
  styleUrls: ['./income-details.component.css']
})
export class IncomeDetailsComponent {
  addressForm = this.fb.group({
    income: [null, Validators.required]
  });

  constructor(private fb: FormBuilder, private sm: LoanStateMachine) {}

  onSubmit() {
    this.sm.send(new NextEvent());
  }

  onBack(){
    this.sm.send(new BackEvent());
  }
}
