
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

export class UIStateUpdateEvent{
    readonly type = 'EVENT_UI'
    constructor(public command: any) {}
}

export type LoanEvent = NextEvent | ComplexStateEvent | BackEvent | UIStateUpdateEvent

export interface Errors {
[key: string]: string;
}