import React from 'react';
import PropTypes from 'prop-types';
import { Label } from './../../../components/';
import { colors, SVGIcons } from './../../../global/constants';
import InlineSVG from 'svg-inline-react';
import styled from 'styled-components';

const StyledList = styled.ul`
  margin: 1.8rem 0;
`;

const StyledListItem = styled.li`
  margin-bottom: .8rem;
  display: flex;
`;

const StyledClose = styled.span`
  position: absolute;
  height: 4.2rem;
  width: 3rem;
  top: 0;
  right: 0;
  background-color: ${colors.LIGHTER_GRAY};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  i {
    height: 1.5rem;
  }
`;

const ConnectedNodesList = props => {
  const {
    connectedNodes
  } = props;

  return (
    <StyledList>
      {connectedNodes && connectedNodes.map((val, i) => {
        return (
          <StyledListItem
            key={i}
          >
            <Label
              nodeLabel
            >
              <span>{val.value}</span>
              <StyledClose
                onClick={() => props.removeConnectedNode(i)}
              >
                <InlineSVG src={SVGIcons.close} />
              </StyledClose>
            </Label>
          </StyledListItem>
        );
      })}
    </StyledList>
  );
};

ConnectedNodesList.propTypes = {
  connectedNodes: PropTypes.arrayOf(PropTypes.object),
  nodeName: PropTypes.string,
  removeConnectedNode: PropTypes.func
};

export default ConnectedNodesList;