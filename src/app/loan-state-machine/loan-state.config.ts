import { MachineConfig } from 'xstate';
import { LoanSchema, LoanContext } from './loan-state.schema';
import { LoanEvent } from './loan-state.events';

export const context: LoanContext = {
  user: '',
  currentState: '',
  messages: [],
  errors: [],
  actions: ['Next'],
};

export const loanConfig: MachineConfig<LoanContext,LoanSchema,LoanEvent> = {
  id: 'form_state',
  context,
  initial: 'boot',
  states: {
    boot: {
      on: {
        '': [{ target: 'customerDetails' }]
      }
    },
    customerDetails:{
        on:{
            EVENT_NEXT:[
                {target: 'employerDetails', cond: 'isEmployed'},
                {target: 'incomeDetails'}
            ]
        }
    },
    employerDetails:{
    },
    incomeDetails:{
    }
  }
};
