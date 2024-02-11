import {Script} from '@reflexio/core-v1/lib/interfaces/IScript'
import { _IState, _ITriggers } from '../../_redux/types';
import { ScriptOptsType, WatchArgsType } from '@reflexio/core-v1/lib/types';
import { IAppTriggers } from '../app.config';
import {userProfileStages} from '..//stages/users.stage'

const routes = [
    {
        route: '/users/create',
        stages: [
            userProfileStages.LOAD_USERS(),  
            userProfileStages.PAGE_USERS(), 
            userProfileStages.DIALOG_CREATE_USER()
        ]
    },
    {
        route: '/users',
        stages: [
            userProfileStages.LOAD_USERS(), 
            userProfileStages.PAGE_USERS()]
    },
]


export class AppScript extends Script<_ITriggers, _IState, 'appController', 'init', null> {
    
    public opts: ScriptOptsType<_ITriggers, _IState, 'appController', null>;
   
    constructor(opts) {
        super()
        this.opts = opts;
    }

    async init(args: null): Promise<void> {
        this.opts.trigger('router', 'init', null);
        this.opts.trigger('stager', 'init', {
            'failHandler': (opt) => {
                console.log('fail');
                opt.trigger('router', 'goTo', '/users');
            },
            routes,
        });
        this.opts.trigger('router', 'goTo', '/users/create');
        this.opts.trigger('usersController', 'init', null);
    }

    watch(args: WatchArgsType<_ITriggers, 'appController'>): void {
        // if(args.trigger === 'loadUsers') {
        //     args.hangOn()
        // }
 
        const goToDestinationEvent = this.opts.catchEvent('router', 'goToDestination', args)
        if(goToDestinationEvent.isCatched) {
            const destination =
            this.opts.getCurrentState().app.router.destination;
            this.opts.trigger('stager', 'go', destination)
        }
    }
   
}