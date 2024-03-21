import { Bite, Slice } from '@reflexio/core-v1';
import { BiteStatusWrap } from '@reflexio/core-v1/lib/types';
import { _IState, _ITriggers } from '../_redux/types';

import { IFormBiteTriggers, IFormState } from '@reflexio/bite-forms-v1/lib/types';
import { biteForms } from '@reflexio/bite-forms-v1';
import { FormPageControllerScript } from './script/FormPageController.script';


export type IFormPageState = {
    dynamicForm: IFormState
}


export type IFormPageTriggers = {
    formPageController: BiteStatusWrap<{
    init: null;
    drop: null;
  }>;
  dynamicForm: BiteStatusWrap<IFormBiteTriggers>
}


export const formPageBite 
    = Bite<IFormPageTriggers, {}, 'formPageController', _ITriggers>({
  'init': null,
    drop: null
}, {
  script: FormPageControllerScript,
  'instance': 'stable',
  'watchScope': ['formPageController'],
  'initOn': 'init'
})

export const formPageSlice = Slice<IFormPageTriggers, IFormPageState, _ITriggers, _IState>('formPage', {
  'dynamicForm': biteForms('dynamicForm'),
  formPageController: formPageBite,
  },
{dynamicForm: null});