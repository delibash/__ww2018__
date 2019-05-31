import styled from 'styled-components';
import { colors } from './../../global/constants';

const StyledModal = styled.div`
  background: white;
  box-shadow: ${colors.BOX_SHADOW_ALL};
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem;
  z-index: 9999;
  nav {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
`;

export {
  StyledModal
};