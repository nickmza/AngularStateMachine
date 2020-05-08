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
        '': [{ target: 'capture' }]
      }
    },
    capture:{
      type: 'compound',
      initial: 'customerDetails',
      states:{
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
          5000: {target: '#timeout', actions: 'showTimeout'}
        }
        },
        incomeDetails:{
      on:{
        EVENT_BACK:[
          {target: 'employerDetails', cond: 'isEmployed', actions:{ type: 'navigate', route: 'employer-details' }},
          {target: 'customerDetails', actions:{ type: 'navigate', route: 'customer-details' }}
      ]
    }
        },
        hist: {
          type: 'history',
          history: 'shallow' // optional; default is 'shallow'
        }
      }
    },    
    timeout:{
      id:'timeout',
      on:{
          EVENT_RESET:{target: 'capture.hist'} 
      },
      after:{
        3000: {target: 'capture.customerDetails', actions:{ type: 'navigate', route: 'customer-details' }}
      }
    }    
  }
};
