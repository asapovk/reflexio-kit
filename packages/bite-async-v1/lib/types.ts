

export type AsyncState<I, D> = {
    input?: I;
    data: D;
    resulted: boolean;
    timeout: boolean;
    rejected: boolean;
    loading: boolean;
};
  
export type AsyncTrigger<I, D> = {
    init: I;
    cancel: null;
    done: { data: D; timeout: boolean; rejected: boolean };
};