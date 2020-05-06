import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoanStateMachine } from '../loan-state-machine/loan-state.service';
import { NextEvent, UIStateUpdateEvent } from '../loan-state-machine/loan-state.events';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent {
  addressForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    dob: [null],
    idType: null,
    idIssuingCountry: null,
    nic: [null],
    passport: [null],
    address: [null],
    address2: null,
    city: [null],
    state: [null],
    postalCode: [null, Validators.compose([
      Validators.minLength(5), Validators.maxLength(5)])
    ],
    employmentStatus: [null, Validators.required]
  });

  hasUnitNumber = false;

  showExpatFields$: Observable<boolean>;
  loading$: Observable<boolean>;

  states = [
    {name: 'Alabama', abbreviation: 'AL'},
    {name: 'Alaska', abbreviation: 'AK'},
    {name: 'American Samoa', abbreviation: 'AS'},
    {name: 'Arizona', abbreviation: 'AZ'},
    {name: 'Arkansas', abbreviation: 'AR'},
    {name: 'California', abbreviation: 'CA'},
    {name: 'Colorado', abbreviation: 'CO'},
    {name: 'Connecticut', abbreviation: 'CT'},
    {name: 'Delaware', abbreviation: 'DE'},
    {name: 'District Of Columbia', abbreviation: 'DC'},
    {name: 'Federated States Of Micronesia', abbreviation: 'FM'},
    {name: 'Florida', abbreviation: 'FL'},
    {name: 'Georgia', abbreviation: 'GA'},
    {name: 'Guam', abbreviation: 'GU'},
    {name: 'Hawaii', abbreviation: 'HI'},
    {name: 'Idaho', abbreviation: 'ID'},
    {name: 'Illinois', abbreviation: 'IL'},
    {name: 'Indiana', abbreviation: 'IN'},
    {name: 'Iowa', abbreviation: 'IA'},
    {name: 'Kansas', abbreviation: 'KS'},
    {name: 'Kentucky', abbreviation: 'KY'},
    {name: 'Louisiana', abbreviation: 'LA'},
    {name: 'Maine', abbreviation: 'ME'},
    {name: 'Marshall Islands', abbreviation: 'MH'},
    {name: 'Maryland', abbreviation: 'MD'},
    {name: 'Massachusetts', abbreviation: 'MA'},
    {name: 'Michigan', abbreviation: 'MI'},
    {name: 'Minnesota', abbreviation: 'MN'},
    {name: 'Mississippi', abbreviation: 'MS'},
    {name: 'Missouri', abbreviation: 'MO'},
    {name: 'Montana', abbreviation: 'MT'},
    {name: 'Nebraska', abbreviation: 'NE'},
    {name: 'Nevada', abbreviation: 'NV'},
    {name: 'New Hampshire', abbreviation: 'NH'},
    {name: 'New Jersey', abbreviation: 'NJ'},
    {name: 'New Mexico', abbreviation: 'NM'},
    {name: 'New York', abbreviation: 'NY'},
    {name: 'North Carolina', abbreviation: 'NC'},
    {name: 'North Dakota', abbreviation: 'ND'},
    {name: 'Northern Mariana Islands', abbreviation: 'MP'},
    {name: 'Ohio', abbreviation: 'OH'},
    {name: 'Oklahoma', abbreviation: 'OK'},
    {name: 'Oregon', abbreviation: 'OR'},
    {name: 'Palau', abbreviation: 'PW'},
    {name: 'Pennsylvania', abbreviation: 'PA'},
    {name: 'Puerto Rico', abbreviation: 'PR'},
    {name: 'Rhode Island', abbreviation: 'RI'},
    {name: 'South Carolina', abbreviation: 'SC'},
    {name: 'South Dakota', abbreviation: 'SD'},
    {name: 'Tennessee', abbreviation: 'TN'},
    {name: 'Texas', abbreviation: 'TX'},
    {name: 'Utah', abbreviation: 'UT'},
    {name: 'Vermont', abbreviation: 'VT'},
    {name: 'Virgin Islands', abbreviation: 'VI'},
    {name: 'Virginia', abbreviation: 'VA'},
    {name: 'Washington', abbreviation: 'WA'},
    {name: 'West Virginia', abbreviation: 'WV'},
    {name: 'Wisconsin', abbreviation: 'WI'},
    {name: 'Wyoming', abbreviation: 'WY'}
  ];

  constructor(private fb: FormBuilder, private sm: LoanStateMachine, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.showExpatFields$ = this.sm.authState$.pipe(map(state => state.context.showExpatFields))
    this.sm.authState$.subscribe(this.onStateChange);

    this.addressForm.valueChanges.subscribe((data)=>{
      this.sm.send(new UIStateUpdateEvent(data));
    })

    this.loading$ = this.sm.authState$.pipe(
      map(state => state.matches('validateCustomer'))
    );

    this.sm.authState$.pipe(map(i=>i.context.errors)).subscribe((i)=>
    {
      if(i.length > 0){
        this._snackBar.open(i[0], 'OK', {
          duration: 3000
        });  
      }
    });

    //Replace the form data with the data from the SM. 
    if(this.sm.getContext().formData){
      this.addressForm.setValue(this.sm.getContext().formData)
    }
  }

  onStateChange(state) {
    console.log("STATE UPDATE: " + state.value);
  }

  onSubmit() {
    if(!this.addressForm.invalid){
      this.sm.send(new NextEvent());
    }
  }
}
