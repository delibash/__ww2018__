import styled from 'styled-components';
import { colors } from './../../global/constants';

const StyledLabel = styled.label`
  position: relative;
`;

const StyledInput = styled.input`
  min-height: 3.8rem;
  padding: .2rem .8rem;
  border: 0;
  border-radius: .3rem;
  box-shadow: ${colors.BOX_SHADOW_INSET};
  font-size: 1.3rem;
  width: 100%;
`;

const StyledSearchButton = styled.button`
  position: absolute;
  right: .1rem;
  top: .1rem;
  background: ${props => props.disabled ? colors.LIGHTER_GRAY : colors.BLUE};
  color: ${colors.WHITE};
  border: 0 none;
  min-height: 3.6rem;
  border-radius: 0 .3rem .3rem 0;
  cursor: pointer;
`;

export {
  StyledLabel,
  StyledSearchButton,
  StyledInput
};
