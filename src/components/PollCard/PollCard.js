import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import { darkBlack } from 'material-ui/styles/colors';
import { browserHistory } from 'react-router';


const styles = {
  paper: {
    height: '100%',
    width: '100%',
    textAlign: 'center',
    margin: '20px auto',
    display: 'inline-block',
  },
  subHeader: {
    padding: '0px',
  },
};


class PollCard extends Component {
  componentWillMount() {
    this.props.getPolls();
  }
  handleListItemClick = id => () => {
    browserHistory.push(`/poll/${id}`);
  }
  render() {
    const pollCard = this.props.polls.map((poll, index) => {
      let votes = 0;
      poll.options.map((option) => {
        votes += option.votes;
      });
      return (
        <div key={index}>
          <Subheader
            style={styles.subHeader}
          >{poll.created}</Subheader>
          <ListItem
            onTouchTap={this.handleListItemClick(poll.id)}
            primaryText={poll.title}
            secondaryText={
              <p>
                <span style={{ color: darkBlack }}>{`Created By: ${poll.createdBy}`}</span>
                <br />
                {`Votes: ${votes}`}
              </p>
            }
            secondaryTextLines={2}
          />
          <Divider />
        </div>
      );
    });
    return (
      <div className="container poll-card">
        <div className="row">
          <div className="six columns">
            <Paper style={styles.paper} zDepth={2}>
              <h1>Trending Polls</h1>
              <List>
                {pollCard}
              </List>
            </Paper>
          </div>
          <div className="six columns">
            <Paper style={styles.paper} zDepth={2}>
              <h1>New Polls</h1>
              <List>
                {pollCard}
              </List>
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

PollCard.propTypes = {
  getPolls: React.PropTypes.func,
};

export default PollCard;
