export class ComputedScript {
    
    private memorizedValues = {};

    constructor(private opts) {
     
    }

    private subscribtion = null;
    

    async init(payload) {
        console.log('derive init');
    }

    private defaultComparator(prevVal, nextVal) {
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
    }
    afterEffects() {
        console.log('afterEffects');
        const state = this.opts.getCurrentState();
        const computers = this.opts.addOpts.computers;
        const comparators = this.opts.addOpts.comparators || {};
        Object.keys(computers).forEach( key => {
            const newComputedValue = computers[key](state);
            const comparator = comparators[key] || this.defaultComparator
            if(comparator(this.opts, this.memorizedValues[key], newComputedValue)) {
                if(typeof newComputedValue === 'object') {
                    this.memorizedValues[key] = JSON.parse(JSON.stringify(newComputedValue));
                }
                else {
                    this.memorizedValues[key] = newComputedValue
                }
                console.log('SET STATE');
                console.log(this.memorizedValues[key]);
          
                this.opts.setStateNoEffect(key, this.memorizedValues[key])


            }
            else {
                console.log('memoused')
            }
        })
    }

}