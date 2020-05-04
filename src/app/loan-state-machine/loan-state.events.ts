
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

export type LoanEvent = NextEvent | ComplexStateEvent | BackEvent

export interface Errors {
[key: string]: string;
}