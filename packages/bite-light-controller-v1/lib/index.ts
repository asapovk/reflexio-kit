import { Bite } from '@reflexio/core-v1';
import { LightControllerScript } from './Script';
import { DefautOpts, InitArgsType, MakeBiteReducerType, TriggerPhaseKeys, WatchArgsType } from '@reflexio/core-v1/lib/types';

export function biteLightController<Tg, St, K extends keyof Tg, RTg>(biteName: K, props: {
    reducer?: MakeBiteReducerType<Tg, RTg,St, K>,
    script: {
        init: (opt: DefautOpts<Tg, St, K, RTg>, initPayload: unknown) => Promise<void> | void;
        watchScope?: Array<keyof RTg>;
        watch?: (opt: DefautOpts<Tg, St, K, RTg>, watchArgs: WatchArgsType<Tg, K>) => Promise<void> | void;
    }
}) {
  return Bite<Tg, St, K, RTg>(
    props.reducer || null as any, 
    {
        watchScope: props.script.watchScope as any || [biteName as any],
        instance: 'stable',
        script: LightControllerScript,
        initOn: 'init' as any,
        addOpts: {
            watch: props.script.watch,
            init: props.script.init 
        }
   } as any);
}
