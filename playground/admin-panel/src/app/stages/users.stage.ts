import { Stage, Opts } from '@reflexio/bite-staging-v1/lib/types';
import { _IState, _ITriggers } from '../../_redux/types';

export type OPTS = Opts<_ITriggers, _IState>

export const userProfileStages = {
  LOAD_USERS: (params?: Array<number>) => ({
    name: 'LOAD_USERS',
    validator: (opt) => {
    
      return true
    },
    notValidHandler: (opt) => {

      return true;
    },
  }),
  PAGE_USERS: (params?: Array<number>) => ({
    name: 'PAGE_USERS',
    assemble: async (opt) => {
      await new Promise((res, rej)=> {
        setTimeout(()=> {
          opt.trigger('appController', 'setPage', {
            'users': true
          })
        res('ok')
        }, 2000)
      })
        console.log('asm')
        console.log(opt.getCurrentState().app)
    },
    disassemble: (opt) => {
 
    },
    validator: (opt) => true
  }),
  DIALOG_CREATE_USER: (params?: Array<number>) => ({
    name: 'DIALOG_CREATE_USER',
    assemble: async (opt) => {

      await new Promise((res, rej)=> {
        setTimeout(()=> {
          opt.trigger('appController', 'setDialog', {
            'createUser': true
        })
        res('ok')
        }, 2000)
      })
    },
    disassemble: (opt) => {
        opt.trigger('appController', 'closeDialog', null)
    }
  }),
};
