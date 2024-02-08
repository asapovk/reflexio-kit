/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useLayoutEffect } from 'react';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { _IState, _ITriggers } from '../../_redux/types';
import { UsersPage } from './UsersPage';
import { Dialog } from './Dialog';

export const AppContainer = () => {
  const trigger = useTrigger<_ITriggers>('AppContainer');
  const appState = useReflector<_ITriggers, _IState, _IState['app']>(
    (state) => state.app,
    ['appController']
  );

  useEffect(() => trigger('appController', 'init', null), []);

  const currentPage = appState.appController.page;
  const sideBar = appState.appController.sideBar;
  console.log(currentPage);
  console.log('render');

  return (
    <div className='app-container'>
      {currentPage.users ? <UsersPage /> : null}
      <Dialog/>
    </div>
  );
};
