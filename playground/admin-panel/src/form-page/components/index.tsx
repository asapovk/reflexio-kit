/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useLayoutEffect } from 'react';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { _IState, _ITriggers } from '../../_redux/types';
import { Button } from '../../../../__shared/_ui/Button';
import { TextInput } from '../../../../__shared/_ui/Input';

export const FormPage = () => {
  const trigger = useTrigger<_ITriggers>('FormPage');
  const appState = useReflector<_ITriggers, _IState, _IState>(
    (state) => state,
    ['dynamicForm', 'formPageController']
  );
  const currentPage = appState.app.appController.page;
  const sideBar = appState.app.appController.sideBar;

  const fieldsObject = appState.formPage.dynamicForm.fields;
  const inputFields = Object.keys(fieldsObject);

  return (
    <div>
        <div>Form page</div>
        <Button onClick={() => trigger('dynamicForm', 'addField',{
            'name': 'added',
            sync: true,
            'initialValue': 'Two',
            'validators': []
        })}>Добавить</Button>
        {inputFields.map( (f, i) => <TextInput value={fieldsObject[f].value} key={i}/>)}
    </div>
  );
};
