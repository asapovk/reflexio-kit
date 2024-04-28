import { Bite } from '@reflexio/core-v1';
import { DefautOpts, MakeBiteReducerType, UpdateOnType, WatchArgsType } from '@reflexio/core-v1/lib/types';
import { DefaultAtomScript } from './Script';





export function biteAtom<Tg, St, K extends keyof Tg, RTg>(
  biteName: K,
  props: {
    watchScope?: UpdateOnType<RTg>;
    script?: any;
    init?: (opt: DefautOpts<RTg, St, K extends keyof RTg ? K : any, null>, initPayload: unknown) => Promise<void> | void;
    watch?: (opt: DefautOpts<RTg, St, K extends keyof RTg ? K : any, null>, watchArgs: WatchArgsType<Tg, K>) => Promise<void> | void;
    reducers?:Partial<MakeBiteReducerType<Tg, RTg, St, K>>
    instance?: 'stable' | 'refreshing' | 'multiple';
    initialState?: K extends keyof St ? St[K] : never;
  }
) {
  return Bite<Tg, St, K, RTg>(
    {
        init: (state, payload) => {
            state[biteName] = props.initialState; 
        },
        drop: (state, payload) => {
            state[biteName] = null;
        },
        setState: (state, payload) => {
            state[biteName] = payload
        },
        mergeToState: (state, payload) => {
            Object.assign(state[biteName], payload);
        },
        ...props.reducers
    } as any,
    {
      watchScope: props.watchScope || [biteName as any],
      instance: props.instance || 'stable',
      script: props.script || DefaultAtomScript,
      initOn: 'init' as any,
      addOpts: !props.script ? {
          watch: props.watch,
          init: props.init 
      }: undefined,
    }  as any
  );
}
