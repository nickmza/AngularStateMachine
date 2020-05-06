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
  formData: null
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
            EVENT_NEXT: {target: 'validateCustomer'},
            EVENT_UI:[
                {target: 'customerDetails', actions: 'updateUi'},
            ]
        }
    },
    validateCustomer:{
      invoke: {
                src: 'validateCustomer'
            },
            on:{
              EVENT_CUSTOMER_VALIDATION: [
                {target: 'customerDetails', cond: 'isCustomerValid', actions:[{ type: 'navigate', route: 'customer-details' }, 'checkForErrors']},
                {target: 'employerDetails', cond: 'isEmployed', actions:{ type: 'navigate', route: 'employer-details' }},
                {target: 'incomeDetails', actions:{ type: 'navigate', route: 'income-details' }}
              ]
            }
    },
    employerDetails:{
        on:{
            EVENT_BACK: {target: 'customerDetails', actions:{ type: 'navigate', route: 'customer-details' }},
            EVENT_NEXT: {target: 'incomeDetails', actions:{ type: 'navigate', route: 'income-details' }}
        },
        after:{
          5000: {target: 'timeout', actions: 'showTimeout'}
        }
    },
    timeout:{
      on:{
          EVENT_RESET:{target: 'employerDetails'} 
      },
      after:{
        3000: {target: 'customerDetails', actions:{ type: 'navigate', route: 'customer-details' }}
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
