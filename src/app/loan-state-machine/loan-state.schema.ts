export interface LoanSchema {
    states: {
        boot: {};
        customerDetails: {};
        employerDetails: {};
        incomeDetails: {};
        validateCustomer: {};
    };
}
  
export interface LoanContext {
    user: String;
    currentState: String;
    messages: string[];
    errors: string[];
    actions: string[];
    showExpatFields: boolean;
    formData: any;
}