import React, { PureComponent } from 'react';
import { AddNodes, Search } from './../containers';
import { TabsComponent, Panel } from './../components';
import { StyledGrid, StyledGridChild } from './../global/styles';
import { colors } from './../global/constants';

class HomeRoute extends PureComponent {
  render () {
    return (
      <>
      <StyledGrid
        grid
        minHeight
        templateColumns="repeat(2, 1fr)"
      >
        <StyledGridChild>
          <Panel header="Add to Knowledge Graph">
            <TabsComponent
              tab={['Add Node(s)', 'Upload Nodes(Bulk)']}
              tabPanel={[
                <AddNodes key />,
                <div key>UPLOAD ELEMENTS HERE</div>
              ]}
            />
          </Panel>
        </StyledGridChild>
        <StyledGridChild backgroundColor={colors.LIGHTER_GRAY}>
          <Panel header="Search Knowledge Graph">
            <Search />
          </Panel>
        </StyledGridChild>
      </StyledGrid>
      </>
    );
  }
}

HomeRoute.propTypes = {};

export default HomeRoute;