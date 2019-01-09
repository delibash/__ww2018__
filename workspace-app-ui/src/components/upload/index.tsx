import * as React from 'react';
import { Component } from 'react';
import UploadForm from './formComponent';
import * as styles from './upload.css';
import * as btnStyles from './../buttons/buttons.css';

const header = {
  fontSize: '2.2rem',
  color: 'var(--darkBlue)',
  marginBottom: '2.9rem'
};

const offset = {
  marginBottom: '2.6rem'
};

const inactiveBtn = {
  border: '.2rem solid white',
  color: 'var(--gray)'
};

interface UploadProps {}

class Upload extends Component<UploadProps> {
  public state = {
    uploadState: 'file'
  };

  public constructor (props: any) {
    super(props);
    this.toggleUploadType = this.toggleUploadType.bind(this);
  }

  public toggleUploadType (e: any) {
    this.setState({uploadState: e.target.value});
  }

  public render () {
    const { uploadState } = this.state;
    return (
      <main className={styles.container}>
        <section className={styles.wrapper}>
          <h2 style={header}>Job Description</h2>
          <p style={offset} className="blue-border">
            Let’s get going so I can find you a new team member. Pick the format of the job description you’d like me to use.
          </p>

          <section>
            <section className={styles.toggles}>
              <button
                style={uploadState !== 'file' ? inactiveBtn : {}}
                className={btnStyles.blueBorder}
                value="file"
                onClick={(e) => this.toggleUploadType(e)}
              >
                File Upload
              </button>
              <button
                style={uploadState !== 'text' ? inactiveBtn : {}}
                className={btnStyles.blueBorder}
                value="text"
                onClick={(e) => this.toggleUploadType(e)}
              >
                Plain Text
              </button>
              <button
                style={uploadState !== 'jobDescription' ? inactiveBtn : {}}
                className={btnStyles.blueBorder}
                value="jobDescription"
                onClick={(e) => this.toggleUploadType(e)}
              >
                No Job Description
              </button>
            </section>
            <UploadForm {...this.state} />
          </section>
        </section>
      </main>
    );
  }
}

export default Upload;
