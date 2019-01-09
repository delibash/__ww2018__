import * as React from 'react';
import { Component } from 'react';
// import { Button } from './../buttons/buttons';
import Dropzone from 'react-dropzone';
import { checkmark } from './../svg/svgObj';
import api from './../../services/api';
import Dropdown from './../dropdown/dropdownComponent';
import * as styles from './upload.css';
import * as btnStyles from './../buttons/buttons.css';
import { RouteComponentProps, withRouter } from 'react-router';

interface UploadFormProps {
  uploadState: string;
}

interface State {
  files: Array<any>;
  text: string;
  soc: string;
}

const offset = {
  marginBottom: '3.2rem'
};

const InitState: State = {
  files: [],
  text: '',
  soc: ''
};

class UploadForm extends Component<UploadFormProps & RouteComponentProps<{}>> {
  public state = InitState;

  private dropzoneRef: HTMLSpanElement;

  public constructor (props: any) {
    super(props);
    this.onDropAccepted = this.onDropAccepted.bind(this);
    this.handleFileDrop = this.handleFileDrop.bind(this);
    this.handleTextUpload = this.handleTextUpload.bind(this);
    this.handleJobCategory = this.handleJobCategory.bind(this);
    this.onDropZone = this.onDropZone.bind(this);
  }

  public onDropAccepted (files: any) {
    this.setState({files});
  }

  public onDropZone () {
    console.log(this.dropzoneRef);
  }

  public handleFileDrop (e: any) {
    e.preventDefault();
    const { files } = this.state;
    const { history } = this.props;
    if (files.length > 0) {
      api.createJobFromJd(files[0])
        .then(res => history.push(`/calibration/${res.id}`));
    }
  }

  public handleTextUpload (e: any) {
    e.preventDefault();
    const { text } = this.state;
    const { history } = this.props;
    api.createJobFromText(text)
      .then(res => history.push(`/calibration/${res.id}`));
  }

  public handleJobCategory (e: any) {
    e.preventDefault();
    const { history } = this.props;
    api.createJobFromSoc('123')
      .then(res => history.push(`/calibration/${res.id}`));
  }

  public render () {
    const { uploadState } = this.props;
    const { text, files, soc } = this.state;
    const disabled = text.length < 1 && files.length < 1  && soc.length < 1;

    return (
      <form name="uploadForm" id="uploadForm" method="post">
        {
          uploadState === 'file' ?
          <section>
            <section>
              <p style={offset} className="blue-border">
                Drag and drop your file (or upload by browsing your computer) into my inbox below.
              </p>
              <Dropzone
                ref={(node: any) => { this.dropzoneRef = node; }}
                activeStyle={{backgroundColor: 'var(--lightBlue)'}}
                acceptStyle={{backgroundColor: 'var(--lightBlue)'}}
                disableClick={false}
                onDropAccepted={this.onDropAccepted}
                className={styles.dragDropField}
                accept=""
              >
                {
                  files.length < 1 ?
                  <div className={styles.messages}>
                    <span className={styles.dropMsg}>Drag &amp; Drop your file here</span>
                    <span onClick={this.onDropZone} className={styles.browseLink}>Browse on your computer <span>&rarr;</span></span>
                  </div>
                  :
                  <div className={styles.messages}>
                    <span className={styles.checkmark}>{checkmark}</span>
                    {files.map((f: any, i: number) => {
                      return (
                        <span
                          key={i}
                          className={styles.dropMsg}
                        >
                          <span>{f.name}</span>
                          <span
                            onClick={(e) => {
                              e.preventDefault();
                              this.setState({files: []});
                            }}
                            className={styles.close}
                          >
                            x
                          </span>
                        </span>
                      );
                    })}
                  </div>
                }
              </Dropzone>
            </section>
            <section
              style={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              <button
                type="submit"
                style={{padding: '1rem 2rem', width: 'auto'}}
                className={btnStyles.btnLightBlue}
                disabled={disabled}
                onClick={this.handleFileDrop}
              >
                Submit Job Description
              </button>
            </section>
          </section>
          :
          uploadState === 'text' ?
          <section>
            <section>
              <p style={offset} className="blue-border">
                Please copy and paste the job description text in my inbox below.
              </p>
              <div className={styles.plainTextField}>
                <textarea
                  placeholder="Paste text here"
                  onChange={(e) => this.setState({text: e.target.value})}
                  value={text}
                />
              </div>
            </section>
            <section
              style={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              <button
                type="submit"
                style={{padding: '1rem 2rem', width: 'auto'}}
                className={btnStyles.btnLightBlue}
                disabled={disabled}
                onClick={this.handleTextUpload}
              >
                Submit Job Description
              </button>
            </section>
          </section>
          :
          <section>
            <section className={styles.dropdown}>
              <p style={offset} className="blue-border">
                Please select which job industry you’d like to create a chat for.
              </p>
              <Dropdown
                options={[
                  { name: 'What job family are you hiring for?', value: 0 },
                  { name: 'Software Engineer', value: 1 },
                  { name: 'Sales', value: 2 },
                  { name: 'Customer Service', value: 3 },
                ]}
                onChange={(obj) => obj.value !== 0 && this.setState({soc: obj.name})}
              />
            </section>
            <section
              style={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              <button
                type="submit"
                style={{padding: '1rem 2rem', width: 'auto'}}
                className={btnStyles.btnLightBlue}
                disabled={disabled}
                onClick={this.handleJobCategory}
              >
                Submit Job Category
              </button>
            </section>
          </section>
        }
      </form>
    );
  }
}

export default withRouter(UploadForm);
