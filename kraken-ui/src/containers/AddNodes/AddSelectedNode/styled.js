import styled from 'styled-components';

const StyledAddSelectedNode = styled.section`
  margin: 1rem 0 1.8rem 0;
`;

const StyledInputSection = styled.section`
  display: flex;
  & > input {
    flex: 1;
    margin-right: 1.8rem;
  }
`;

export {
  StyledAddSelectedNode,
  StyledInputSection
};