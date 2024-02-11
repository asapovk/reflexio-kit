


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
  const trigger = useTrigger<_ITriggers>('AppContainer');
  const appState = useReflector<_ITriggers, _IState, _IState>(
    (state) => state,
    ['loadUsers', 'createUserForm']
  );

  return (<div>
              <div>Users page</div>
              <TextInput 
                onChange={(e) => trigger('createUserForm', 'typeField', {
                'fieldName': 'username',
                'value': e.target.value
              })}/>
              <div>{appState.users.createUserForm?.fields['username']?.error}</div>
              <Button onClick={() => trigger('createUserForm', 'submitForm', null)}>submit</Button>
        </div>)


};
