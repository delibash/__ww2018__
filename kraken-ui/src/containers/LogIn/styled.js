import styled from 'styled-components';

export const StyledLogin = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  form {
    display: flex;
    flex-flow: column;
  }
  label:not(:last-child) {
    margin-bottom: 1rem;
  }
  strong {
    font-weight: 600;
    display: block;
    margin-bottom: .5rem;
  }
`;