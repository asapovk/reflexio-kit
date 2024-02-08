/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Fragment, memo } from 'react';
import cn from 'classnames';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { _IState, _ITriggers } from '../../_redux';

export const Dialog = memo(() => {
  const trigger = useTrigger<_ITriggers>('Dialog');

  const appState = useReflector<_ITriggers, _IState, _IState['app']>(
    (state) => state.app,
    ['appController']
  );

  const onDialogClose = () => {
    // trigger('dialog', 'clickBackgroud', null);
    trigger('router', 'goBack', null)
    // trigger('usersController', 'setState', {
    //   currentUserId: null,
    // });
  };

  return (
    <div className={'dialog-container'}>
      <Fragment>{appState.appController.dialog?.createUser ? <UserView /> : null}</Fragment>
    </div>
  );
});
