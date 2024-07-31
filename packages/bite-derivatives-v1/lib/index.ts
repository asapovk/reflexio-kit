import { Bite } from '@reflexio/core-v1';
import { ComputedScript } from './Script';
import { DefautOpts, InitArgsType, MakeBiteReducerType, TriggerPhaseKeys,TriggerPhaseVals , WatchArgsType } from '@reflexio/core-v1/lib/types';

export type Computer<Tg, K extends keyof Tg, St> = {
    [L in Exclude<Exclude<TriggerPhaseKeys<Tg, K>, 'init'>, 'drop'>]: (state: St) => TriggerPhaseVals<Tg>[K][L];
};
export type ComparatorType<Tg, K extends keyof Tg, St, RTg> = Partial<{
    [C in keyof Computer<Tg, K, St>]: (prev: ReturnType<Computer<Tg, K, St>[C]>, next: ReturnType<Computer<Tg, K, St>[C]>) => boolean;
}>;
//export type IDerivativeTriggers<St> = {[K in keyof ComputedStateType<St>]: ReturnType<ComputedStateType<St>[K]>}

export function biteDerivatives<Tg, St, K extends keyof Tg, RTg>(biteName: K, props: {
    watchScope: Array<keyof RTg>;
    computers: Computer<Tg, K, St>;
    comparators?: ComparatorType<Tg, K, St, RTg>;
}) {
  return Bite<Tg, St, K, RTg>(makeReducer(biteName as string, props.computers) as any, 
    {
        watchScope: props.watchScope,
        instance: 'stable',
        script: ComputedScript,
        initOn: 'init' as any,
        addOpts: {
            computers: props.computers,
            comparators: props.comparators,
        }
   } as any);
}

function makeReducer(biteName: string, computers) {
    return Object.keys(computers).reduce((pv, key) => {
        const reducers =  {
            ...pv,
            [key]: (state, payload) => {
                console.log('call reducer', key, biteName, payload);
                state[biteName][key] = payload
            }
        }
        return reducers;
    }, {})
}