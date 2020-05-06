import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {CustomerValidationResult} from './customerValidationResult'

@Injectable({
  providedIn: 'root'
})
export class ValidateCustomerService {

  constructor() { }

  validateCustomer(identifier: string): Observable<CustomerValidationResult>{
    return new Observable<CustomerValidationResult>(observer => {
      setInterval(() => {

        var result = new CustomerValidationResult();
        result.identifier = identifier;

        if(identifier.startsWith("A") || identifier == ""){
          result.valid = false;
          result.message = 'Invalid NIC or Passport.';
        }else{
          result.valid = true;
        }
        observer.next(result);
      }, 1000);
    });
  }
}
