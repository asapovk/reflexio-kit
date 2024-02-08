/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useLayoutEffect } from 'react';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { _IState, _ITriggers } from '../../_redux/types';

export const AppContainer = () => {
  const trigger = useTrigger<_ITriggers>('AppContainer');
  const appState = useReflector<_ITriggers, _IState, _IState['app']>(
    (state) => state.app,
    ['appController']
  );

  useLayoutEffect(() => trigger('appController', 'init', null), []);

  const currentPage = appState.appController.page;
  const sideBar = appState.appController.sideBar;

  return (
    <div className='app-container'>
      Hello app
      {/* {sideBar ? <Sidebar /> : null}
      {currentPage.users ? <UsersPage /> : null}
      {currentPage.groups ? <GroupsPage /> : null}
      <Dialog /> */}
    </div>
  );
};
