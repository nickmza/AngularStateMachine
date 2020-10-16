
export class PowerEvent{
    readonly type = 'EVENT_POWER'
}

export class FailureEvent{
    readonly type = 'EVENT_FAIL'
}

export type TrafficEvents = PowerEvent | FailureEvent;
