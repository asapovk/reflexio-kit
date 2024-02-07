import { Bite } from '@reflexio/core-v1';
import { StagingScript } from './Script';

export function biteStaging<Tg, St, K extends keyof Tg, RTg>(
  biteName: K,
  config?: {
    spyAll: boolean;
  }
) {
  return Bite<Tg, St, K, RTg>(
    {
      init: null,
      addRoute: null,
      go: null,
      setCtx(state, payload) {
        state[biteName] = payload;
      },
      dropCtx(state, payload) {
        state[biteName] = null;
      },
      lockCurrentStage: null,
      unlockCurrentStage: null,
      setCurrentStage: null, //hidden
      dropRoute: null,
      drop: null,
    } as any,
    {
      watchScope: config?.spyAll ? [] : [biteName as any],
      instance: 'stable',
      script: StagingScript,
      initOn: 'init' as any,
    }
  );
}
