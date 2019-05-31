import styled from 'styled-components';
import { colors } from './../../../global/constants';

const StyledDeck = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const StyledSearchKeys = styled.section`
  font-size: 1.2rem;
  p:not(:last-child) {
    margin-bottom: .5rem;
  }
  p span {
    display: block;
    color: ${colors.DARK_GRAY};
  };
`;

const StyledSearchList = styled.ul``;

const StyledSearchListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .7rem 1rem;
  cursor: pointer;
  &:not(:last-child) {
    border-bottom: .1rem solid ${colors.GRAY};
  };
  &:hover {
    background-color: ${colors.PALE_BLUE};
  }
`;

const StyledLabel = styled.span`
  font-weight: 600;
  color: ${colors.BLUE};
`;

const StyledItemInfo = styled.section`
  & > * {
    display: block;
    margin-bottom: 1rem;
  }
  strong {
    font-weight: 600;
  }
`;

const StyledItemInfoList = styled.ul`
  display: flex;
  li:not(:last-child) {
    margin-right: 1rem;
  }
`;

const StyledForm = styled.form`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 2fr 1fr;
`;


export {
  StyledSearchList,
  StyledSearchListItem,
  StyledSearchKeys,
  StyledItemInfo,
  StyledItemInfoList,
  StyledDeck,
  StyledLabel,
  StyledForm,
};