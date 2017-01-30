import React from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views'

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
    color: '#000'
  },
  title: {
    color: '#000'
  },
  container: {
    backgroundColor: '#FFF'
  },
  slide: {
    padding: 10
  }
}

class TabMenu extends React.Component {
  constructor(props) {
    super(props)
  }

  handleChange = (value) => {
    this.props.setTabIndex(value)
  }

  render () {
    return (
      <div>
        <Tabs
          onChange={this.handleChange}
          value={this.props.tabIndex}
          tabItemContainerStyle={styles.container}
        >
          <Tab label="Tab One" style={styles.title} value={0} />
          <Tab label="Tab Two" style={styles.title} value={1} />
          <Tab label="Tab Three" style={styles.title} value={2} />
        </Tabs>
        <SwipeableViews
          index={this.props.tabIndex}
          onChangeIndex={this.handleChange}
        >
          <div>
            <h2 style={styles.headline}>Tabs with slide effect</h2>
            Swipe to see the next slide.<br />
          </div>
          <div style={styles.slide}>
            slide n°2
          </div>
          <div style={styles.slide}>
            slide n°3
          </div>
        </SwipeableViews>
      </div>
    )
  }
}

export default TabMenu
