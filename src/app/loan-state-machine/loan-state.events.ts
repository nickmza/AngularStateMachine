
export class NextEvent{
    readonly type = 'EVENT_NEXT'
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
    constructor(public customerStatus: boolean) {}
}

export class UIStateUpdateEvent{
    readonly type = 'EVENT_UI'
    constructor(public command: any) {}
}

export type LoanEvent = NextEvent | ComplexStateEvent | BackEvent | UIStateUpdateEvent | CustomerValidationEvent

export interface Errors {
[key: string]: string;
}