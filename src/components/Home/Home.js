import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { addOption } from '../../modules/home'
import { orange500 } from 'material-ui/styles/colors';

const style = {
  height: '100%',
  padding: 15,
  textField: {
    width: '90%',
    text: {
      color: '#FFF'
    }
  },
  underlineStyle: {
    borderColor: orange500
  },
  button: {
    width: '80%',
    margin: 12
  }
}

class PollOption extends React.Component {
  render () {
    return (
      <TextField
        hintText='Poll Option'
        onClick={addOption}
      />
    )
  }
}

function handleOptionClick (index, props) {
  if (index === props.options[props.options.length - 1].index) {
    // add option
    props.addOption(index)
  }
}

function handleTrashClick (index, props) {
  if (index > 0) {
    props.removeOption(index)
  }
}

export const Home = (props) => {
  var pollList = props.options.map((option) => {
    return (
      <div className='poll-options' key={option.index}>
        <TextField
          hintText='Poll Option'
          style={style.textField}
          underlineFocusStyle={style.underlineStyle}
          inputStyle={style.textField.text}
          hintStyle={style.textField.text}
          onClick={() => handleOptionClick(option.index, props)}
        />
        <i onClick={() => handleTrashClick(option.index, props)}
          className='trash fa fa-trash' aria-hidden='true' />
        <br />
      </div>
    )
  })
  return (
    <div>
      <div className='home-container'>
        <div className='container home'>
          <div className='row'>
            <div className='offset-by-two eight columns'>
              <h1> Create Real Time polls </h1>
              <form>
                <TextField
                  hintText='Type your question here...'
                  inputStyle={style.textField.text}
                  underlineFocusStyle={style.underlineStyle}
                  hintStyle={style.textField.text}
                  style={style.textField}
                /><br />
                {pollList}
                <RaisedButton label='Create' secondary={true} style={style.button} />
              </form>
            </div>
          </div>
        </div>
        </div>
      <div className='container polls'>
        <div className='row'>
          <div className='six columns'>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
          <div className='six columns'>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/*
class Home extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    var pollOptions = []
    /*
    for (let i = 0; i < props.home.options; i++) {
      pollOptions.push(<PollOption />)
    }
    console.log(pollOptions)
    return (
      <div className='home-container'>
        <div className='container home'>
          <div className='row'>
            <div className='twelve colums'>
              <h1> Create Real Time polls </h1>
              <TextField
                hintText='Type your question here...'
              /><br />

            </div>
          </div>
        </div>
      </div>
    )
    */

export default Home
