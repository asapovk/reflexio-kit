import { TriggerPhaseKeys, } from "@reflexio/core-v1/lib/types";


export type IEventManagerTriggers<Tr, St> = {
    init: null;
    drop: null;
    forward: {
        from: Record<keyof Tr, TriggerPhaseKeys<Tr, keyof Tr>>;
        to: Record<keyof Tr, TriggerPhaseKeys<Tr, keyof Tr>>;
    }
    mute: Record<keyof Tr, TriggerPhaseKeys<Tr, keyof Tr>>;
    unbind: Record<keyof Tr, TriggerPhaseKeys<Tr, keyof Tr>>;
}