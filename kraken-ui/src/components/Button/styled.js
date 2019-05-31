import styled from 'styled-components';
import { colors } from './../../global/constants';

const StyledButton = styled.button`
  padding: .8rem 1.8rem;
  text-transform: capitalize;
  font-weight: 300;
  font-size: 1.3rem;
  border: none;
  border-radius: .2rem;
  background-color: ${props => !props.disabled ? colors.BLUE : colors.LIGHTER_GRAY};
  color: ${props => !props.disabled ? 'white' : colors.BLACK};
  cursor: ${props => !props.disabled ? 'pointer' : 'default'};
  &:hover {
    background-color: ${colors.LIGHTER_GRAY};
    color: ${colors.BLACK}
  }
  `;

export {
  StyledButton
};