export interface TrafficSchema {
    states: {
        boot: {};
        failure:{};
        normal:{
            states:{
                red: {};
                green: {};
                yellow: {};
            }
        };
    };
}
  
export interface TrafficContext {
}