import { CustomerValidationResult } from '../customerValidationResult';

export class NextEvent{
    readonly type = 'EVENT_NEXT'
}

export class TimeoutEvent{
    readonly type = 'EVENT_TIMEOUT'
}

export class ResetEvent{
    readonly type = 'EVENT_RESET'
}

export class BackEvent{
    readonly type = 'EVENT_BACK'
}

export class ComplexStateEvent {
    readonly type = 'COMPLEX_STATE_EVENT';
    constructor(public command: String) {}
}

export class CustomerValidationEvent {
    readonly type = 'EVENT_CUSTOMER_VALIDATION';
    constructor(public customerStatus: CustomerValidationResult) {}
}

export class UIStateUpdateEvent{
    readonly type = 'EVENT_UI'
    constructor(public command: any) {}
}

export type LoanEvent = NextEvent | ComplexStateEvent | BackEvent | UIStateUpdateEvent | CustomerValidationEvent | TimeoutEvent | ResetEvent

export interface Errors {
[key: string]: string;
}