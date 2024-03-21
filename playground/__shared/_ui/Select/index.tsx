import React from 'react';
import './styles.less';

export interface ISelect {
  onChange: (val) => void,
  defaultValue?: string;
  opts: Array<{
    text: string,
    value: any,
  }>
}


export const Select = (props: ISelect) => (
  <select defaultValue={props.defaultValue} onChange={(e) => props.onChange(e.target.value)} name='pets' id='pet-select' className='oj-ui-select'>
    <option value='' className='oj-ui-select-item'>
      --Please choose an option--
    </option>
    {props.opts.map( (o, i) => <option key={i} value={o.value}>{o.text}</option>)}
  </select>
);
