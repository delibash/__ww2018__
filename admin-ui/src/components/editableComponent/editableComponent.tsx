import * as React from 'react';
import { Component } from 'react';
import { syntaxHighlight } from './../helpers';
const DOMPurify = require('dompurify');

import * as styles from './editable.css';

interface State {
  editMode: boolean;
  value: string | number;
}

interface EditableComponentProps {
  value: any;
  selectValues?: any;
  label?: string;
  editType?: string;
  save?: (value: string) => void;
  saveSelectedOption?: (value: string) => void;
}

const InitState: State = {
  editMode: false,
  value: '',
};

const inlineStyles = {
  flexCenter: {
    display: 'flex',
    // alignItems: 'center',
  },
  editMode: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  label: {
    marginRight: '1rem',
  },
  input: {
    padding: '.5rem',
    fontSize: '1.3rem',
    minWidth: '50%',
    border: '.1rem solid var(--lightGray)'
  },
  button: {
    padding: '.5rem 1rem',
    fontSize: '1.2rem',
    fontWeight: 300 as 300,
    border: 'none',
    borderRadius: '0',
    backgroundColor: '#758399',
    color: 'white',
    cursor: 'pointer'
  },
  textarea: {
    display: 'block',
    padding: '1rem',
    fontSize: '1.3rem',
    marginTop: '1rem',
    border: '.1rem solid var(--lightGray)',
    width: '80%',
    minHeight: '20rem'
  },
  hideOverflow: {
    flex: 1,
    overflow: 'hidden',
    marginRight: '2rem'
  }
};

class EditableComponent extends Component<EditableComponentProps> {
  public state = InitState;

  private inputElem: HTMLInputElement;
  private selectElem: HTMLSelectElement;

  public constructor (props: any) {
    super(props);
    this.editField = this.editField.bind(this);
    this.cancelField = this.cancelField.bind(this);
    this.saveField = this.saveField.bind(this);
    this.saveSelectOption = this.saveSelectOption.bind(this);
    this.escFunction = this.escFunction.bind(this);
  }

  public componentDidMount() {
    this.setState({ value: this.props.value });
  }

  public componentWillMount() {
    document.addEventListener('keydown', this.escFunction, false);
  }

  public componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  render () {
    const { editMode, value } = this.state;
    const { label, editType, selectValues } = this.props;
    return (
      <>
        {
          editMode ? 
          this.renderEdit({value, label, editType, selectValues})
          : 
          this.renderDefault({value, label})}
      </>
    );
  }

  private editField() {
    this.setState({ editMode: !this.state.editMode });
  }

  private saveField() {
    this.setState({
      editMode: !this.state.editMode,
      value: this.inputElem.value,
    });

    if (this.props.save) {
      this.props.save(this.inputElem.value);
    }
  }

  private saveSelectOption() {
    this.setState({
      editMode: !this.state.editMode,
      value: this.selectElem.value
    });

    if (this.props.saveSelectedOption) {
      this.props.saveSelectedOption(this.selectElem.value);
    }
  }

  private escFunction(e: any) {
    if (e.keyCode === 27) {
      this.setState({ editMode: false });
    }
  }

  private cancelField() {
    this.setState({ editMode: !this.state.editMode });
  }

  private renderEdit = ({value, label, editType, selectValues}: EditableComponentProps) => (
    <span style={{...inlineStyles.editMode, padding: '.5rem 0'}}>
      <span style={{flex: 1}}>
        {label ? <label htmlFor={label} style={inlineStyles.label}>{label}:</label> : ''}
        {
          editType === 'textarea' ?
          <textarea
            className={styles.blockLevel}
            style={inlineStyles.textarea}
            defaultValue={value}
            ref={(node: any) => { this.inputElem = node; }}
          />
          :
          editType === 'selectOption' ?
          <span className="dropdownWrapper">
            <select
              className="dropdown"
              defaultValue={value}
              style={{fontSize: '1.4rem'}}
              onChange={this.saveSelectOption}
              ref={(node: any) => { this.selectElem = node; }}
            >
              {selectValues && selectValues.map((val: string, i: number) => {
                return(
                  <option
                    key={i}
                  >
                    {val}
                  </option>
                );
              })}
            </select>
          </span>
          :
          <input
            className={styles.blockLevel}
            id={label}
            defaultValue={value}
            style={inlineStyles.input}
            ref={(node: any) => { this.inputElem = node; }}
          />
        }
      </span>
      <span>
        {
          editType !== 'selectOption' ?
          <button style={{marginRight: '1rem', backgroundColor: '#758399', color: 'white'}} className="smallButton" onClick={this.saveField}>Save</button>
          :
          ''
        }
        <button className="smallButton" onClick={this.cancelField}>Cancel</button>
      </span>
    </span>
  )

  private renderDefault = ({value, label}: EditableComponentProps) => (
    <span style={inlineStyles.editMode} className={styles.hoverState}>
      <span
        style={label === 'Eval Model' ? {...inlineStyles.hideOverflow, maxHeight: '5rem'} : inlineStyles.hideOverflow}
        onClick={this.editField}
      >
        {
          label ?
          <span style={inlineStyles.flexCenter} className={styles.blockLevel}>
            <span className={styles.blockLevel}><span style={inlineStyles.label}>{label}:</span></span>
            <strong
              className={styles.blockLevel}
              dangerouslySetInnerHTML={{__html: label === 'Eval Model' ? DOMPurify.sanitize(syntaxHighlight(value)) : value}}
            />
          </span>
          :
          <span>{value}</span>
        }

      </span>
      <button className="smallButton" onClick={this.editField}>Edit</button>
    </span>
  )

}

export default EditableComponent;
