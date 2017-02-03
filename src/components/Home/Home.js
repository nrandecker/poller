import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import TabMenu from '../TabMenu/TabMenuContainer';
import { addOption } from '../../modules/home';
import { orange500 } from 'material-ui/styles/colors';

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

class PollOption extends React.Component {
  render() {
    return (
      <TextField
        hintText="Poll Option"
        onClick={addOption}
      />
    );
  }
}

function handleOptionClick(index, props) {
  if (index === props.options.length - 1) {
    // add option
    props.addOption(index);
  }
}

function handleTrashClick(index, props) {
  if (index > 0) {
    props.removeOption(index);
  }
}

export const Home = (props) => {
  const pollList = props.options.map((option, index) => (
    <div className="poll-options" key={index}>
      <TextField
        hintText="Poll Option"
        style={style.textField}
        underlineFocusStyle={style.underlineStyle}
        inputStyle={style.textField.text}
        hintStyle={style.textField.text}
        onClick={() => handleOptionClick(index, props)}
      />
      <i
        onClick={() => handleTrashClick(index, props)}
        className="trash fa fa-trash" aria-hidden="true"
      />
      <br />
    </div>
    ));
  return (
    <div>
      <div className="home-container">
        <div className="container home">
          <div className="row">
            <div className="offset-by-two eight columns">
              <h1> Create Real Time polls </h1>
              <form>
                <TextField
                  hintText="Type your question here..."
                  inputStyle={style.textField.text}
                  underlineFocusStyle={style.underlineStyle}
                  hintStyle={style.textField.text}
                  style={style.textField}
                /><br />
                {pollList}
                <RaisedButton label="Create" type="submit" secondary style={style.button} />
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <TabMenu />
      </div>
    </div>
  );
};

export default Home;
