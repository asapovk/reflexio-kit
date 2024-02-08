import { Stage, Opts } from '@reflexio/bite-staging-v1/lib/types';
import { _IState, _ITriggers } from '../../_redux/types';

export type OPTS = Opts<_ITriggers, _IState>

export const userProfileStages: {
  [key: string]: (params?: Array<number>) => Stage<OPTS>;
} = {
  LOAD_USERS: (params: Array<number>) => ({
    name: 'LOAD_USERS',
    validator: (opt) => {
    
      return true
    },
    notValidHandler: (opt) => {

      return true;
    },
  }),
  PAGE_USERS: (params: Array<number>) => ({
    name: 'PAGE_USERS',
    assemble: (opt) => {
        opt.trigger('appController', 'setPage', {
            'users': true
        })
        console.log('asm')
        console.log(opt.getCurrentState().app)
    },
    disassemble: (opt) => {
 
    },
    validator: (opt) => true
  }),
  DIALOG_CREATE_USER: (params: Array<number>) => ({
    name: 'DIALOG_CREATE_USER',
    assemble: (opt) => {
        opt.trigger('appController', 'setDialog', {
            'createUser': true
        })
    },
    disassemble: (opt) => {
        opt.trigger('appController', 'closeDialog', null)
    }
  }),
};
