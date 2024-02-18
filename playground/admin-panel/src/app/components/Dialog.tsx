/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Fragment, memo } from 'react';
import { CreateUserDialog } from '../../users/components/CreateProfileDialog';
import cn from 'classnames';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { _IState, _ITriggers } from '../../_redux/types';
import './styles.less';

export const Dialog = memo(() => {
  const trigger = useTrigger<_ITriggers>('Dialog');

  const appState = useReflector<_ITriggers, _IState, _IState['app']>(
    (state) => state.app,
    ['appController']
  );

  const onDialogClose = () => {
    trigger('appController', 'closeDialog', null);
    //trigger('router', 'goTo', '/users')
    // trigger('usersController', 'setState', {
    //   currentUserId: null,
    // });
  };

  return appState.appController.dialog ? (
    <div className='dialog-background'>
      <div className='dialog-layer' onClick={onDialogClose}></div>
      <div className='dialog-window'>
      {
        appState.appController.dialog?.createUser ? <CreateUserDialog/>: null
      }
       {
        appState.appController.dialog?.editUser ? <CreateUserDialog/>: null
      }
      </div>
    </div>
  ) : null;

});
