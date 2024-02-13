export class ComputedScript {
    
    private memorizedValues = {};

    constructor(private opts) {}

    async init(payload) {}

    private defaultComparator(opts, prevVal, nextVal) {
       return prevVal !== nextVal
    }

    async watch(args) {
        const dropEvent = this.opts.catchStatus('drop', args);
        if(dropEvent.isCatched) {
            this.opts.drop();
        }
        const initEvent = this.opts.catchStatus('init', args);
        if(initEvent.isCatched) {
            return;
        }
        setTimeout(()=> {
            const state = this.opts.getCurrentState();
            const computers = this.opts.addOpts.computers;
            const comparators = this.opts.addOpts.comparators || {};
            Object.keys(computers).forEach( key => {
                const newComputedValue = computers[key](this.opts, state);
                const comparator = comparators[key] || this.defaultComparator
                if(comparator(this.opts, this.memorizedValues[key], newComputedValue)) {
                    if(typeof newComputedValue === 'object') {
                        this.memorizedValues[key] = JSON.parse(JSON.stringify(newComputedValue));
                    }
                    else {
                        this.memorizedValues[key] = newComputedValue
                    }
                    this.opts.setStatus(key, this.memorizedValues[key])
                }
            })
        })
    }

}