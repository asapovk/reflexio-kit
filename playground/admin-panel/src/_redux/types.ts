import { IAppState, IAppTriggers } from '../app/app.config';
import { IEMTriggers } from '../app/event-manager.comfig';
import { IFormPageState, IFormPageTriggers } from '../form-page/form-page.slice';
import { IGridState, IGridTriggers } from '../grid/grid.slice';
import { IUsersState, IUsersTriggers } from '../users/users.config';

export interface _IState {
  app: IAppState;
  users: IUsersState;
  eventManager: null
  formPage: IFormPageState;
  grid: IGridState;
}

export type _ITriggers = IAppTriggers & IUsersTriggers & IEMTriggers & IFormPageTriggers & IGridTriggers;
