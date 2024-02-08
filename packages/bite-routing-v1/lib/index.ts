import { Bite } from '@reflexio/core-v1';
import { RoutingScript } from './Script';
import { IRouterState } from './types';

export function biteRouting<Tg, St, K extends keyof Tg, RTg>(biteName: K) {
  return Bite<Tg, St, K, RTg>(
    {
    init: null,
    goBack: null,
    setDestination(state, payload) {
      state[biteName].destination = payload;
    },
    setNavigationBlocker: null,
    goTo: null,
    goToDestination(state, payload) {
      state[biteName].isBlocked = false;
    },
    removeDestination(state, payload) {
      state[biteName].destination = null;
    },
    throwBlockerReject(state, payload) {
      state[biteName].isBlocked = true;
    },
    setCurrentLocation(state, payload) {
      state[biteName].currentLocation = payload;
    },
    setPrevLocation(state, payload) {
      state[biteName].prevLocation = payload;
    },
    deleteNavigationBlocker: null,
  } as any, {
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
