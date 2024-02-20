import { Bite, Slice } from '@reflexio/core-v1';
import { BiteStatusWrap } from '@reflexio/core-v1/lib/types';

import { _IState, _ITriggers } from '../_redux/types';

import {biteAsync, asyncInitialState} from  '@reflexio/bite-async-v1' //'../../../../packages/bite-async-v1/lib/index';
import {AsyncState, AsyncTrigger} from '@reflexio/bite-async-v1/lib/types' //'../../../../packages/bite-async-v1/lib/types';
import { biteForms } from '@reflexio/bite-forms-v1';
import {IFormBiteTriggers, IFieldState, IFormState} from '@reflexio/bite-forms-v1/lib/types'
import {biteLightController} from '@reflexio/bite-light-controller-v1'
import {biteDerivatives} from '@reflexio/bite-derivatives-v1'

//import { biteStaging } from '../../../../packages/bite-staging-v1/lib/index';

export interface IUserRow {
  userId: number;
  name: string;
  email: string;
  group: string;
  groupId: number;
  plan: string;
}


export type IUsersState = {
  loadUsers: AsyncState<null, Array<any>>
  createUserForm?: IFormState; 
  usersComponent: IUsersComponent
  usersController?: {
    currentUser?: IUserRow;
    isReady: boolean;
  }
}

export type  IUsersComponent  = {
  usersList: Array<IUserRow>,
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
    setCurrentUser: IUserRow;
    setUsersList: Array<IUserRow>;
    setIsReady: boolean;
    openCreateUserForm: null;
  }>;
  // usersComponent: BiteStatusWrap<{
  //   init: null;
  //   drop: null;
  //   usersList: Array<IUserRow>,
  //   usersCount: number
  // }>;
  loadUsers: BiteStatusWrap<AsyncTrigger<null, Array<any>>>
  createUserForm: BiteStatusWrap<IFormBiteTriggers>
}


//form1 => form 2 form 3 onFail => back

export const usersSlice = Slice<IUsersTriggers, IUsersState, _ITriggers, _IState>('users', {
  // usersComponent: biteDerivatives('usersComponent', {
  //   computers: {
  //     'usersList':  (state: _IState)=> state.users.loadUsers?.data || [],
  //     'usersCount': (state: _IState)=> state.users.usersComponent.usersList.length
  //   },
  //   watchScope: ['loadUsers'],
  //   // comparators: {
  //   //    'usersCount': (prev, next) => false,
  //   //    'usersList': (prev, next) => false,
  //   //  }
  // }),
  usersController: biteLightController('usersController', {
    reducer: {
      setUsersList(state: IUsersState, payload){
        state.usersComponent.usersList = payload;
      },
      openCreateUserForm: null,
      setIsReady: null,
      init: null,
      setCurrentUser(state: IUsersState, payload) {
        if(state.usersController) {
          state.usersController.currentUser = payload
        }
      },
    },
    script: {
      watchScope: ['usersController'],
      watch: async (opt, pld) => {
        const openCreateForm =  opt.catchStatus('openCreateUserForm', pld)
        if(openCreateForm.isCatched) {
          opt.trigger('createUserForm', 'init', {
            'fieldsOpts': [
              {
                'name': 'username',
                'initialValue': 'Ivan',
                validators: [],
                sync: true,
              },
            ],
            onSubmit(fst, ut) {
              console.log('submit')
              //opt.trigger('')
            },
          })
        }
      },
      init: async (opts, pld) => {
        const res =  await opts.hook('loadUsers', 'init', 'done', null);
        if(res.data) {
          opts.setStatus('setUsersList', res.data);
          opts.setStatus('setIsReady', true)
        }
      }
    }
  }),
  createUserForm: biteForms('createUserForm'),
  loadUsers: biteAsync('loadUsers', {
    pr: (opt, input) => opt.injected.loadUsers(),
    timeout: 5000,
    errorCatcher: (opt, err) => {
      return true
    }
  })
}, usersInitialState)