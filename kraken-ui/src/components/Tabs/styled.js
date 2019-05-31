import styled from 'styled-components';
import { colors } from './../../global/constants';

const StyledTabs = styled.div`
  margin: 0 -1.8rem;

  .react-tabs__tab-panel {
    padding: 1.8rem;
    min-height: calc(100vh - 76px);
    margin-top: -.1rem;
    box-shadow: ${colors.BOX_SHADOW_INSET};
  };

  .react-tabs__tab-list {
    border-bottom: .1rem solid ${colors.GRAY};
    margin-bottom: 0;
  }

  .react-tabs__tab {
    border: 0;
    margin-left: 1.3rem;
    box-shadow: ${colors.BOX_SHADOW_INSET};
  }

  .react-tabs__tab--selected {
    border-radius: .2rem .2rem 0 0;
    background-color: ${colors.TAB_GRAY};
    color: ${colors.WHITE};
  }
`;

export {
  StyledTabs
};