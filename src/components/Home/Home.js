import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { orange500 } from 'material-ui/styles/colors';
import { browserHistory } from 'react-router';
import Snackbar from 'material-ui/Snackbar';
import TabMenu from '../TabMenu/TabMenuContainer';

const style = {
  height: '100%',
  padding: 15,
  textField: {
    width: '90%',
    text: {
      color: '#FFF',
    },
  },
  underlineStyle: {
    borderColor: orange500,
  },
  button: {
    width: '80%',
    margin: 12,
  },
};

class Home extends Component {
  handleOptionFocus = (index) => {
    if (index === this.props.options.length - 1) {
      this.props.addOption(index);
    }
  }

  handleTrashClick = (index) => {
    if (index > 0) {
      this.props.removeOption(index);
    }
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: this.props.pollTitle,
      options: this.props.options,
    };
    this.props.pollSubmit(data);
  }

  handleActionTouchTap = () => {
    this.props.setSnackBar();
    setTimeout(() => {
      browserHistory.push('/login');
    }, 1000);
  }

  /* credit https://medium.com/@machnicki/handle-events-in-react-with-arrow-functions-ede88184bbb#.l5ikr9mbr
    we pass the index from handleOptionChange to an anonymous function.
    Which has e as a param so we can refrence the event object
    in our function
  */
  handleOptionChange = (index) => (e) => {
    e.preventDefault();
    this.props.optionChange(index, e.target.value);
  }

  handleTitleChange = (e) => {
    e.preventDefault();
    this.props.titleChange({ [e.target.name]: e.target.value });
  }

  render() {
    const pollList = this.props.options.map((option, index) => {
      return (
        <div className="poll-options" key={index}>
          <TextField
            hintText="Poll Option"
            style={style.textField}
            name="pollOption"
            value={this.props.options[index].text}
            underlineFocusStyle={style.underlineStyle}
            inputStyle={style.textField.text}
            hintStyle={style.textField.text}
            onFocus={() => this.handleOptionFocus(index)}
            onChange={this.handleOptionChange(index)}
          />
          <i
            onClick={() => this.handleTrashClick(index)}
            className="trash fa fa-trash" aria-hidden="true"
          />
          <br />
        </div>
      );
    });
    return (
      <div>
        <div className="home-container">
          <div className="container home">
            <div className="row">
              <div className="offset-by-two eight columns">
                <h1> Create Real Time polls </h1>
                <form onSubmit={this.handleFormSubmit}>
                  <TextField
                    hintText="Type your question here..."
                    name="pollTitle"
                    inputStyle={style.textField.text}
                    underlineFocusStyle={style.underlineStyle}
                    hintStyle={style.textField.text}
                    style={style.textField}
                    onChange={this.handleTitleChange}
                    value={this.props.pollTitle}
                  /><br />
                  {pollList}
                  <RaisedButton label="Create" type="submit" secondary style={style.button} />
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="container tab-wrapper">
          <TabMenu />
        </div>
        <Snackbar
          open={this.props.snackbar.open}
          message={'Login or signup to create a poll'}
          onActionTouchTap={this.handleActionTouchTap}
          autoHideDuration={4000}
          action="Login"
          onRequestClose={this.handleSnackbarClose}
        />
      </div>
    );
  }
}

export default Home;
