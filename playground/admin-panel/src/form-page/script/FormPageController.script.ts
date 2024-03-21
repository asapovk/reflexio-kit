import { Script } from "@reflexio/core-v1/lib/interfaces/IScript";
import { _IState, _ITriggers } from "../../_redux/types";
import { ScriptOptsType, WatchArgsType } from "@reflexio/core-v1/lib/types";


export class FormPageControllerScript extends Script<_ITriggers, _IState, 'formPageController', 'init', null> {
    opts: ScriptOptsType<_ITriggers, _IState, "formPageController", null>;
    constructor(opts) {
        super()
        this.opts = opts;
    }
    init(args: null): void {
        this.opts.trigger('dynamicForm', 'init', {
            'fieldsOpts': [
                {
                    sync: true,
                    'name': 'defaultField',
                    'initialValue': 'One',
                    validators: []
                }     
            ]
        })
    }
    watch(args: WatchArgsType<_ITriggers, "formPageController">): void {
        const dropEvent = this.opts.catchStatus('drop', args);
        if(dropEvent.isCatched) {
            this.opts.trigger('dynamicForm', 'dropForm', null);
            this.opts.drop();
        }
    }
}