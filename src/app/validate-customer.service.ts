import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidateCustomerService {

  constructor() { }

  validateCustomer(identifier: string): Observable<boolean>{
    return new Observable<boolean>(observer => {
      setInterval(() => {
        if(identifier.startsWith("A")){
          observer.next(false);
        }else{
          observer.next(true);
        }
      }, 1000);
    });
  }
}
