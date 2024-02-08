import { Bite, Slice } from '@reflexio/core-v1';
import { BiteStatusWrap } from '@reflexio/core-v1/lib/types';
import {
  IRouterTriggers,
  IRouterState,
} from '@reflexio/bite-routing-v1/lib/types';
import { IStagingTriggers } from '@reflexio/bite-staging-v1/lib/types';
import { _IState, _ITriggers } from '../_redux/types';
import { biteRouting } from '@reflexio/bite-routing-v1';
import { AppScript } from './scripts/App.script';

export interface StagerContext {
  data: any;
}

export type IAppState = {
  appController: {
    isReady: boolean;
    page: {
      users?: boolean;
      groups?: boolean;
    };
    dialog?: {
      createUser?: boolean;
      editUser?: boolean;
      createGroup?: boolean;
      editGroup?: boolean;
    };
    sideBar?: 'users' | 'groups' | 'off';
  };
  router: IRouterState;
  stager?: StagerContext;
}

export const appInitialState: IAppState = {
  'router': {
    'currentLocation': null,
    'destination': null,
    'isBlocked': false,
    'prevLocation': null
  },
  'appController': {
    'isReady': false,
    'page': {},
  }
}

export type IAppTriggers = {
  appController: BiteStatusWrap<{
    init: null;
    setState: Partial<IAppState>;
    setSideBar: 'users' | 'groups' | 'off';
    setPage: Partial<IAppState['appController']['page']>;
    setDialog: Partial<IAppState['appController']['dialog']>;
    closeDialog: null;
  }>;
  router: BiteStatusWrap<IRouterTriggers>;
  stager: BiteStatusWrap<IStagingTriggers<IAppTriggers, IAppState>>;
}


export const appControllerBite = Bite<IAppTriggers, IAppState, 'appController', _ITriggers>({
  'init': null,
  setState: null,
  setDialog: null,
  setSideBar: null,
  closeDialog: null,
  'setPage': null
}, {
  script: AppScript,
  'instance': 'stable',
  'watchScope': ['appController'],
  'initOn': 'init'
})

export const routerBite = biteRouting<IAppTriggers, IAppState, 'router', _ITriggers>('router')
export const stagerBite = biteRouting<IAppTriggers, IAppState, 'stager', _ITriggers>('stager')

export const appSlice = Slice<IAppTriggers, IAppState, _ITriggers, _IState>('app', {
  'appController': appControllerBite,
  'router': routerBite,
  'stager': stagerBite,
}, appInitialState)