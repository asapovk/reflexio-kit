import { StageProcessor } from "./StageProcessor";



export class StagingScript {

    private stager;
    private isInit: boolean = false; 
    constructor(private opts) {

    }

    init(payload) {
        if(!this.isInit)  {
            this.stager = new StageProcessor(payload);
            this.isInit = true
        }
    }
    watch(args) {
        const goEvent = this.opts.catchStatus('go', args);
        if(goEvent.isCatched) {
            const payload = goEvent.payload;
            this.stager.go(payload);
        }
        const dropEvent = this.opts.catchStatus('drop', args);
        if(goEvent.isCatched) {
            const payload = goEvent.payload;
            this.stager.go(payload);
        }

    }
}