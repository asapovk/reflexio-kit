/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useLayoutEffect } from 'react';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { _IState, _ITriggers } from '../../_redux/types';
import { UsersPage } from '../../users/components/UsersPage';
import { Dialog } from './Dialog';
import {Sidebar} from './Sidebar'
import { FormPage } from '../../form-page/components';


export const AppContainer = () => {
  const trigger = useTrigger<_ITriggers>('AppContainer');
  const appState = useReflector<_ITriggers, _IState, _IState>(
    (state) => state,
    ['appController']
  );

  useEffect(() => trigger('appController', 'init', null), []);

  const currentPage = appState.app.appController.page;
  const sideBar = appState.app.appController.sideBar;

  return (
    <div>
      <Sidebar
      clickUsers={()=> trigger('router', 'goTo', '/users')}
      clickGroups={()=> trigger('router', 'goTo', '/form-page')}
      />
      <div className='page-container'>
      {currentPage.users ? <UsersPage /> : null}
      {currentPage.formPage ? <FormPage /> : null}
      </div>
      <Dialog/>
    </div>
  );
};
