import { Stage, Opts } from '@reflexio/bite-staging-v1/lib/types';
import { _IState, _ITriggers } from '../../_redux/types';

export type OPTS = Opts<_ITriggers, _IState>

export const GridTransformStages: {[key: string]: (p?: any) => Stage<OPTS>} = {
  TRANSFORM: () => ({
    name: 'TRANSFORM',
  })
};
