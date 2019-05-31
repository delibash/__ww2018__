import styled from 'styled-components';
import { colors } from './../../global/constants';

const StyledDropdown = styled.div`
  border: .1rem solid ${colors.GRAY};
  border-radius: .3rem;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  i {
    position: absolute;
    height: 2rem;
    right: .8rem;
  }
  select {
    cursor: pointer;
    width: 100%;
    background: none;
    min-height: 3.6rem;
    padding: .2rem .8rem;
    padding-right: 4rem;
    font-size: 1.3rem;
    appearance: none;
    border: 0 none;
  }
`;

export {
  StyledDropdown
};