import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from './../../../components/';
import { StyledInputSection, StyledAddSelectedNode } from './styled';

// TODO: ERROR BOUNDARY, https://reactjs.org/docs/error-boundaries.html

class AddSelectedNode extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      nodeName: '',
      selectedTitle: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange (e) {
    this.setState({
      ...this.state,
      selectedTitle: this.props.collection.selected,
      nodeName: e.target.value
    });
  }

  handleClick () {
    this.props.addSelectedNode(this.state);
    this.setState({
      ...this.state,
      nodeName: ''
    });
  }

  render () {
    const { collection, ui } = this.props;
    const { nodeName } = this.state;

    return (
      <>
        <StyledAddSelectedNode>
          <StyledInputSection>
            <Input
              placeholder={`Enter New ${collection && collection.selected}`}
              type="text"
              value={nodeName}
              onChange={this.handleChange}
            />
            <Button
              disabled={nodeName.length < 1 && true}
              onClick={this.handleClick}
            >
              {ui && !ui.nodeAdded ? 'Add Node' : `Add Another ${collection && collection.selected}`}
            </Button>
          </StyledInputSection>
        </StyledAddSelectedNode>
      </>
    );
  }
}

AddSelectedNode.propTypes = {
  collection: PropTypes.object,
  ui: PropTypes.object,
  addSelectedNode: PropTypes.func,
};

export default AddSelectedNode;
