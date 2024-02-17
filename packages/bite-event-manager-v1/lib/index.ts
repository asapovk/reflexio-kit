import { Bite } from '@reflexio/core-v1';
import { EventManagerScript } from './Script';
import { UpdateOnType } from '@reflexio/core-v1/lib/types';

export function biteEventManager<Tg, St, K extends keyof Tg, RTg>(
  biteName: K,
  props: {
    watchScope: UpdateOnType<RTg>
  }
) {
  return Bite<Tg, St, K, RTg>(
    {
      init: null,
      mute: null,
      unbind: null, 
      forward: null,
      drop: null,
    } as any,
    {
      watchScope: props.watchScope || [biteName as any],
      instance: 'stable',
      script: EventManagerScript,
      initOn: 'init' as any,
    }
  );
}
