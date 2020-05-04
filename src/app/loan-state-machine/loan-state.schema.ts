export interface LoanSchema {
    states: {
        boot: {};
        customerDetails: {};
        employerDetails: {};
        incomeDetails: {};
    };
}
  
export interface LoanContext {
    user: String;
    currentState: String;
    messages: string[];
    errors: string[];
    actions: string[];
}