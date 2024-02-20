


/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Fragment, memo } from 'react';
import { CreateUserDialog } from './CreateProfileDialog';
import cn from 'classnames';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { _IState, _ITriggers } from '../../_redux/types';
import { IUserRow } from '../users.config';
import { Flexbox } from '../../../../__shared/_ui/Flexbox';
import { Block } from '../../../../__shared/_ui/Block';
import { Text } from '../../../../__shared/_ui/Text';
import '../styles/users-table.less';


export const UsersTableHeader = () => {
  return <div className='table-header'>
            <div className='table-column'>
              User ID
            </div>
            <div className='table-column'>
              Username
            </div>
            <div className='table-column'>
              Email
            </div>
            <div className='table-column'>
              Group
            </div>
            <div className='table-column'>
              Plan
            </div>
       </div>
}
export const UsersTableRow = (props: {user: IUserRow, onClick: () => void}) => {
  return (
    <div onClick={() => props.onClick()}  className='table-row'>
            <div className='table-column'>
              User ID
            </div>
            <div className='table-column'>
              Username
            </div>
            <div className='table-column'>
              Email
            </div>
            <div className='table-column'>
              Group
            </div>
            <div className='table-column'>
              Plan
            </div>
    </div>
  )
}


export const UsersPage = () => {
  const trigger = useTrigger<_ITriggers>('UsersPage');
  const appState = useReflector<_ITriggers, _IState, _IState>(
    (state) => state,
    ['appController']
  );
  const list = appState.users.usersComponent.usersList;
  console.log('render list', list);
  return (<div className='users-table'>
              <UsersTableHeader/>  
              {list.map(u => 
                    <UsersTableRow onClick={() => 
                      trigger('router', 'goTo', `/users/${u.userId}/edit`)
                    } key={u.userId} user={u} />
              )}
        </div>)


};
