import { BiteStatusWrap } from '@reflexio/core-v1/lib/types';



export type IAtomTriggersApi<ASt, ATg> = BiteStatusWrap< ATg & {
    init: null;
    drop: null;
    setState: ASt;
    mergeToState: Partial<ASt>
}>
