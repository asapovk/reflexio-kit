import {Script} from '@reflexio/core-v1/lib/Script'
import { _IState, _ITriggers } from '../../_redux/types';
import { ScriptOptsType, WatchArgsType } from '@reflexio/core-v1/lib/types';
import { IAppTriggers } from '../app.config';
import {userProfileStages} from '..//stages/users.stage'

const routes = [
    {
        route: '/users/:paramVal/edit',
        stages: [
            userProfileStages.LOAD_USERS(),  
            userProfileStages.PAGE_USERS(), 
            userProfileStages.DIALOG_EDIT_USER([0])
        ]
    },
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
    {
        route: '/form-page',
        stages: [
            userProfileStages.FORM_PAGE(),] 
    },
]


export class AppScript extends Script<_ITriggers, _IState, 'appController', 'init', null> {
    
    public opts: ScriptOptsType<_ITriggers, _IState, 'appController', null>;
   
    constructor(opts) {
        super()
        this.opts = opts;
        console.log(opts);
    }

    async init(args: null): Promise<void> {
        this.opts.trigger('eventManager', 'init', null);
        this.opts.trigger('router', 'init', null);
        this.opts.trigger('stager', 'init', {
            'failHandler': (opt) => {
                console.log('fail');
                opt.trigger('router', 'goTo', '/users');
            },
            routes,
        });
        const href = window.location.href.replace(window.location.origin, '');
        this.opts.trigger('router', 'goTo', href);
        //this.opts.trigger('router', 'goTo', '/users');
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