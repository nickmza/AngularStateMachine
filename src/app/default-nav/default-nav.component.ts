import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, filter } from 'rxjs/operators';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LoanStateMachine } from '../loan-state-machine/loan-state.service';
import { BackEvent } from '../loan-state-machine/loan-state.events';

@Component({
  selector: 'app-default-nav',
  templateUrl: './default-nav.component.html',
  styleUrls: ['./default-nav.component.css']
})
export class DefaultNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private sm: LoanStateMachine) {}

  @HostListener('window:popstate', ['$event'])
  onBrowserBackBtnClose(event: Event) {
    event.preventDefault(); 

    //TODO: Check to see if back is a supported transition and invoke,
    //else pass the event through.
    this.sm.send(new BackEvent());
  }

}
