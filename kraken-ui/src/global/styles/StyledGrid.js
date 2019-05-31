import styled from 'styled-components';
import { mediaQuery } from './../../utils/mediaQueryHelper';

const StyledGrid = styled.section`
  display: ${props => props.grid ? 'grid' : 'inline-grid'};
  grid-template-rows: ${props => props.templateRows || 'auto'};
  grid-template-columns: ${props => props.templateColumns || 'auto'};
  grid-gap: ${props => props.gridGap || '0 0'}
  background-color: ${props => props.backgroundColor || 'transparent'};
  min-height: ${props => props.minHeight ? '100vh' : 'initial'};
  position: ${props => props.position || ''};
  ${mediaQuery.phone`
    grid-template-columns: auto;
    grid-template-rows: repeat(2, 1fr);
  `}
`;

const StyledGridChild = styled.section`
  grid-column: ${props => props.gridColumn || 'auto'};
  grid-row: ${props => props.gridRow || 'auto'};
  justify-self: ${props => props.justifySelf || ''};
  align-self: ${props => props.alignSelf || ''};
  place-self: ${props => props.placeSelf || ''};
  background-color: ${props => props.backgroundColor || ''}
`;

export {
  StyledGrid,
  StyledGridChild
};