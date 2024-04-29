


export class DefaultAtomScript {
    private opts;
    constructor(opts) {
        this.opts = opts;
    }


   async init(payload) {

        if(this.opts.addOpts.init) {    
            await this.opts.addOpts.init(this.opts, payload)
        }
   }

   async watch(args) {
       if(this.opts.addOpts.watch) {
           await this.opts.addOpts.watch(this.opts, args)
       }
   }

}