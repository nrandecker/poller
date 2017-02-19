import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import { blue500 } from 'material-ui/styles/colors';

const styles = {
  chip: {
    margin: 4,
  },
  button: {
    width: '50%',
    margin: 12,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  refresh: {
    marginRight: '20px',
    marginTop: '30px',
    position: 'relative',
  },
};

const PieLoading = () => (
  <div style={styles.container}>
    <RefreshIndicator
      size={40}
      left={10}
      top={0}
      status="loading"
      style={styles.refresh}
    />
  </div>
);


class Poll extends Component {
  componentDidMount() {
    const { id } = this.props.params;
    this.props.reset();
    this.props.getPoll(id);
  }
  handleChipTouchTap = option => () => {
    const { id } = this.props.params;
    this.props.vote(id, option);
  }
  handleVote = () => {
    this.props.showVote();
  }
  render() {
    const { pollOptions } = this.props;
    let voteStatus = null;
    let voteButton = null;
    let chips = null;

    const labels = pollOptions.map((option) => {
      return option.text;
    });

    if (this.props.voted) {
      voteStatus = (
        <div className="voted">
          <p> Thanks for voting </p>
          <div className="icons">
            <a
              href="http://twitter.com/share?url=https://poller-nrandecker.herokuapp.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i className="fa fa-twitter" aria-hidden="true" />
            </a>
            <div
              className="fb-share-button"
              data-href="https://poller-nrandecker.herokuapp.com/"
              data-layout="button_count" data-size="small"
              data-mobile-iframe="true"
            >
              <a
                className="fb-xfbml-parse-ignore"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fpoller-nrandecker.herokuapp.com%2F&amp;src=sdkpreparse"
              ><i className="fa fa-facebook-official" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      );
    }

    if (this.props.optionVote === false && this.props.voted === false) {
      voteButton = (
        <RaisedButton label="Vote"onClick={this.handleVote} secondary style={styles.button} />
      );
    }

    if (this.props.optionVote && this.props.voted === false) {
      chips = pollOptions.map((label, i) => {
        return (
          <Chip
            key={i}
            onTouchTap={this.handleChipTouchTap(label.text)}
            backgroundColor={blue500}
            style={styles.chip}
            labelColor={'#FFF'}
          >
            <Avatar
              icon={<i className="fa fa-check-circle-o" aria-hidden="true" />}
              backgroundColor={blue500}
            />
            {label.text}
          </Chip>
        );
      });
    }

    const data = {
      labels,
      datasets: [{
        data: this.props.votes,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#E91E63',
          '#9C27B0',
          '#673AB7',
          '#3F51B5',
          '#009688',
          '#FF5722',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#E91E63',
          '#9C27B0',
          '#673AB7',
          '#3F51B5',
          '#009688',
          '#FF5722',
        ],
      }],
    };
    return (
      <div className="container poll">
        <div className="row">
          <div className="twelve columns">
            <h1>{this.props.pollTitle}</h1>
            <div className="chip-wrapper">
              { voteButton }
              { chips }
              { voteStatus }
            </div>
            { (this.props.votes.length > 0) ? <Pie data={data} /> : <PieLoading />}
          </div>
        </div>
      </div>
    );
  }
}

Poll.propTypes = {
  params: React.PropTypes.object.isRequired,
  getPoll: React.PropTypes.func.isRequired,
  votes: React.PropTypes.array.isRequired,
  pollOptions: React.PropTypes.array.isRequired,
  pollTitle: React.PropTypes.string,
  optionVote: React.PropTypes.bool,
  showVote: React.PropTypes.func.isRequired,
  vote: React.PropTypes.func.isRequired,
  reset: React.PropTypes.func.isRequired,
  voted: React.PropTypes.bool.isRequired,
};

Poll.defaultProps = {
  optionVote: false,
  pollTitle: '',
};

export default Poll;
