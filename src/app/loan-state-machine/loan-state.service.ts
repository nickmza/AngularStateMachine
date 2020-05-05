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
import { loanConfig, context } from './loan-state.config';
import { LoanSchema, LoanContext } from './loan-state.schema';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ComplexStateEvent, LoanEvent, UIStateUpdateEvent } from './loan-state.events';


@Injectable()
export class LoanStateMachine {
  //This binds the actions/guards etc in the State machine to actual functionality.
  formStateOptions: Partial<MachineOptions<LoanContext, LoanEvent>> = {
    services: {
    },
    guards: {
        isEmployed:()=>{
            return context.formData.employmentStatus === 'employed';
        },
        isExpat:(context, event)=>{
             return context.showExpatFields;
        }
    },
    actions: {
        updateUi:(context, event: UIStateUpdateEvent)=>
        {
            context.formData = event.command;
            context.showExpatFields = !(context.formData.idType === "nic") && context.formData.idType != null
        },
        navigate:(ctx, event, meta) =>{
            this.router.navigate([meta.action.route]);
        }
    }
  };

  //Creates the state machine instance.
  private _authMachine = Machine<LoanContext, LoanSchema, LoanEvent>(loanConfig).withConfig(this.formStateOptions);
  private service = interpret(this._authMachine, { devTools: true }).start();
  
  //Creates an observable that a vm can use to monitor for transitions.
  authState$ = fromEventPattern<[State<LoanContext, LoanEvent>, EventObject]>(
    handler => {
      return this.service.onTransition(handler);
    },
    (_, service) => console.log('stop') //service.stop() //TODO: This gets called when there are no more subscribers. Need to decide how lifecycle management happens.
  ).pipe(map(([state, _]) => state));
  
  //Send an event to the state machine.
  send(event: LoanEvent) {
    this.service.send(event);
  }

  getContext():any{
    return this._authMachine.context;
  }

  constructor(private router: Router) {}
}

