import { Bite, Slice } from '@reflexio/core-v1';
import { BiteStatusWrap } from '@reflexio/core-v1/lib/types';
import {
  IRouterTriggers,
  IRouterState,
} from '../../../../bite-routing-v1/lib/types';
import { IStagingTriggers } from '../../../../bite-staging-v1/lib/types';

export interface StagerContext {
  data: any;
}

export interface IAppState {
  appController: {
    isReady: boolean;
  };
  router: IRouterState;
  stager?: StagerContext;
}

export interface IAppTriggers {
  appController: BiteStatusWrap<{
    init: null;
    setState: Partial<IAppState>;
  }>;
  router: BiteStatusWrap<IRouterTriggers>;
  stager: BiteStatusWrap<IStagingTriggers<IAppTriggers, IAppState>>;
}
