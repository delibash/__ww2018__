import * as React from 'react';
import { Component } from 'react';
import { Document, Page } from 'react-pdf';

interface ResumeProps {
  resume: string;
}

class ResumeModal extends Component<ResumeProps> {
  public state = {
    numPages: null,
    pageNumber: 1,
    resume: ''
  };

  public onDocumentLoad = ({ numPages }: any) => {
    this.setState({ numPages });
  }

  public render () {
    const { pageNumber } = this.state;
    const { resume } = this.props;
    return (
      <div>
        <Document
          onLoadSuccess={this.onDocumentLoad}
          file={resume}
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
    );
  }
}

export default ResumeModal;
