/* eslint-disable no-unused-vars */
import { Stage, StageProcessorOpts } from './types';

/*
 ** Processing route path of direct linking
 ** route to be splited into queue of stages; line /users/create_user => to ['users', 'create_user']
 ** every stage has its own processor
 ** every stage to be resolved or rejected
 ** but first all the path to be validated
 ** if stage rejected => go to ground state;
 ** if stage resolved => go shift from queue and go to next stage
 ** until queue is empty
 */

//setDestination
//validate and split to stages => setUp queue
// compare queues next and cur => relive changing part
// disassemble current queue within changing part
// assemble new within changing part

export class StageProcessor<O> {
  private prevStagesQueue: Array<Stage<O>> = [];
  private stagesQueue: Array<Stage<O>> = [];
  private curPath: { paramVals: Array<string>; pathTemplate: string } | null =
    null;
  private prevPath: { paramVals: Array<string>; pathTemplate: string } | null =
    null;
  private routesMap = {};
  constructor(private opts: StageProcessorOpts<O>) {
    this.routesMap = this.makeMap(this.opts.routes);
  }
  private inProgress: boolean = false;

  public async go(destination: string) {
    this.inProgress = true;
    const path = this.validatePath(destination);
    if (!path) {
      this.opts.failHandler(this.opts.opt);
    } else {
      this.curPath = path;
      const currRoute = this.findRoute();
      this.stagesQueue = [...currRoute.stages];
      const disassemble = this.getDisassembleStagesQueue();
      for (const ds of disassemble) {
        if (ds.disassemble) {
          ds.disassemble(this.opts.opt, this.prevPath);
        }
      }
      this.prevStagesQueue = [...this.stagesQueue];
      await this.process();
      if (this.curPath) {
        this.prevPath = { ...this.curPath };
      }
    }
  }

  private findRoute() {
    const curPathPattern = this.curPath?.pathTemplate || '/';
    const found = this.opts.routes.find((r) => r.route === curPathPattern);
    if (!found) {
      this.inProgress = false;
       this.opts.failHandler(this.opts.opt);
      // throw Error(
      //   `Not found route for ${curPathPattern}. Invalid routes map or patterns`
      // );
    }

    return found;
  }

  public setStagesQueue(q: Array<Stage<O>>) {
    this.stagesQueue = q;
  }

  private getDisassembleStagesQueue(): Array<Stage<O>> {
    const filterdPrevStagesQueue = this.prevStagesQueue.filter(
      (s) => !this.stagesQueue.find((csq) => csq.name === s.name)
    );

    return filterdPrevStagesQueue.reverse();
  }

  private async processStage(): Promise<boolean | Stage<O>> {
    const stage = this.stagesQueue.shift();
    const isValid = stage.validator
      ? stage.validator(this.opts.opt, this.curPath)
      : true;
    if (isValid) {
      if (stage.assemble) {
        await stage.assemble(this.opts.opt, this.curPath);
      }

      return true;
    } else {
      if(stage.notValidHandler) {
        const res = await stage.notValidHandler(this.opts.opt, this.curPath);
        if(res) {
          return true
        }
      }
      return stage

    }
  }

  private reset() {
    this.curPath = null;
    this.prevPath = null;
    this.prevStagesQueue = [],
    this.stagesQueue = [];
  }
  
  public async process() {
    while (this.stagesQueue.length) {
      const result: any = await this.processStage();
      if (result !== true) {
        this.reset();
        if(result.onFail) {
          await result.onFail(this.opts.opt);
        }
        else {
          await this.opts.failHandler(this.opts.opt);
        }
        break;
      }
    }
  }

  private makeMap = (routes: Array<{ route: string; stages: Array<any> }>) => {
    const map = {};
    let cursor = null;
    for (const ro of routes) {
      const blocks = ro.route.split('/').filter((b) => b !== '');
      cursor = map;
      let index = 0;
      for (const bl of blocks) {
        const blName = bl[0] === ':' ? '__PARAM' : bl;
        if (!cursor[blName]) {
          cursor[blName] = {};
          if (index === blocks.length - 1) {
            cursor['__PATH'] = true;
          }
        }
        cursor = cursor[blName];
        index++;
      }
    }

    return map;
  };
  public validatePath = (
    path: string
  ): { paramVals: Array<string>; pathTemplate: string } | null => {
    const blocks = path.split('/').filter((b) => b !== '');
    const paramVals: Array<string> = [];
    let pathTemplate = '';
    let currObj = null;
    for (const st of blocks) {
      if (!currObj) {
        if (this.routesMap[st]) {
          currObj = this.routesMap[st];
          pathTemplate += `/${st}`;
        } else {
          return null;
        }
      } else {
        if (currObj[st]) {
          currObj = currObj[st];
          pathTemplate += `/${st}`;
        } else if (currObj['__PARAM']) {
          currObj = currObj['__PARAM'];
          paramVals.push(st);
          pathTemplate += '/:paramVal';
        } else {
          return null;
        }
      }
    }

    return {
      pathTemplate,
      paramVals,
    };
  };
}
