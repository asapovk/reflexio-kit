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

//import { biteStaging } from '@reflexio/bite-staging-v1';
import {biteAsync, asyncInitialState} from '../../../../packages/bite-async-v1/lib/index';
import {AsyncState, AsyncTrigger} from '../../../../packages/bite-async-v1/lib/types';
import { biteStaging } from '../../../../packages/bite-staging-v1/lib/index';


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
  loadUsers: AsyncState<null, Array<any>>
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
  },
  loadUsers: asyncInitialState()
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
  stager: BiteStatusWrap<IStagingTriggers<_ITriggers, _IState>>;
  loadUsers: BiteStatusWrap<AsyncTrigger<null, Array<any>>>
}


export const appControllerBite 
    = Bite<IAppTriggers, IAppState, 'appController', _ITriggers>({
  'init': null,
  setState(state, payload) {
    Object.assign(state.appController, payload)
  },
  setDialog(state, payload) {
    if(!state.appController.dialog) {
      state.appController.dialog = {}
    }
    Object.assign(state.appController.dialog, payload)
  },
  setSideBar: null,
  closeDialog(state, payload) {
    state.appController.dialog = null
  },
  setPage(state, payload) {
    Object.assign(state.appController.page, payload)
  }
}, {
  script: AppScript,
  'instance': 'stable',
  'watchScope': ['appController', 'router'],
  'initOn': 'init'
})

export const appSlice = Slice<IAppTriggers, IAppState, _ITriggers, _IState>('app', {
  'appController': appControllerBite,
  'router': biteRouting('router'),
  'stager': biteStaging('stager'),
  'loadUsers': biteAsync('loadUsers', {
    'pr': (opt, input) => opt.injected.loadUsers(),
    'timeout': 5000
  })
}, appInitialState)