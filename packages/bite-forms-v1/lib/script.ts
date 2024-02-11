/* eslint-disable @typescript-eslint/no-empty-function */

import { IFormState, InitFormOpts, Validator } from './types';

/* eslint-disable no-empty */
export class FormsScript<RT, RS> {
  constructor(private opts: any) {}

  private formActualState: IFormState;
  private fieldValidators: {
    [fieldName: string]: {
      validators: Array<Validator>;
      validateOn: Array<string>;
    };
  } = {};
  private markTouchedOn?: Array<
    'typeField' | 'focusField' | 'blurField' | 'submitForm'
  >;
  private formValidators: Array<Validator> = [];
  private isSubmitDisabled: (st: IFormState, touched: boolean) => boolean;
  private onSubmit: (st: IFormState, unTouch?: () => void) => void;
  private onTouch: (st: IFormState) => void;

  private unTouch = () => {
    this.touched = false;
  };

  private touched: boolean = false;
  private sliceName: string;
  private biteName: string;

  private isInit: boolean = false;
  private props: InitFormOpts<RT, RS>;
  public init(props: InitFormOpts<RT, RS>) {
    if (!this.isInit) {
      this.sliceName = this.opts.sliceName; //props.sliceName as string;
      this.biteName = this.opts.biteName; //props.biteName as string;
      this.isInit = true;
      this.props = props;
      this.markTouchedOn = props.markTouchedOn || [];
      this.formValidators = []; //props.formValidators || [];
      this.isSubmitDisabled = props.isSubmitDisabled || ((st, t) => false);
      this.makeInitialActualState();
      this.onTouch = props.onTouch;
      this.isSubmitDisabled(this.formActualState, this.touched);
      this.onSubmit = props.onSubmit;
      this.opts.setStatus(
        'setFormState',
        JSON.parse(JSON.stringify(this.formActualState))
      );
    }
  }

  private makeInitialActualState() {
    this.formActualState = {
      fields: {},
      formError: null,
      isSubmitDisabled: false,
    };
    this.props.fieldsOpts.forEach((opt) => {
      this.fieldValidators[opt.name] = {
        validators: opt.validators,
        validateOn: opt.validateOn,
      };
      this.formActualState.fields[opt.name] = {
        active: false,
        error: null,
        showErrorOn: opt.validateOn,
        visited: false,
        sync: opt.sync,
        value: opt.initialValue,
        meta: opt.meta,
      };
    });
    const disabled = this.isSubmitDisabled(this.formActualState, this.touched);
    this.formActualState.isSubmitDisabled = disabled;
  }

  private touch() {
    if (!this.touched) {
      this.onTouch && this.onTouch(this.formActualState);
    }
    this.touched = true;
  }

