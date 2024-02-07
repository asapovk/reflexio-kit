import { Bite, Slice } from '@reflexio/core-v1';
import { BiteStatusWrap } from '@reflexio/core-v1/lib/types';
import {
  IRouterTriggers,
  IRouterState,
} from '@reflexio/bite-routing-v1/lib/types';
import { IStagingTriggers } from '@reflexio/bite-staging-v1/lib/types';

export interface StagerContext {
  data: any;
}

export interface IAppState {
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

export interface IAppTriggers {
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
