import { Bite } from '@reflexio/core-v1';
import { ComputedScript } from './Script';
import { DefautOpts, InitArgsType, MakeBiteReducerType, TriggerPhaseKeys, WatchArgsType } from '@reflexio/core-v1/lib/types';


export type Computer<Tg, K extends keyof Tg, St>  = {[ L in TriggerPhaseKeys<Tg, K>] : <M>(state: St) => M}
export type ComparatorType<Tg, K extends keyof Tg, St> = Partial<{[C in keyof Computer<Tg, K, St>]: (prev: ReturnType<Computer<Tg, K, St>[C]>, next: ReturnType<Computer<Tg, K, St>[C]>)=> boolean}>

//export type IDerivativeTriggers<St> = {[K in keyof ComputedStateType<St>]: ReturnType<ComputedStateType<St>[K]>}

export function biteDerivatives<Tg, St, K extends keyof Tg, RTg>(biteName: K, props: {
    watchScope: Array<keyof RTg>;
    computers: Computer<Tg, K, St>;
    comparators?: ComparatorType<Tg, K, St>;
}) {
  return Bite<Tg, St, K, RTg>(
    Object.keys(props).filter( k => ['init', 'drop'].indexOf(k) === -1 ).map(key => (state, payload) => {
        Object.assign(state[biteName], payload)
    }) as any, 
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
