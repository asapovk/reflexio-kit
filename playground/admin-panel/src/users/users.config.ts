import { Bite, Slice } from '@reflexio/core-v1';
import { BiteStatusWrap } from '@reflexio/core-v1/lib/types';

import { _IState, _ITriggers } from '../_redux/types';

import {biteAsync, asyncInitialState} from  '@reflexio/bite-async-v1' //'../../../../packages/bite-async-v1/lib/index';
import {AsyncState, AsyncTrigger} from '@reflexio/bite-async-v1/lib/types' //'../../../../packages/bite-async-v1/lib/types';
//import { biteStaging } from '../../../../packages/bite-staging-v1/lib/index';


export type IUsersState = {
  loadUsers: AsyncState<null, Array<any>>
}

export const usersInitialState: IUsersState = {
  loadUsers: asyncInitialState()
}

export type IUsersTriggers = {
  loadUsers: BiteStatusWrap<AsyncTrigger<null, Array<any>>>
}



export const usersSlice = Slice<IUsersTriggers, IUsersState, _ITriggers, _IState>('users', {
  'loadUsers': biteAsync('loadUsers', {
    'pr': (opt, input) => opt.injected.loadUsers(),
    'timeout': 5000,
    errorCatcher: (opt, err) => {
      console.log('errorCatcher', err)
      return true
    }
  })
}, usersInitialState)