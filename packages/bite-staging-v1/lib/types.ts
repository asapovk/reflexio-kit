import {
  DefautOpts,
  DispatcherType,
  HookerType,
  WaiterType,
} from '@reflexio/core-v1/lib/types';

interface Opts<Tg, St, CtxState> {
  trigger: DispatcherType<Tg>;
  wait: WaiterType<Tg>;
  hook: HookerType<Tg>;
  getCurrentState: () => St;
  getCtx: () => CtxState;
}

export interface Stage<O> {
  name: string;
  validator?: (
    opt: O,
    path: { paramVals: Array<string>; pathTemplate: string } | null
  ) => boolean; //check if route state allowed
  notValidHandler?: (
    opt: O,
    path: { paramVals: Array<string>; pathTemplate: string } | null
  ) => Promise<boolean> | boolean; //works if not valid
  assemble?: (
    opt: O,
    path: { paramVals: Array<string>; pathTemplate: string } | null
  ) => Promise<void> | void; //works if valid
  disassemble?: (
    opt: O,
    path: { paramVals: Array<string>; pathTemplate: string } | null
  ) => void; //works when off the stage
  //Does operations itselfs or/and asks for user actions;
}

export interface StageProcessorOpts<Tg, St, CtxState> {
  opt: Opts<Tg, St, CtxState>;
  routes: any;
  failHandler: (opt: Opts<Tg, St, CtxState>) => Promise<void> | void;
}

export interface IStagingInitArgs<Opts> {
  routes: Array<{
    route: string;
    stages: Array<Stage<Opts>>;
  }>;
  failHandler: (opt: Opts) => Promise<void> | void;
}

export interface IStagingTriggers<Tg, St, CtxState> {
  init: IStagingInitArgs<Opts<Tg, St, CtxState>>;
  addRoute: {
    route: string;
    stages: Array<Stage<Opts<Tg, St, CtxState>>>;
  };
  go: string;
  saveCtx: { name: string; value: any };
  dropCtx: { name: string } | null;
  lockCurrentStage: null;
  unlockCurrentStage: null;
  setCurrentStage: string; //hidden
  dropRoute: string;
  drop: null;
}
