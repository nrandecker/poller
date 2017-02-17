import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import { blue500 } from 'material-ui/styles/colors';

const styles = {
  chip: {
    margin: 4,
  },
  button: {
    width: '50%',
    margin: 12,
  },
};


class Poll extends Component {
  componentDidMount() {
    const { id } = this.props.params;
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

    const labels = pollOptions.map((option) => {
      return option.text;
    });

    const chips = pollOptions.map((label, i) => {
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
              {(this.props.optionVote === false)
              ? <RaisedButton label="Vote" onClick={this.handleVote} secondary style={styles.button} /> : chips }
            </div>
            <Pie data={data} />
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
};

Poll.defaultProps = {
  optionVote: false,
  pollTitle: '',
};

export default Poll;
