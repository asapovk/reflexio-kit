


/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Fragment, memo } from 'react';
import { CreateUserDialog } from './CreateProfileDialog';
import cn from 'classnames';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { _IState, _ITriggers } from '../../_redux/types';
import { TextInput } from '../../../../__shared/_ui/Input';
import { Button } from '../../../../__shared/_ui/Button';


export const UsersPage = () => {
  const trigger = useTrigger<_ITriggers>('UsersPage');
  const appState = useReflector<_ITriggers, _IState, _IState>(
    (state) => state,
    ['usersComponent']
  );
  return (<div>
              <div>Users page</div>
              <div>{appState.users.usersComponent.usersCount}</div>
              {appState.users.usersComponent.usersList.map(u => 
                <li key={u.id}>{u.name}</li>
              )}
        </div>)


};
