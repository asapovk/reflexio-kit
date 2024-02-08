import {Script} from '@reflexio/core-v1/lib/interfaces/IScript'
import { _IState, _ITriggers } from '../../_redux/types';
import { ScriptOptsType, WatchArgsType } from '@reflexio/core-v1/lib/types';
import { IAppTriggers } from '../app.config';
import {userProfileStages} from '..//stages/users.stage'

const routes = [
    {
        route: '/users',
        stages: [userProfileStages.LOAD_USERS(), userProfileStages.PAGE_USERS()]
    },
    {
        route: '/users/create',
        stages: [userProfileStages.LOAD_USERS(),  
            userProfileStages.PAGE_USERS(), 
            userProfileStages.DIALOG_EDIT_USER()
        ]
    },
]


export class AppScript extends Script<_ITriggers, _IState, 'appController', 'init', null> {
    
    public opts: ScriptOptsType<IAppTriggers, _IState, 'appController', null>;
   
    constructor(opts) {
        super()
        this.opts = opts;
    }

    init(args: null): void {
        this.opts.trigger('router', 'init', null);
        this.opts.trigger('stager', 'init', {
            'failHandler': (opt) => {
                opt.trigger('router', 'goTo', '/users');
            },
            routes,
        });
    }

    watch(args: WatchArgsType<IAppTriggers, 'appController'>): void {
        const goToDestinationEvent = this.opts.catchEvent('router', 'goToDestination', args)
        if(goToDestinationEvent.isCatched) {
            const dest = goToDestinationEvent.payload;
            this.opts.trigger('stager', 'go', dest)
        }
    }
   
}