  public watch(args) {
    if (!this.isInit) {
      return;
    }
    if(args.status  === 'addField') {
        const opt = args.payload;
        this.fieldValidators[opt.name] = {
          validators: opt.validators,
          validateOn: opt.validateOn,
        };
        this.formActualState.fields[opt.name] = {
          active: false,
          error: null,
          showErrorOn: opt.validateOn,
          visited: false,
          sync: opt.sync,
          value: opt.initialValue,
          meta: opt.meta,
        };
      const disabled = this.isSubmitDisabled(this.formActualState, this.touched);
      this.formActualState.isSubmitDisabled = disabled;
    }
    if(args.status === 'dropField') {
      const fieldName = args.payload;
      delete this.fieldValidators[fieldName];
      delete this.formActualState.fields[fieldName];
      const disabled = this.isSubmitDisabled(this.formActualState, this.touched);
      this.formActualState.isSubmitDisabled = disabled;
    }

    const formState: IFormState =
      this.opts.getCurrentState()[this.sliceName][this.biteName];
    if (args.status === 'typeField') {
      const fieldName = args.payload.fieldName;
      const fieldValue = args.payload.value;
      this.formActualState.fields[fieldName].value = fieldValue;
      //ADDED!!!
      if (this.formActualState.fields[fieldName].sync) {
        this.opts.setStatus('setFieldValue', {
          fieldName: fieldName,
          value: fieldValue,
        });
      }
      this.handleFieldError(fieldName, 'typeField', formState);

      if (
        !this.markTouchedOn.length ||
        this.markTouchedOn.includes('typeField')
      ) {
        this.touch();
      }
      const disabled = this.isSubmitDisabled(
        this.formActualState,
        this.touched
      );
      this.formActualState.isSubmitDisabled = disabled;
      this.opts.setStatus('setSubmitDisabled', { disabled });
    }
    if (args.status === 'blurField') {
      const fieldName = args.payload.fieldName;
      this.formActualState.fields[fieldName].active = false;
      this.formActualState.fields[fieldName].visited = true;
      this.handleFieldError(fieldName, 'blurField', formState);
      if (
        !this.markTouchedOn.length ||
        this.markTouchedOn.includes('blurField')
      ) {
        this.touch();
      }
      const disabled = this.isSubmitDisabled(
        this.formActualState,
        this.touched
      );
      this.formActualState.isSubmitDisabled = disabled;
      this.opts.setStatus('setSubmitDisabled', { disabled });
    }
    if (args.status === 'focusField') {
      const fieldName = args.payload.fieldName;
      this.formActualState.fields[fieldName].active = true;
      this.handleFieldError(fieldName, 'focusField', formState);
      if (
        !this.markTouchedOn.length ||
        this.markTouchedOn.includes('focusField')
      ) {
        this.touch();
      }
      const disabled = this.isSubmitDisabled(
        this.formActualState,
        this.touched
      );
      this.formActualState.isSubmitDisabled = disabled;
      this.opts.setStatus('setSubmitDisabled', { disabled });
    }
    if (args.status === 'submitForm') {
      this.validateAll(formState);
      if (this.onSubmit) {
        this.onSubmit(this.formActualState, this.unTouch);
      }
    }
    if (args.status === 'injectExternalError') {
      const fieldName = args.payload.fieldName;
      const error = args.payload.error;
      if (fieldName) {
        this.formActualState.fields[fieldName].error = error;
        this.opts.setStatus('setFieldError', {
          fieldName: fieldName,
          error: this.formActualState.fields[fieldName].error,
          disabled: this.formActualState.isSubmitDisabled,
        });
      }
    }
    if (args.status === 'setSubmitDisabled') {
      const disabled = args.payload.disabled;
      if (formState.isSubmitDisabled === disabled) {
        args.hangOn();
      }
    }
    if (args.status === 'dropForm') {
      this.opts.drop();
    }
  }

  private validateAll(formState: IFormState) {
    let areErrors = false;
    Object.keys(this.formActualState.fields).forEach((fieldName) => {
      this.handleFieldError(fieldName, 'submitForm', formState);
      if (this.formActualState.fields[fieldName].error) {
        areErrors = true;
      }
    });
    if (areErrors) {
      this.formActualState.formError = 'ERRORS';
    } else {
      this.formActualState.formError = null;
    }
  }

  private handleFieldError(
    fieldName: string,
    fieldActionType: 'blurField' | 'typeField' | 'focusField' | 'submitForm',
    formState: IFormState
  ) {
    let errorToSet = null;
    let showErrorCondition = this.fieldValidators[fieldName].validateOn;
    this.fieldValidators[fieldName].validators.forEach((vd) => {
      const isValid = vd.validator(this.formActualState);
      if (!isValid) {
        if (!errorToSet) {
          showErrorCondition =
            vd.validateOn && vd.validateOn.length
              ? (showErrorCondition = vd.validateOn)
              : this.fieldValidators[fieldName].validateOn;
          errorToSet = vd.message;
        }
      }
    });

    //!vd.validateOn || vd.validateOn.includes(fieldActionType);

    this.formActualState.fields[fieldName].error = errorToSet;
    //let errorToShow = null;
    const needShowError =
      ((showErrorCondition && showErrorCondition.includes(fieldActionType)) ||
        formState.fields[fieldName].error) &&
      //!formState.fields[fieldName].error &&
      formState.fields[fieldName].error !==
        this.formActualState.fields[fieldName].error;

    const needHideError =
      !this.formActualState.fields[fieldName].error &&
      formState.fields[fieldName].error;

    if (needHideError || needShowError) {
      this.opts.setStatus('setFieldError', {
        fieldName: fieldName,
        error: this.formActualState.fields[fieldName].error,
      });
    }
  }
}
