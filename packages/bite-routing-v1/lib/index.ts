import { Bite } from '@reflexio/core-v1';
import { RoutingScript } from './Script';
import { IRouterState } from './types';

export function biteRouting<Tg, St, K extends keyof Tg, RTg>(biteName: K) {
  return Bite<Tg, St, K, RTg>(null, {
    watchScope: [biteName as any],
    instance: 'stable',
    script: RoutingScript,
    initOn: 'init' as any,
  });
}

export const routerInitialState: IRouterState = {
  isBlocked: false,
  currentLocation: null,
  destination: null,
  prevLocation: null,
};
