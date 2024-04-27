import { BiteStatusWrap } from '@reflexio/core-v1/lib/types';



export type IAtomTriggersApi<ASt, ATg> = BiteStatusWrap< {
    init: 'init' extends keyof ATg ? ATg['init'] : null;
    drop: 'drop' extends keyof ATg ? ATg['drop'] : null;
    setState: ASt;
    mergeToState: Partial<ASt>;
} & ATg>
