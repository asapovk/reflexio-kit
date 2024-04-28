


export class DefaultAtomScript {
    private opts;
    constructor(opts) {
        this.opts = opts;
        const sliceName = this.opts.sliceName;
        this.opts.getCurrentState = () => {
            const currState = opts.getCurrentState();
            return currState[sliceName];
        }
    }

   async init(payload) {
       await this.opts.addOpts.init(this.opts, payload)
   }

   async watch(args) {
       if(this.opts.addOpts.watch) {
           await this.opts.addOpts.watch(this.opts, args)
       }
   }

}