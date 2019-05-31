import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { StyledTabs } from './styled';

const TabsComponent = props => {
  const {
    defaultIndex,
    onSelect,
    tab,
    tabPanel,
  } = props;

  return (
    <StyledTabs>
      <Tabs
        defaultIndex={defaultIndex ? defaultIndex : 0}
        onSelect={onSelect}
      >
        <TabList>
          {tab.map((val, i) => 
            <Tab key={i}>{val}</Tab>)
          }
        </TabList>
        {tabPanel.map((val, i) => <TabPanel key={i}>{val}</TabPanel>)}
      </Tabs>
    </StyledTabs>
  );
};

TabsComponent.propTypes = {
  tab: PropTypes.array.isRequired,
  tabPanel: PropTypes.arrayOf(PropTypes.element).isRequired,
  onSelect: PropTypes.func,
  defaultIndex: PropTypes.number
};

export default TabsComponent;