import { Stage, Opts } from '@reflexio/bite-staging-v1/lib/types';
import { _IState, _ITriggers } from '../../_redux/types';

export type OPTS = Opts<_ITriggers, _IState>

export const userProfileStages: {
  [key: string]: (params?: Array<number>) => Stage<OPTS>;
} = {
  LOAD_USERS: (params: Array<number>) => ({
    name: 'LOAD_USERS',
    validator: (opt) => {

      return false
    },
    notValidHandler: (opt) => {

      return true;
    },
  }),
  PAGE_USERS: (params: Array<number>) => ({
    name: 'PAGE_USERS',
    assemble: (opt) => {
 
    },
    disassemble: (opt) => {
 
    },
  }),
  DIALOG_EDIT_USER: (params: Array<number>) => ({
    name: 'DIALOG_EDIT_USER',
    assemble: (opt) => {

    },
  }),
};
