import { Script } from "@reflexio/core-v1/lib/interfaces/IScript";
import { IGridState, IGridTriggers } from "../grid.slice";
import { _IState, _ITriggers } from "../../_redux/types";
import { ScriptOptsType, WatchArgsType } from "@reflexio/core-v1/lib/types";

export class SelectionScript extends Script<_ITriggers, _IState, 'selection', 'init', null> {
    opts: ScriptOptsType<_ITriggers, _IState, "selection", null>;
    constructor(opt) {
        super();
        this.opts = opt
    }
    private getSelectionColumm () {
        
    }
    private getSelectionRow() {

    }
    init(args: null): void {
        console.log('selection is init');
    }
    watch(args: WatchArgsType<_ITriggers, "selection">): void {

    }
}