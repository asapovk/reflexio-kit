import { IAppState, IAppTriggers } from '../app/app.config';
import { IUsersState, IUsersTriggers } from '../users/users.config';

export interface _IState {
  app: IAppState;
  users: IUsersState
}

export type _ITriggers = IAppTriggers & IUsersTriggers;
