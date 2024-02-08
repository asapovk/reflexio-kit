import {
  DispatcherType,
  HookerType,
  WaiterType,
} from '@reflexio/core-v1/lib/types';

interface Opts<Tg, St> {
  trigger: DispatcherType<Tg>;
  wait: WaiterType<Tg>;
  hook: HookerType<Tg>;
  getCurrentState: () => St;
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

export interface StageProcessorOpts<Opts> {
  opt: Opts;
  routes: any;
  failHandler: (opt: Opts) => Promise<void> | void;
}

export interface IStagingInitArgs<Opts> {
  routes: Array<{
    route: string;
    stages: Array<Stage<Opts>>;
  }>;
  failHandler: (opt: Opts) => Promise<void> | void;
}

export type IStagingTriggers<Tg, St>  = {
  init: IStagingInitArgs<Opts<Tg, St>>;
  addRoute: {
    route: string;
    stages: Array<Stage<Opts<Tg, St>>>;
  };
  go: string;
  setCtx: unknown;
  dropCtx: null;
  lockCurrentStage: null;
  unlockCurrentStage: null;
  setCurrentStage: string; //hidden
  dropRoute: string;
  drop: null;
}
