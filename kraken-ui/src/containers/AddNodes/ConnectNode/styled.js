import styled from 'styled-components';
import { colors } from './../../../global/constants';

const StyledConnectNode = styled.section`
  margin-top: 3rem;
  p, h3 {
    margin-bottom: 1rem;
  }
  strong {
    font-weight: 600;
    color: ${colors.BLUE};
  }
`;

export {
  StyledConnectNode
};