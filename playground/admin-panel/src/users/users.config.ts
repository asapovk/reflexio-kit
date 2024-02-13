import { Bite, Slice } from '@reflexio/core-v1';
import { BiteStatusWrap } from '@reflexio/core-v1/lib/types';

import { _IState, _ITriggers } from '../_redux/types';

import {biteAsync, asyncInitialState} from  '@reflexio/bite-async-v1' //'../../../../packages/bite-async-v1/lib/index';
import {AsyncState, AsyncTrigger} from '@reflexio/bite-async-v1/lib/types' //'../../../../packages/bite-async-v1/lib/types';
import { biteForms } from '@reflexio/bite-forms-v1';
import {IFormBiteTriggers, IFieldState, IFormState} from '@reflexio/bite-forms-v1/lib/types'
import {biteLightController} from '@reflexio/bite-light-controller-v1'
import {biteDerivatives} from '../../../../packages/bite-derivatives-v1/lib'

//import { biteStaging } from '../../../../packages/bite-staging-v1/lib/index';

export type IUsersState = {
  loadUsers: AsyncState<null, Array<any>>
  createUserForm?: IFormState; 
  usersComponent: IUsersComponent
}

export type  IUsersComponent  = {
  usersList: [],
  usersCount: 0
}

export const usersInitialState: IUsersState = {
  loadUsers: asyncInitialState(),
  usersComponent: {
    usersList: [],
    usersCount: 0
  }
}

export type IUsersTriggers = {
  usersController: BiteStatusWrap<{
    init: null;
  }>;
  usersComponent: BiteStatusWrap<{
    init: null;
    drop: null;
    usersList: Array<{
      id: number;
      name: string;
    }>,
    usersCount: number
  }>;
  loadUsers: BiteStatusWrap<AsyncTrigger<null, Array<any>>>
  createUserForm: BiteStatusWrap<IFormBiteTriggers>
}



export const usersSlice = Slice<IUsersTriggers, IUsersState, _ITriggers, _IState>('users', {
  usersComponent: biteDerivatives('createUserForm', {
    'comparators': {},
    computers: {},
    watchScope: [],
  }),
  usersController: biteLightController('usersController', {
    script: {
      init: async (opts, pld)=> {
        opts.trigger('createUserForm', 'init', {
          'fieldsOpts': [
            {
              'name': 'username',
              'initialValue': 'Ivan',
              validators: [],
              sync: true,
            },
          ],
          onSubmit(fst, ut) {
            console.log(fst);
          },
        })
        console.log('usersControllerInit');
        const res =  await opts.hook('loadUsers', 'init', 'done', null);
        console.log(res);
      }
    }
  }),
  createUserForm: biteForms('createUserForm'),
  loadUsers: biteAsync('loadUsers', {
    pr: (opt, input) => opt.injected.loadUsers(),
    timeout: 5000,
    errorCatcher: (opt, err) => {
      console.log('errorCatcher', err)
      return true
    }
  })
}, usersInitialState)