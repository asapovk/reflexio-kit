/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Fragment, memo } from 'react';
import { CreateUserDialog } from '../../users/components/CreateProfileDialog';
import cn from 'classnames';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { _IState, _ITriggers } from '../../_redux/types';
import './styles.less';


export const Grid = () => {
    const gridState = useReflector< _ITriggers,_IState, _IState['grid']>((state) => state.grid, ['selection'])

    return <div>
            {gridState.rows.map(  r => (<div>
                {r.cells.map( c => (
                    <div></div>
                ))}
            </div>))}
        </div>
}