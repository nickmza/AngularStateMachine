import { MachineConfig } from 'xstate';
import { LoanSchema, LoanContext } from './loan-state.schema';
import { LoanEvent } from './loan-state.events';

export const context: LoanContext = {
  user: '',
  currentState: '',
  messages: [],
  errors: [],
  actions: ['Next'],
  showExpatFields: false,
  formData: {}
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
                {target: 'employerDetails', cond: 'isEmployed', actions:{ type: 'navigate', route: 'employer-details' }},
                {target: 'incomeDetails', actions:{ type: 'navigate', route: 'income-details' }}
            ],
            EVENT_UI:[
                {target: 'customerDetails', actions: 'updateUi'},
            ]
        }
    },
    employerDetails:{
        on:{
            EVENT_BACK: {target: 'customerDetails', actions:{ type: 'navigate', route: 'customer-details' }},
            EVENT_NEXT: {target: 'incomeDetails', actions:{ type: 'navigate', route: 'income-details' }}
        }
    },
    incomeDetails:{
      on:{
        EVENT_BACK:[
          {target: 'employerDetails', cond: 'isEmployed', actions:{ type: 'navigate', route: 'employer-details' }},
          {target: 'customerDetails', actions:{ type: 'navigate', route: 'customer-details' }}
      ]
    }
    }
  }
};
