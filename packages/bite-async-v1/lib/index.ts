import { Bite } from '@reflexio/core-v1';
import { AsyncScript } from './Script';
import { AsyncState } from './types';
import { DefautOpts } from '@reflexio/core-v1/lib/types';




export function biteAsync<Tg, St, K extends keyof Tg, RTg>(biteName: K, props: {
    pr: (opt: DefautOpts<Tg, St, K, any>, input: unknown) => Promise<unknown>,
    timeout?: number,
    errorCatcher?: (opt: DefautOpts<Tg, St, K, any>, res: unknown) => boolean;
}) {
    
    const defaultStartReducer = (state, payload) => {
        state[biteName].input = payload;
        state[biteName].loading = true;
    };
    
    const defaultDoneReducer = (state, payload) => {
        state[biteName].loading = false;
        state[biteName].resulted = true;
        state[biteName].timeout = payload.timeout;
        state[biteName].rejected = payload.rejected;
        state[biteName].data = payload.data;
    };
    
  return Bite<Tg, St, K, RTg>({
    
    init: defaultStartReducer,
    done: defaultDoneReducer,
    
  } as any, {
    watchScope: [biteName as any],
    instance: 'stable',
    script: AsyncScript,
    initOn: 'init' as any,
    //@ts-ignore
    addOpts: {
        //@ts-ignore
        promise: props.pr,
        //@ts-ignore
        timeout: props.timeout || null,
        errorCatcher: props.errorCatcher
      },
  });
}

export const asyncInitialState = <I, D>(
    state?: AsyncState<I, D>
  ): AsyncState<I, D> => ({
    data: state && state.data ? state.data : null,
    loading: state && state.loading ? state.loading : false,
    resulted: state && state.resulted ? state.resulted : false,
    rejected: state && state.rejected ? state.rejected : false,
    timeout: state && state.timeout ? state.timeout : false,
  });
  