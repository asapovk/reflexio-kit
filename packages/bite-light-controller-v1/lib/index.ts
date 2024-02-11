import { Bite } from '@reflexio/core-v1';
import { LightControllerScript } from './Script';
import { DefautOpts, InitArgsType, MakeBiteReducerType, TriggerPhaseKeys, WatchArgsType } from '@reflexio/core-v1/lib/types';

export function biteLightController<Tg, St, K extends keyof Tg, RTg>(biteName: K, props: {
    reducer?: MakeBiteReducerType<Tg, RTg,St, K>,
    script: {
        init: (opt: DefautOpts<Tg, St, K, Tg>, initPayload: unknown) => Promise<void> | void;
        watchScope?: Array<Partial<Record<keyof RTg, TriggerPhaseKeys<RTg, keyof RTg> | Array<TriggerPhaseKeys<RTg, keyof RTg>>>> | keyof RTg> | Array<keyof RTg>;
        watch?: (opt: DefautOpts<Tg, St, K, Tg>, watchArgs: WatchArgsType<Tg, K>) => Promise<void> | void;
    }
}) {
  return Bite<Tg, St, K, RTg>(
    props.reducer || null as any, 
    {
        watchScope: props.script.watchScope || [biteName as any],
        instance: 'stable',
        script: LightControllerScript,
        initOn: 'init' as any,
        addOpts: {
            watch: props.script.watch,
            init: props.script.init 
        }
   } as any);
}
