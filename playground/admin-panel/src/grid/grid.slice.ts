import { biteAsync } from '@reflexio/bite-async-v1';
import {IAtomTriggersApi} from '@reflexio/bite-atom-v1/lib/types'
import { Bite, Slice } from '@reflexio/core-v1';
import { _IState, _ITriggers } from '../_redux/types';
import { SelectionScript } from './scripts/Selection.script';

export type Cell = {
    width: number;
    isSelected: number;
}

export type Row = {
    height: number;
    cells: Array<Cell>;
}

export type IGridState = {
    selectionMode: {
        cell?: boolean;
        row?: boolean;
        column?: boolean;
    }
    resizeMode: boolean;
    rows: Array<Row> // Массив строк
}   

export type IGridTriggers = {
    selection: IAtomTriggersApi<IGridState, {
        clickCell: Array<number>;
        setSelectionMode: Partial<IGridState['selectionMode']>;
        selectCell: Array<number>;
        selectRow: number;
        selectColum: number;
    }>
}


export const selectionBite = Bite<IGridTriggers, IGridState, 'selection', _ITriggers>({
    'init': null,
    'drop': null,
    'mergeToState': null,
    'setState': null,
    'selectCell': null,
    'selectColum': null,
    'selectRow': null,
    'setSelectionMode': null,
    clickCell: null,
}, {
    'initOn': 'init',
    'instance': 'stable',
    'script': SelectionScript,
    'watchScope': ['selection']
})

export const gridSlice = Slice<IGridTriggers, IGridState, _ITriggers, _IState>('grid',{
    'selection': selectionBite
}, {
    'resizeMode': false,
    'rows': [],
    'selectionMode': {
        'cell': true
    }
})