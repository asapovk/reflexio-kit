export type InitFormOpts<RT, RS> = {
    //Cюда конфиги для каждого конкретного поля
    fieldsOpts: Array<InitFiledOpts>;
    //Имя байта к которому крепится данный скрипт
    // biteName: keyof RT;
    // //Имя слайса к которому крепится данный скрипт
    // sliceName: keyof RS;
    //тут определяем в каком случае мы помечаем форму как touched
    markTouchedOn?: Array<
      'typeField' | 'focusField' | 'blurField' | 'submitForm'
    >;
    //Функция которая проверяет disabled или нет кнопка. formState - состояние формы
    isSubmitDisabled?: (formState: IFormState, touched: boolean) => boolean;
    //formValidators?: Array<Validator>;
    //unTouch - дает возможность снять флаг touched после отправки формы
    onSubmit?: (formState: IFormState, unTouch?: () => void) => void;
    //коллбек на touch формы.
    onTouch?: (formState: IFormState) => void;
  };
  
  export type Validator = {
    validator: (formState: IFormState) => boolean; //true - значит ошибки нет
    message: string; //текс ошибки
    validateOn?: Array<string>; // В каком случае будем показывать ошибку -
    // 'typeField' | 'focusField' | 'blurField' | 'submitForm'
    //просто коллбек
    onShowErr?: (formState: IFormState) => void;
  };
  
  export type InitFiledOpts = {
    validators: Array<Validator>;
    onShowErr?: (formState: IFormState) => void;
    validateOn?: Array<string>; //focus blur or custom action
    //имя поля (внутреннее)
    name: string;
    // sync = true если мы хотим чтобы состояние в форме  и в сторе были одинаковы - это для полей типа
    //switch checkbox и им подобным - т е котды мы в компоненте ставим value
    sync?: boolean;
    initialValue: any;
    meta?: any;
  };
  
  export type IFormBiteTriggers<RT, RS> = {
    init: InitFormOpts<RT, RS>;
    blurField: {
      fieldName: string;
    };
    addField: InitFiledOpts,
    dropField: string;
    focusField: {
      fieldName: string;
    };
    typeField: {
      fieldName: string;
      value: any;
    };
    setFieldError: {
      field: string;
      error: string;
    };
    setFieldValue: {
      field: string;
      value: any;
    };
    setFieldHints: {
      field: string;
      hint: string;
    };
    setFieldOpts: {
      field: string;
      opt: string;
    };
    setFormError: {
      error: string;
    };
    injectExernalError: {
      fieldName?: string;
      error: string;
    };
    submitForm: null;
    setSubmitDisabled: { disabled: boolean };
    setFormState: Partial<IFormState>;
    dropForm: null;
    resetForm: null;
  };
  
  export type IFormState = {
    formError: string | null;
    isSubmitDisabled: boolean;
    fields: { [fieldName: string]: IFieldState };
  };
  
  export type IFieldState = {
    value: any;
    active: boolean;
    sync?: boolean;
    visited: boolean;
    error: string;
    showErrorOn: Array<string>;
    hints?: Array<string>;
    opts?: Array<string>;
    meta?: any;
  };
  
  //export type IFormsState<F extends Array<IForms>>;
  // init: null;
  //   typeField: null;
  //   setFieldValue: string;
  //   setFieldError: string;
  //   setFormError: string;
  //   setFormState: string;
  //   blurField: null;
  //   focusField: null;
  //   submitForm: null;
  