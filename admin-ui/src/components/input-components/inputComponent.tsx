import * as React from 'react';

interface TextInputComponentProps {
  htmlLabel: string;
  textLabel: string;
  customClass?: string;
  customStyle?: any;
  handleChange?: (e: any) => void;
}

interface SelectInputComponentProps {
  htmlLabel: string;
  textLabel: string;
  defaultValue: string;
  options: Array<string | object>;
  optionKeys?: Array<string>;
  customStyle?: any;
  customClass?: string;
  dropDownClass?: string;
  handleChange: (e: any) => void;
}

interface CheckBoxInputComponentProps {
  htmlLabel: string;
  textLabel: string;
  checked: boolean;
  customStyle?: any;
  handleChange: () => void;
}

export const TextInputComponent = (props: TextInputComponentProps) => {
  const {
    htmlLabel,
    textLabel,
    handleChange,
    customStyle,
    customClass
  } = props;

  return (
    <label htmlFor={htmlLabel} className={customClass ? customClass : ''}>
      <strong>{textLabel}:</strong>
      <input
        style={customStyle ? customStyle : {}}
        id={htmlLabel}
        required={true}
        type="text"
        onChange={handleChange}
      />
    </label>
  );
};

export const SelectInputComponent = (props: SelectInputComponentProps) => {
  const {
    htmlLabel,
    textLabel,
    handleChange,
    defaultValue,
    options,
    optionKeys,
    customStyle,
    customClass,
    dropDownClass
  } = props;

  return (
    <label htmlFor={htmlLabel} className={customClass ? customClass : ''}>
      <strong style={customStyle}>{textLabel}:</strong>
      <span className={!dropDownClass ? 'dropdownWrapper' : dropDownClass}>
        <select
          className={!dropDownClass ? 'dropdown' : ''}
          onChange={handleChange}
          defaultValue={defaultValue}
        >
          <option value="none">None</option>
          {options && options.map((opt: string, i: number) => {
            return (typeof opt === 'object' ?
              optionKeys && optionKeys.map(v => <option key={i}>{opt[v] ? opt[v] : `${textLabel} Loading or Missing...`}</option>)
              :
              <option key={i}>{opt.length < 1 ? `${textLabel} Loading or Missing...` : opt}</option>);
          })}
        </select>
      </span>
    </label>
  );
};

export const CheckBoxInputComponent = (props: CheckBoxInputComponentProps) => {
  const {
    htmlLabel,
    textLabel,
    checked,
    handleChange
  } = props;

  return (
    <label htmlFor={htmlLabel}>
      <strong>{textLabel}:</strong>
      <input
        id={htmlLabel}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
    </label>
  );
};