import { Bite } from '@reflexio/core-v1';
import { MakeBiteReducerType, UpdateOnType } from '@reflexio/core-v1/lib/types';





export function biteAtom<Tg, St, K extends keyof Tg, RTg>(
  biteName: K,
  props: {
    watchScope?: UpdateOnType<RTg>;
    script?: any;
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
      script: props.script,
      initOn: 'init' as any,
    }
  );
}
