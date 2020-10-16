import { fromEventPattern, of, Observable } from 'rxjs';
import {
  interpret,
  Machine,
  MachineOptions,
  State,
  assign,
  EventObject
} from 'xstate';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { TrafficContext, TrafficSchema } from './traffic-state.schema';
import { TrafficEvents } from './traffic-state.events';
import { trafficConfig } from './traffic-state.config';

@Injectable()
export class TrafficStateMachine {
  //This binds the actions/guards etc in the State machine to actual functionality.
  formStateOptions: Partial<MachineOptions<TrafficContext, TrafficEvents>> = {
    services: {
    },
    guards: {
    },
    actions: {
      clearFailure:()=>{
        this.flashCallback(false);
      }
    },
    activities:{
      flashing:()=>{
        const interval = setInterval(() => this.flashCallback(), 1000);
        return () => clearInterval(interval);        
      }
    }
  };

  //Creates the state machine instance.
  private _authMachine = Machine<TrafficContext, TrafficSchema, TrafficEvents>(trafficConfig).withConfig(this.formStateOptions);
  private service = interpret(this._authMachine, { devTools: true }).start();
  
  //Creates an observable that a vm can use to monitor for transitions.
  authState$ = fromEventPattern<[State<TrafficContext, TrafficEvents>, EventObject]>(
    handler => {
      return this.service.onTransition(handler);
    },
    (_, service) => console.log('stop') //service.stop() //TODO: This gets called when there are no more subscribers. Need to decide how lifecycle management happens.
  ).pipe(map(([state, _]) => state));
  
  //Send an event to the state machine.
  send(event: TrafficEvents) {
    this.service.send(event);
  }

  flashCallback: any;

  setFlashCallback(callback){
    this.flashCallback = callback;
  }
}

