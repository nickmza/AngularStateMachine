export interface LoanSchema {
    states: {
        boot: {};
        timeout:{};
        capture:{
            states:{
                customerDetails: {};
                employerDetails: {};
                incomeDetails: {};
                validateCustomer: {};
                hist:{};
            }
        };
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