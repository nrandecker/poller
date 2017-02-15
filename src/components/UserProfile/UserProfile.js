import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import { darkBlack } from 'material-ui/styles/colors';
import { browserHistory } from 'react-router';

const styles = {
  paper: {
    height: '100%',
    width: '100%',
    margin: '25px auto',
    textAlign: 'center',
    display: 'inline-block',
  },
  header: {
    textAlign: 'center',
    marginTop: '30px',
  },
  subHeader: {
    textAlign: 'center',
    margin: '10px auto',
  },
  pollTrash: {
    fontSize: '20px',
  },
};

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.props.getUserPolls();
  }
  handleTrashClick = (id, index) => () => {
    this.props.deletePoll(id, index);
  }
  handleListItemClick = id => () => {
    browserHistory.push(`/poll/${id}`);
  }
  render() {
    const { polls } = this.props.currentUser;

    const noPollHeader = (
      <h1 style={styles.header}>You don't have any polls 😭</h1>
    );

    const PollHeader = (
      <h1 style={styles.header}>Your Polls</h1>
    );

    const noPolls = (
      <div>
      </div>
    )

    const pollCard = polls.map((poll, index) => {
      let votes = 0;
      poll.options.map((option) => {
        votes += option.votes;
      });
      return (
        <div key={index}>
          <Paper zDepth={1}>
            <List>
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
                rightIconButton={
                  <IconButton
                    iconClassName="fa fa-trash"
                    touch
                    tooltip="Delete Poll"
                    tooltipPosition="bottom-left"
                    onTouchTap={this.handleTrashClick(poll.id, index)}
                  />
                }
                secondaryTextLines={2}
              />
              <Divider />
            </List>
          </Paper>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">
          <div className="twelve columns">
            {(polls.length === 0) ? noPollHeader : PollHeader}
            <div className="offset-by-three six columns">
              {(polls.length !== 0) ? pollCard : pollCard}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  getUserPolls: React.PropTypes.func,
  deletePoll: React.PropTypes.func,
};

export default UserProfile;
