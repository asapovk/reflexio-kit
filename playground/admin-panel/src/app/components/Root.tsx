/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useLayoutEffect } from 'react';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { _IState, _ITriggers } from '../../_redux/types';
import { UsersPage } from '../../users/components/UsersPage';
import { Dialog } from './Dialog';

export const AppContainer = () => {
  const trigger = useTrigger<_ITriggers>('AppContainer');
  const appState = useReflector<_ITriggers, _IState, _IState>(
    (state) => state,
    ['appController']
  );

  useEffect(() => trigger('appController', 'init', null), []);

  const currentPage = appState.app.appController.page;
  const sideBar = appState.app.appController.sideBar;
  console.log(currentPage);
  console.log('render');
  console.log(appState);
  return (
    <div className='app-container'>
      {currentPage.users ? <UsersPage /> : null}
      <Dialog/>
    </div>
  );
};
