import { Script } from "@reflexio/core-v1/lib/interfaces/IScript";
import { _IState, _ITriggers } from "../../_redux/types";
import { ScriptOptsType, WatchArgsType } from "@reflexio/core-v1/lib/types";




export class FormPageControllerScript extends Script<_ITriggers, _IState, 'formPageController', 'init', null> {
    opts: ScriptOptsType<_ITriggers, _IState, "formPageController", null>;
    constructor(opts) {
        super()
        this.opts = opts;
    }

    private nexRowIndex: number = 0;
    private  options = [
        {
            text: 'Goldfish',
            value: 'goldfish'
        },
        {
            text: 'Dog',
            value: 'dog'
        },
        {
            text: 'Cat',
            value: 'cat'
        },
        {
            text: 'Homster',
            value: 'homster'
        }
        ]

    private setRows() {
        const appState= this.opts.getCurrentState();
        const fieldsObject = appState.formPage.dynamicForm.fields;
        const formFieldsNames = Object.keys(fieldsObject);
        const selectorFields = formFieldsNames.filter( fn => fn.includes('row_selector_'));
        const isRemovable = selectorFields.length > 2
        this.opts.setStatus('setFormRows', selectorFields.map( sf => ({
          'isRemovable':  isRemovable,
          'name': sf.split('_')[sf.split('_').length -1]
        })))
    }

    private getSelecorsValues () {
        const appState= this.opts.getCurrentState();
        const fieldsObject = appState.formPage.dynamicForm.fields;
        const formFieldsNames = Object.keys(fieldsObject);
        const selectorFields = formFieldsNames.filter( fn => fn.includes('row_selector_'));
        const values = selectorFields.map(sf => fieldsObject[sf].value);
        return values
    }

    private handleDeleteRow(name: string) {
        const selectorName = `row_selector_${name}`;
        const textInputName = `row_text_${name}`;
        this.opts.trigger('dynamicForm', 'dropField', selectorName);
        this.opts.trigger('dynamicForm', 'dropField', textInputName);
    } 
    private handleAddRow(rowConfig: {
        textInitialValue: string;
        selectorOpt: Array<{text:string, value: string}>;
        selectedInitialValue: string;
    }) {
        const selectorsValues = this.getSelecorsValues();
        const availableOptions = this.options.filter(o => {
            return !selectorsValues.includes(o.value)
        })
        if(!availableOptions.length) {
            return
        }
        this.opts.trigger('dynamicForm', 'addField', {
            'name': `row_text_${this.nexRowIndex}`,
            validators: [],
            'initialValue': rowConfig.textInitialValue,
        })
        this.opts.trigger('dynamicForm', 'addField', {
            sync: true,
            'name': `row_selector_${this.nexRowIndex}`,
            validators: [],
            meta: availableOptions,
            'initialValue': rowConfig.selectedInitialValue,
        })
        this.nexRowIndex +=1;
    }

    init(args: null): void {
        this.opts.trigger('dynamicForm', 'init', {
            'fieldsOpts': []
        })
        this.handleAddRow({
            'selectorOpt': this.options,
            'selectedInitialValue': 'Goldfish',
            'textInitialValue': ''
        })
        this.setRows()
    }
    watch(args: WatchArgsType<_ITriggers, "formPageController">): void {
        const dropEvent = this.opts.catchStatus('drop', args);
        if(dropEvent.isCatched) {
            this.opts.trigger('dynamicForm', 'dropForm', null);
            this.opts.drop();
        }
        const addFormRowEvent = this.opts.catchStatus('addFormRow', args);
        if(addFormRowEvent.isCatched) {
            this.handleAddRow({
                'selectorOpt': this.options,
                'selectedInitialValue': 'Goldfish',
                'textInitialValue': ''
            })
            this.setRows();
        }
        const deleteFormRowEvent = this.opts.catchStatus('deleteFormRow', args);
        if(deleteFormRowEvent.isCatched) {
            this.handleDeleteRow(deleteFormRowEvent.payload.name)
            this.setRows();
        }
        
    }   
}