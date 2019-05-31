import styled from 'styled-components';
import { colors } from './../../global/constants';

const StyledLabel = styled.span`
  padding: .6rem 1.2rem;
  font-size: ${props => props.fontSize || '1.3rem'}
  color: ${props => props.color || `${colors.BLUE}`};
  font-weight: ${props => props.fontWeight || 600 };
  border: ${props => props.border || `.1rem solid ${colors.GRAY}`};
  border-radius: ${props => props.borderRadius || '1.6rem'};
  background-color: ${props => props.backgroundColor || `${colors.LIGHTER_GRAY}`};
  display: ${props => props.display || ''};
  height: ${props => props.height || ''};
  width: ${props => props.width || ''}
  box-shadow: ${props => props.boxShadow || ''};
  align-items: ${props => props.alignItems || ''};
  position: ${props => props.position || ''};
`;

const StyledInfoLabel = ({
  borderRadius: '.2rem',
  color: `${colors.BLACK}`,
  fontWeight: 300,
  border: '0 none',
  backgroundColor: `${colors.LIGHTER_GRAY}`
});

const StyledBlueLabel = ({
  backgroundColor: `${colors.BLUE}`,
  color: `${colors.WHITE}`,
  border: '0 none'
});

const StyledNodeLabel = ({
  boxShadow: `${colors.BOX_SHADOW_ALL}`,
  borderRadius: '.2rem',
  border: '0 none',
  height: '4.2rem',
  fontWeight: 300,
  flex: 1,
  color: `${colors.BLACK}`,
  backgroundColor: `${colors.WHITE}`,
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  position: 'relative'
});

export {
  StyledLabel,
  StyledInfoLabel,
  StyledNodeLabel,
  StyledBlueLabel
};