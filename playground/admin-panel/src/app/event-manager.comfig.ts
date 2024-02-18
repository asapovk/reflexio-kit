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

import { biteStaging } from '@reflexio/bite-staging-v1';
import {biteAsync, asyncInitialState} from  '@reflexio/bite-async-v1' //'../../../../packages/bite-async-v1/lib/index';
import {AsyncState, AsyncTrigger} from '@reflexio/bite-async-v1/lib/types' //'../../../../packages/bite-async-v1/lib/types';
import { biteEventManager } from '@reflexio/bite-event-manager-v1';
import { IEventManagerTriggers } from '@reflexio/bite-event-manager-v1/lib/types';
import { IUsersTriggers } from '../users/users.config';
import { IAppTriggers } from './app.config';


export type IEMTriggers = {
  eventManager: BiteStatusWrap<IEventManagerTriggers<IAppTriggers, _IState>>;
}


export const appSlice = Slice<IEMTriggers, null, _ITriggers, _IState>('eventManager', {
  eventManager: biteEventManager('eventManager', {
    watchScope: [],
  }),
}, null)