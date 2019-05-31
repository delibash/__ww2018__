import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AddSelectedNode from './AddSelectedNode';
import AddedNode from './AddedNode';
import ConnectNode from './ConnectNode';
import { Button, SelectWrapper, Modal } from './../../components';
import { StyledButtonContainer, StyledSelector } from './styled';

class AddNodes extends PureComponent {

  componentDidMount () {
    this.props.getOptionsRequest();
  }

  render () {
    const {
      collection,
      ui,
    } = this.props;

    const {
      nodeAdded,
      nodeTypeSelected,
      nodeUpdateDisabled,
      showModal
    } = ui;

    return (
      <>
      <section>
        <StyledSelector>
          <strong>Add:</strong>
          <SelectWrapper
            isDisabled={nodeAdded}
            placeholder="Select One"
            isSearchable={true}
            options={collection.selectOptions}
            onChange={newNode => this.props.selectNode(newNode)}
          />
          {nodeAdded &&
            <Button
              onClick={() => this.props.showModal()}
            >
              {`add another ${collection.selected}`}
            </Button>}
        </StyledSelector>
        {nodeTypeSelected && <h3>New {collection.selected}</h3>}
        {!nodeAdded && nodeTypeSelected && <AddSelectedNode {...this.props} />}
        {nodeAdded &&
          <AddedNode {...this.props} {...collection} />}
        {nodeAdded &&
          <ConnectNode {...this.props} />}
        {nodeAdded &&
          <StyledButtonContainer>
            <Button
              disabled={nodeUpdateDisabled}
              onClick={() => this.props.updateNode()}
            >
              Update Node
            </Button>
          </StyledButtonContainer>}
      </section>
      {
        showModal &&
          <Modal>
            <p>You have not updated your current changes and they will not be saved. Proceed?</p>
            <nav>
              <Button onClick={() => this.props.cancelModal()}>Cancel</Button>
              <Button onClick={() => this.props.selectNewNode()}>Ok</Button>
            </nav>
          </Modal>
      }
      </>
    );
  }
}

AddNodes.propTypes = {
  ui: PropTypes.object,
  collection: PropTypes.object,
};

export default AddNodes;
