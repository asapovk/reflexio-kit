


export class LightControllerScript {
     constructor(private opts) {}

    async init(payload) {
        await this.opts.addOpts.init(this.opts, payload)
    }

    async watch(args) {
        if(this.opts.addOpts.watch) {
            await this.opts.addOpts.watch(this.opts, args)
        }
    }

}