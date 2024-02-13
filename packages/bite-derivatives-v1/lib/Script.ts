export class ComputedScript {
    
    private memorizedValues: {};

    constructor(private opts) {}

    async init(payload) {}

    private defaultComparator(prevVal, nextVal) {
       return prevVal !== nextVal
    }

    async watch(args) {
        const dropEvent = this.opts.catchStatus('drop', args);
        if(dropEvent.isCatched) {
            this.opts.drop();
        }
        if(args.trigger === this.opts.biteName) {
            return
        }
        setTimeout(()=> {
            const state = this.opts.getCurrentState();
            const computers = this.opts.addOpts.computers;
            const comparators = this.opts.addOpts.comparators;
           
            Object.keys(this.memorizedValues).forEach( key => {
                const newComputedValue = computers[key](this.opts, state);
                const comparator = comparators[key] || this.defaultComparator
                if(comparator(this.memorizedValues[key], newComputedValue)) {
                    if(typeof newComputedValue === 'object') {
                        this.memorizedValues[key] = {...newComputedValue};
                    }
                    else {
                        this.memorizedValues[key] = newComputedValue
                    }
                    this.opts.setStatus(key, newComputedValue)
                }
            })
        })
    }

}