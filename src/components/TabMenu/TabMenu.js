import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
    color: '#000',
  },
  title: {
    color: '#000',
  },
  container: {
    backgroundColor: '#FFF',
  },
  slide: {
    padding: 10,
  },
};

class TabMenu extends React.Component {

  handleChange = (value) => {
    this.props.setTabIndex(value);
  }

  render() {
    return (
      <div>
        <Tabs
          onChange={this.handleChange}
          value={this.props.tabIndex}
          tabItemContainerStyle={styles.container}
        >
          <Tab label="New Polls" style={styles.title} value={0} />
          <Tab label="Trending Polls" style={styles.title} value={1} />
        </Tabs>
        <SwipeableViews
          index={this.props.tabIndex}
          onChangeIndex={this.handleChange}
        >
          <div style={styles.slide}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>ID</TableHeaderColumn>
                  <TableHeaderColumn>Name</TableHeaderColumn>
                  <TableHeaderColumn>Status</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableRowColumn>1</TableRowColumn>
                  <TableRowColumn>John Smith</TableRowColumn>
                  <TableRowColumn>Employed</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>2</TableRowColumn>
                  <TableRowColumn>Randal White</TableRowColumn>
                  <TableRowColumn>Unemployed</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>3</TableRowColumn>
                  <TableRowColumn>Stephanie Sanders</TableRowColumn>
                  <TableRowColumn>Employed</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>4</TableRowColumn>
                  <TableRowColumn>Steve Brown</TableRowColumn>
                  <TableRowColumn>Employed</TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div style={styles.slide}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>ID</TableHeaderColumn>
                  <TableHeaderColumn>Name</TableHeaderColumn>
                  <TableHeaderColumn>Status</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableRowColumn>1</TableRowColumn>
                  <TableRowColumn>John Smith</TableRowColumn>
                  <TableRowColumn>Employed</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>2</TableRowColumn>
                  <TableRowColumn>Randal White</TableRowColumn>
                  <TableRowColumn>Unemployed</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>3</TableRowColumn>
                  <TableRowColumn>Stephanie Sanders</TableRowColumn>
                  <TableRowColumn>Employed</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>4</TableRowColumn>
                  <TableRowColumn>Steve Brown</TableRowColumn>
                  <TableRowColumn>Employed</TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </SwipeableViews>
      </div>
    );
  }
}

TabMenu.propTypes = {
  tabIndex: React.PropTypes.number,
  setTabIndex: React.PropTypes.func,
};

export default TabMenu;
