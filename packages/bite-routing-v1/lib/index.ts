import { Bite } from '@reflexio/core-v1';
import { RoutingScript } from './Script';

export function biteStaging<Tg, St, K extends keyof Tg, RTg>(
  biteName: K,
  config?: {
    spyAll: boolean;
  }
) {
  return Bite<Tg, St, K, RTg>(null, {
    watchScope: config?.spyAll ? [] : [biteName as any],
    instance: 'stable',
    script: RoutingScript,
    initOn: 'init' as any,
  });
}
