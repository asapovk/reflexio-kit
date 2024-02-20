import { TriggerPhaseKeys, } from "@reflexio/core-v1/lib/types";


export type IEventManagerTriggers<Tr, St> = {
    init: null;
    drop: null;
    forward: {
        from: Partial<Record<keyof Tr, TriggerPhaseKeys<Tr, keyof Tr>>>;
        to: Partial<Record<keyof Tr, TriggerPhaseKeys<Tr, keyof Tr>>>;
        payload?: any;
    }
    mute: Partial<Record<keyof Tr, TriggerPhaseKeys<Tr, keyof Tr>>>;
    unbind: Partial<Record<keyof Tr, TriggerPhaseKeys<Tr, keyof Tr>>>;
}