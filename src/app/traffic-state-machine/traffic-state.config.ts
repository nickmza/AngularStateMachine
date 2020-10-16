import { MachineConfig } from 'xstate';
import { after } from 'xstate/lib/actions';
import { TrafficContext, TrafficSchema } from './traffic-state.schema';
import { TrafficEvents, PowerEvent } from './traffic-state.events';

export const context: TrafficContext = {
};

export const trafficConfig: MachineConfig<TrafficContext,TrafficSchema,TrafficEvents> = {
  id: 'form_state',
  context,
  initial: 'boot',
  states: {
    boot: {
      on: {
        '': [{ target: 'normal' }]
      }
    },
    normal:{
      initial:'red',
      states:{
        red:{
          after:{
            2500: 'green'
          }
        },
        green:{
          after:{
            2500: 'yellow'
          }
        },
        yellow:{
          after:{
            2500: 'red'
          }
        }
      },
      on:{
        EVENT_FAIL:'failure'
      }
    },
    failure:{
      activities:['flashing'],
      after:{
        5000: 'normal'
      },
      exit:'clearFailure'
    }
  }
};
