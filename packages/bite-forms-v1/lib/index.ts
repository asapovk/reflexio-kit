import { Bite } from '@reflexio/core-v1';
import { makeFormReducer } from './reducer';
import { FormsScript } from './script';

export function biteForms<Tg, St, K extends keyof Tg, RTg>(biteName: K) {
  return Bite<Tg, St, K, RTg>(makeFormReducer(biteName as string) as any, {
    watchScope: [biteName as any],
    instance: 'stable',
    script: FormsScript,
    initOn: 'init' as any,
  });
}
