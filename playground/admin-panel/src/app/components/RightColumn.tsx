
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Fragment, memo } from 'react';
import { CreateUserDialog } from '../../users/components/CreateProfileDialog';
import cn from 'classnames';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { _IState, _ITriggers } from '../../_redux/types';
import './styles.less';




export const RightColumn = () => {
    const trigger = useTrigger<_ITriggers>('AppContainer');
    const appState = useReflector<_ITriggers, _IState, _IState>(
      (state) => state,
      ['appController']
    );

    return <div className='right-column'></div>
}