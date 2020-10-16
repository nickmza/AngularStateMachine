import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TrafficStateMachine } from '../traffic-state-machine/traffic-state.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { PowerEvent, FailureEvent } from '../traffic-state-machine/traffic-state.events';


@Component({
  selector: 'app-traffic',
  templateUrl: './traffic.component.html',
  styleUrls: ['./traffic.component.css']
})
export class TrafficComponent {

  constructor(private sm: TrafficStateMachine) {}

  showRed$: Observable<boolean>;
  showYellow$: Observable<boolean>;
  showGreen$: Observable<boolean>;

  flash$: Subject<boolean>;
  private current: boolean = false;

  ngOnInit(): void {


    this.sm.authState$.subscribe((i)=>{
      console.log(i.value);
    })


    this.showRed$ = this.sm.authState$.pipe(
      map(state => state.matches('normal.red'))
    );

    this.showYellow$ = this.sm.authState$.pipe(
      map(state => state.matches('normal.yellow'))
    );

    this.showGreen$ = this.sm.authState$.pipe(
      map(state => state.matches('normal.green'))
    );

    this.flash$ = new BehaviorSubject<boolean>(false);
    this.sm.flashCallback = (reset)=>{
      console.log('flashing...');
      if(!reset){
        this.current = !this.current;
      }
      else{
        this.current = false;
      }
      this.flash$.next(this.current);  
    };

  }

  onStartTimer(){
   this.sm.send(new FailureEvent());
  }
}
