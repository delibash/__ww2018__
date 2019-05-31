import styled from 'styled-components';

const StyledButtonContainer = styled.section`
  display: flex;
  justify-content: flex-end;
`;

const StyledSelector = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 1.8rem;
  strong {
    & ~ div {
      flex: 1;
      &:not(:last-child) {
        margin: 0 1.8rem;
      }
      &:last-child {
        margin-left: 1.8rem;
      }
    }
  }
`;

export {
  StyledSelector,
  StyledButtonContainer
};